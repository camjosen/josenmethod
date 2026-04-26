import type { FontKey } from "../../../reading_app/utils/fonts.ts";

export type Role = "teacher" | "student";

export type Screen = "lesson" | "activity" | "done";

export type ItemResult = "done" | "failed";

export interface Cursor {
  activityIdx: number;
  itemIdx: number;
}

export interface LessonState {
  lessonIdx: number;
  lessonTitle: string;
  activityCounts: number[];
  screen: Screen;
  cursor: Cursor;
  ratings: Record<string, number>;
  itemResults: Record<string, ItemResult>;
  completedActivities: number[];
}

export interface SessionState {
  code: string;
  currentLessonIdx: number | null;
  lessons: Record<number, LessonState>;
  participantCount: number;
  createdAt: number;
  font: FontKey;
}

export type ClientMsg =
  | { type: "selectLesson"; lessonIdx: number }
  | { type: "exitLesson" }
  | { type: "enterActivity"; activityIdx: number }
  | { type: "exitActivity" }
  | { type: "advance" }
  | { type: "back" }
  | { type: "rate"; stars: 1 | 2 | 3 | 4 | 5 }
  | { type: "setFont"; font: FontKey }
  | { type: "reset" };

export type ServerMsg =
  | { type: "state"; session: SessionState }
  | { type: "error"; message: string };

export function cursorKey(c: Cursor): string {
  return `${c.activityIdx}:${c.itemIdx}`;
}
