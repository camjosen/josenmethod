import type { ServerWebSocket } from "bun";
import { generateCode } from "./codes.ts";
import { getLessonShape } from "./lessonShape.ts";
import type { ClientMsg, LessonState, ServerMsg, SessionState } from "./types.ts";
import { cursorKey } from "./types.ts";

interface Socket {
  ws: ServerWebSocket<WsData>;
}

export interface WsData {
  code: string;
  role: "teacher" | "student";
}

interface InternalSession {
  state: SessionState;
  sockets: Set<Socket>;
}

const sessions = new Map<string, InternalSession>();

const SESSION_TTL_MS = 6 * 60 * 60 * 1000;

export function createSession(): SessionState | null {
  let code = generateCode();
  let tries = 0;
  while (sessions.has(code) && tries < 20) {
    code = generateCode();
    tries++;
  }
  if (sessions.has(code)) return null;

  const state: SessionState = {
    code,
    currentLessonIdx: null,
    lessons: {},
    participantCount: 0,
    createdAt: Date.now(),
  };

  sessions.set(code, { state, sockets: new Set() });
  return state;
}

export function getSessionState(code: string): SessionState | null {
  return sessions.get(code)?.state ?? null;
}

export function addSocket(code: string, ws: ServerWebSocket<WsData>): boolean {
  const s = sessions.get(code);
  if (!s) return false;
  s.sockets.add({ ws });
  s.state.participantCount = s.sockets.size;
  broadcast(code);
  return true;
}

export function removeSocket(code: string, ws: ServerWebSocket<WsData>): void {
  const s = sessions.get(code);
  if (!s) return;
  for (const sock of s.sockets) {
    if (sock.ws === ws) {
      s.sockets.delete(sock);
      break;
    }
  }
  s.state.participantCount = s.sockets.size;
  if (s.sockets.size === 0) {
    // Keep session alive briefly so reconnects still find it; GC below handles removal.
  } else {
    broadcast(code);
  }
}

function broadcast(code: string) {
  const s = sessions.get(code);
  if (!s) return;
  const msg: ServerMsg = { type: "state", session: s.state };
  const payload = JSON.stringify(msg);
  for (const sock of s.sockets) {
    try {
      sock.ws.send(payload);
    } catch {
      // ignore
    }
  }
}

function getOrInitLesson(state: SessionState, lessonIdx: number): LessonState | null {
  const existing = state.lessons[lessonIdx];
  if (existing) return existing;
  const shape = getLessonShape(lessonIdx);
  if (!shape) return null;
  const lesson: LessonState = {
    lessonIdx,
    lessonTitle: shape.title,
    activityCounts: shape.activityCounts,
    screen: "lesson",
    cursor: { activityIdx: 0, itemIdx: 0 },
    ratings: {},
    itemResults: {},
    completedActivities: [],
  };
  state.lessons[lessonIdx] = lesson;
  return lesson;
}

function currentLesson(state: SessionState): LessonState | null {
  if (state.currentLessonIdx == null) return null;
  return state.lessons[state.currentLessonIdx] ?? null;
}

export function applyCommand(code: string, msg: ClientMsg): void {
  const s = sessions.get(code);
  if (!s) return;
  const state = s.state;

  if (msg.type === "selectLesson") {
    const lesson = getOrInitLesson(state, msg.lessonIdx);
    if (!lesson) return;
    state.currentLessonIdx = msg.lessonIdx;
    broadcast(code);
    return;
  }
  if (msg.type === "exitLesson") {
    state.currentLessonIdx = null;
    broadcast(code);
    return;
  }

  const lesson = currentLesson(state);
  if (!lesson) return;

  switch (msg.type) {
    case "enterActivity": {
      if (msg.activityIdx < 0 || msg.activityIdx >= lesson.activityCounts.length) return;
      lesson.screen = "activity";
      lesson.cursor = { activityIdx: msg.activityIdx, itemIdx: 0 };
      break;
    }
    case "exitActivity": {
      lesson.screen = "lesson";
      break;
    }
    case "advance": {
      stepForward(lesson);
      break;
    }
    case "back": {
      stepBackward(lesson);
      break;
    }
    case "rate": {
      const key = cursorKey(lesson.cursor);
      lesson.ratings[key] = msg.stars;
      lesson.itemResults[key] = msg.stars >= 4 ? "done" : "failed";
      stepForward(lesson);
      break;
    }
    case "reset": {
      lesson.screen = "lesson";
      lesson.cursor = { activityIdx: 0, itemIdx: 0 };
      lesson.ratings = {};
      lesson.itemResults = {};
      lesson.completedActivities = [];
      break;
    }
  }
  broadcast(code);
}

function stepForward(lesson: LessonState) {
  if (lesson.screen === "done") return;
  if (lesson.screen === "lesson") {
    lesson.screen = "activity";
    return;
  }
  const curActivity = lesson.cursor.activityIdx;
  const itemCount = lesson.activityCounts[curActivity] ?? 0;
  const nextItem = lesson.cursor.itemIdx + 1;
  if (nextItem < itemCount) {
    lesson.cursor = { activityIdx: curActivity, itemIdx: nextItem };
    return;
  }
  if (!lesson.completedActivities.includes(curActivity)) {
    lesson.completedActivities = [...lesson.completedActivities, curActivity];
  }
  const nextActivity = curActivity + 1;
  if (nextActivity >= lesson.activityCounts.length) {
    lesson.screen = "done";
    return;
  }
  lesson.screen = "lesson";
  lesson.cursor = { activityIdx: nextActivity, itemIdx: 0 };
}

function stepBackward(lesson: LessonState) {
  if (lesson.screen === "done") {
    const lastActivity = lesson.activityCounts.length - 1;
    lesson.screen = "activity";
    lesson.cursor = {
      activityIdx: lastActivity,
      itemIdx: Math.max(0, (lesson.activityCounts[lastActivity] ?? 1) - 1),
    };
    return;
  }
  if (lesson.screen === "lesson") {
    const prevActivity = lesson.cursor.activityIdx - 1;
    if (prevActivity < 0) return;
    lesson.screen = "activity";
    lesson.cursor = {
      activityIdx: prevActivity,
      itemIdx: Math.max(0, (lesson.activityCounts[prevActivity] ?? 1) - 1),
    };
    lesson.completedActivities = lesson.completedActivities.filter((i) => i !== prevActivity);
    return;
  }
  const curActivity = lesson.cursor.activityIdx;
  if (lesson.cursor.itemIdx > 0) {
    lesson.cursor = { activityIdx: curActivity, itemIdx: lesson.cursor.itemIdx - 1 };
    const key = cursorKey(lesson.cursor);
    delete lesson.ratings[key];
    delete lesson.itemResults[key];
    return;
  }
  lesson.screen = "lesson";
}

function gc() {
  const now = Date.now();
  for (const [code, s] of sessions) {
    if (s.sockets.size === 0 && now - s.state.createdAt > SESSION_TTL_MS) {
      sessions.delete(code);
    }
  }
}

setInterval(gc, 15 * 60 * 1000);
