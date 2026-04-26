import { lessons } from "../../../reading_app/static_curriculum/lessons.ts";

export interface LessonSummary {
  idx: number;
  title: string;
  activityCount: number;
}

export interface LessonShape {
  title: string;
  activityCounts: number[];
}

export function listLessons(): LessonSummary[] {
  return lessons.map((l, idx) => ({
    idx,
    title: l.title,
    activityCount: l.activities.length,
  }));
}

export function getLessonShape(idx: number): LessonShape | null {
  const lesson = lessons[idx];
  if (!lesson) return null;
  return {
    title: lesson.title,
    activityCounts: lesson.activities.map(([name, input]) => activityItemCount(name, input)),
  };
}

function activityItemCount(name: string, input: unknown): number {
  // Story renders as a single scrollable article — one item completes the activity.
  if (name === "Story") return 1;
  const items = (input as { items?: unknown }).items;
  return Array.isArray(items) ? items.length : 1;
}

export function getLessonDetail(idx: number) {
  const lesson = lessons[idx];
  if (!lesson) return null;
  return {
    idx,
    title: lesson.title,
    activities: lesson.activities.map(([name, input]) => ({ name, input })),
  };
}
