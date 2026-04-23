import type { ServerWebSocket } from "bun";
import { generateCode } from "./codes.ts";
import { getLessonShape } from "./lessonShape.ts";
import type { ClientMsg, ServerMsg, SessionState } from "./types.ts";
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

export function createSession(lessonIdx: number): SessionState | null {
  const shape = getLessonShape(lessonIdx);
  if (!shape) return null;

  let code = generateCode();
  let tries = 0;
  while (sessions.has(code) && tries < 20) {
    code = generateCode();
    tries++;
  }
  if (sessions.has(code)) return null;

  const state: SessionState = {
    code,
    lessonIdx,
    lessonTitle: shape.title,
    activityCounts: shape.activityCounts,
    screen: "lesson",
    cursor: { activityIdx: 0, itemIdx: 0 },
    ratings: {},
    itemResults: {},
    completedActivities: [],
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

export function applyCommand(code: string, msg: ClientMsg): void {
  const s = sessions.get(code);
  if (!s) return;
  const state = s.state;
  switch (msg.type) {
    case "enterActivity": {
      if (msg.activityIdx < 0 || msg.activityIdx >= state.activityCounts.length) return;
      state.screen = "activity";
      state.cursor = { activityIdx: msg.activityIdx, itemIdx: 0 };
      break;
    }
    case "exitActivity": {
      state.screen = "lesson";
      break;
    }
    case "advance": {
      stepForward(state);
      break;
    }
    case "back": {
      stepBackward(state);
      break;
    }
    case "rate": {
      const key = cursorKey(state.cursor);
      state.ratings[key] = msg.stars;
      state.itemResults[key] = msg.stars >= 4 ? "done" : "failed";
      stepForward(state);
      break;
    }
    case "reset": {
      state.screen = "lesson";
      state.cursor = { activityIdx: 0, itemIdx: 0 };
      state.ratings = {};
      state.itemResults = {};
      state.completedActivities = [];
      break;
    }
  }
  broadcast(code);
}

function stepForward(state: SessionState) {
  if (state.screen === "done") return;
  if (state.screen === "lesson") {
    state.screen = "activity";
    return;
  }
  const curActivity = state.cursor.activityIdx;
  const itemCount = state.activityCounts[curActivity] ?? 0;
  const nextItem = state.cursor.itemIdx + 1;
  if (nextItem < itemCount) {
    state.cursor = { activityIdx: curActivity, itemIdx: nextItem };
    return;
  }
  if (!state.completedActivities.includes(curActivity)) {
    state.completedActivities = [...state.completedActivities, curActivity];
  }
  const nextActivity = curActivity + 1;
  if (nextActivity >= state.activityCounts.length) {
    state.screen = "done";
    return;
  }
  state.screen = "lesson";
  state.cursor = { activityIdx: nextActivity, itemIdx: 0 };
}

function stepBackward(state: SessionState) {
  if (state.screen === "done") {
    const lastActivity = state.activityCounts.length - 1;
    state.screen = "activity";
    state.cursor = {
      activityIdx: lastActivity,
      itemIdx: Math.max(0, (state.activityCounts[lastActivity] ?? 1) - 1),
    };
    return;
  }
  if (state.screen === "lesson") {
    const prevActivity = state.cursor.activityIdx - 1;
    if (prevActivity < 0) return;
    state.screen = "activity";
    state.cursor = {
      activityIdx: prevActivity,
      itemIdx: Math.max(0, (state.activityCounts[prevActivity] ?? 1) - 1),
    };
    state.completedActivities = state.completedActivities.filter((i) => i !== prevActivity);
    return;
  }
  const curActivity = state.cursor.activityIdx;
  if (state.cursor.itemIdx > 0) {
    state.cursor = { activityIdx: curActivity, itemIdx: state.cursor.itemIdx - 1 };
    const key = cursorKey(state.cursor);
    delete state.ratings[key];
    delete state.itemResults[key];
    return;
  }
  state.screen = "lesson";
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
