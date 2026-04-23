export type Role = "teacher" | "student";

export type Screen = "lesson" | "activity" | "done";

export type ItemResult = "done" | "failed";

export interface Cursor {
  activityIdx: number;
  itemIdx: number;
}

export interface SessionState {
  code: string;
  lessonIdx: number;
  lessonTitle: string;
  activityCounts: number[];
  screen: Screen;
  cursor: Cursor;
  ratings: Record<string, number>;
  itemResults: Record<string, ItemResult>;
  completedActivities: number[];
  participantCount: number;
  createdAt: number;
}

export type ClientMsg =
  | { type: "enterActivity"; activityIdx: number }
  | { type: "exitActivity" }
  | { type: "advance" }
  | { type: "back" }
  | { type: "rate"; stars: 1 | 2 | 3 | 4 | 5 }
  | { type: "reset" };

export type ServerMsg =
  | { type: "state"; session: SessionState }
  | { type: "error"; message: string };

export function cursorKey(c: Cursor): string {
  return `${c.activityIdx}:${c.itemIdx}`;
}
