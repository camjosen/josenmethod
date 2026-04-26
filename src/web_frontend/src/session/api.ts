import { backendHttpUrl } from "../backendUrl";

const BASE = backendHttpUrl();

export interface LessonSummary {
  idx: number;
  title: string;
  activityCount: number;
}

export interface LessonDetail {
  idx: number;
  title: string;
  activities: Array<{ name: string; input: unknown }>;
}

export async function fetchLessons(): Promise<LessonSummary[]> {
  const r = await fetch(`${BASE}/sessions/lessons`);
  if (!r.ok) throw new Error("failed to load lessons");
  const data = (await r.json()) as { lessons: LessonSummary[] };
  return data.lessons;
}

export async function fetchLessonDetail(idx: number): Promise<LessonDetail> {
  const r = await fetch(`${BASE}/sessions/lessons/${idx}`);
  if (!r.ok) throw new Error("failed to load lesson");
  const data = (await r.json()) as { lesson: LessonDetail };
  return data.lesson;
}

export async function createSession(): Promise<string> {
  const r = await fetch(`${BASE}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!r.ok) throw new Error("failed to create session");
  const data = (await r.json()) as { code: string };
  return data.code;
}

export async function lookupSession(code: string): Promise<{ exists: boolean }> {
  const r = await fetch(`${BASE}/sessions/${code}`);
  if (r.status === 404) return { exists: false };
  if (!r.ok) throw new Error("failed to look up session");
  const data = (await r.json()) as { exists: boolean };
  return { exists: data.exists };
}
