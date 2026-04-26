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
  if (name === "Story") {
    const i = input as { content: { paragraphs: unknown[] }; secondReading?: unknown };
    const passes = i.secondReading != null ? 2 : 1;
    return i.content.paragraphs.length * passes;
  }
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
