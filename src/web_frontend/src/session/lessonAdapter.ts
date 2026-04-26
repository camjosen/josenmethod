import type { ReadSoundsToolInput } from "@reading_app/tools/ReadSoundsTool/ReadSoundsTool";
import type { SoundIntroductionToolInput } from "@reading_app/tools/SoundIntroductionTool/SoundIntroductionTool";
import type { ReadWordsToolInput } from "@reading_app/tools/ReadWordsTool/ReadWordsTool";
import type { RhymingToolInput } from "@reading_app/tools/RhymingTool/RhymingTool";
import type { VerbalBlendingInput } from "@reading_app/tools/VerbalBleningTool.ts/VerbalBleningTool";
import type { WritingToolInput } from "@reading_app/tools/WritingTool/WritingTool";
import type { StoryToolInput } from "@reading_app/tools/StoryTool/StoryTool";

export type SessionLessonActivity =
  | { id: string; toolName: "ReadSounds"; input: ReadSoundsToolInput; itemCount: number }
  | { id: string; toolName: "SoundIntroduction"; input: SoundIntroductionToolInput; itemCount: number }
  | { id: string; toolName: "ReadWords"; input: ReadWordsToolInput; itemCount: number }
  | { id: string; toolName: "Rhyming"; input: RhymingToolInput; itemCount: number }
  | { id: string; toolName: "VerbalBlending"; input: VerbalBlendingInput; itemCount: number }
  | { id: string; toolName: "Writing"; input: WritingToolInput; itemCount: number }
  | { id: string; toolName: "Story"; input: StoryToolInput; itemCount: number };

export interface SessionLesson {
  id: string;
  activities: SessionLessonActivity[];
}

export interface BackendLessonDetail {
  idx: number;
  title: string;
  activities: Array<{ name: string; input: unknown }>;
}

function itemsLength(name: string, input: unknown): number {
  // Story renders as a single scrollable article.
  if (name === "Story") return 1;
  const items = (input as { items?: unknown }).items;
  return Array.isArray(items) ? items.length : 1;
}

function toActivity(name: string, input: unknown, i: number): SessionLessonActivity {
  const id = `a${i}`;
  const itemCount = itemsLength(name, input);
  switch (name) {
    case "ReadSounds":
      return { id, toolName: "ReadSounds", input: input as ReadSoundsToolInput, itemCount };
    case "SoundIntroduction":
      return { id, toolName: "SoundIntroduction", input: input as SoundIntroductionToolInput, itemCount };
    case "ReadWords":
      return { id, toolName: "ReadWords", input: input as ReadWordsToolInput, itemCount };
    case "Rhyming":
      return { id, toolName: "Rhyming", input: input as RhymingToolInput, itemCount };
    case "VerbalBlending":
      return { id, toolName: "VerbalBlending", input: input as VerbalBlendingInput, itemCount };
    case "Writing":
      return { id, toolName: "Writing", input: input as WritingToolInput, itemCount };
    case "Story":
      return { id, toolName: "Story", input: input as StoryToolInput, itemCount };
    default:
      throw new Error(`Unknown tool name from backend: ${name}`);
  }
}

export function adaptLesson(detail: BackendLessonDetail): SessionLesson {
  return {
    id: `lesson-${detail.idx}`,
    activities: detail.activities.map((a, i) => toActivity(a.name, a.input, i)),
  };
}
