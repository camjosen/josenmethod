import type { ReadSoundsToolInput } from "../tools/ReadSoundsTool/ReadSoundsTool.ts";
import type { ReadWordsToolInput } from "../tools/ReadWordsTool/ReadWordsTool.ts";
import { ReadSoundsTool } from "../tools/ReadSoundsTool/ReadSoundsTool.ts";
import { ReadWordsTool } from "../tools/ReadWordsTool/ReadWordsTool.ts";

type Activity =
  | { tool: typeof ReadSoundsTool; input: ReadSoundsToolInput }
  | { tool: typeof ReadWordsTool; input: ReadWordsToolInput };

type Lesson = Activity[];

export const exampleLesson: Lesson = [
  {
    tool: ReadSoundsTool,
    input: {
      turns: ["teacher"],
      sounds: ["m", "s", "a"],
    },
  },
  {
    tool: ReadWordsTool,
    input: {
      turns: ["student"],
    },
  },
];
