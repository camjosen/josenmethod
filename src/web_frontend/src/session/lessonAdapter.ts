import type { ActivityType, Activity as UIActivity, Lesson as UILesson } from "../reading_exercise/data";

const TOOL_TO_TYPE: Record<string, ActivityType> = {
  ReadSounds: "listen",
  VerbalBlending: "speak",
  ReadWords: "read",
  Rhyming: "speak",
  Writing: "star",
  Story: "read",
};

function activityTypeFor(name: string): ActivityType {
  return TOOL_TO_TYPE[name] ?? "read";
}

function itemSpelling(raw: unknown): string {
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw)) return raw.map((p) => String(p)).join("·");
  if (raw && typeof raw === "object") {
    const r = raw as { spelling?: unknown; characters?: unknown; fullWord?: unknown };
    if (typeof r.spelling === "string") return r.spelling;
    if (typeof r.characters === "string") return r.characters;
    if (typeof r.fullWord === "string") return r.fullWord;
  }
  return "…";
}

function extractItems(name: string, input: unknown): string[] {
  const obj = input as { items?: unknown; content?: unknown };
  if (name === "Story") {
    const content = obj.content as { paragraphs?: { sentences?: { words?: unknown[] } } };
    const words = content?.paragraphs?.sentences?.words ?? [];
    return [words.map(itemSpelling).filter(Boolean).join(" ") || "Story"];
  }
  const items = Array.isArray(obj.items) ? obj.items : [];
  return items.map(itemSpelling);
}

export interface SessionLessonActivity extends UIActivity {
  toolName: string;
}

export interface SessionLesson extends Omit<UILesson, "activities"> {
  activities: SessionLessonActivity[];
}

export interface BackendLessonDetail {
  idx: number;
  title: string;
  activities: Array<{ name: string; input: unknown }>;
}

export function adaptLesson(detail: BackendLessonDetail): SessionLesson {
  return {
    id: `lesson-${detail.idx}`,
    activities: detail.activities.map((a, i) => ({
      id: `a${i}`,
      toolName: a.name,
      type: activityTypeFor(a.name),
      items: extractItems(a.name, a.input).map((spelling) => ({
        spelling,
        sounds: [{ name: "a", characters: spelling, as_in: spelling }],
      })) as UIActivity["items"],
    })),
  };
}
