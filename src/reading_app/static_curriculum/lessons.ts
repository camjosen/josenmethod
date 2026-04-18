import type { IntroduceSoundToolInput } from "../tools/IntroduceSoundTool/IntroduceSoundTool.ts";
import type { ReadWordsToolInput } from "../tools/ReadWordsTool/ReadWordsTool.ts";
import type { ReadSoundsToolInput } from "../tools/ReadSoundsTool/ReadSoundsTool.ts";
import { IntroduceSoundTool } from "../tools/IntroduceSoundTool/IntroduceSoundTool.ts";
import { ReadWordsTool } from "../tools/ReadWordsTool/ReadWordsTool.ts";
import { ReadSoundsTool } from "../tools/ReadSoundsTool/ReadSoundsTool.ts";

type Activity =
  | { tool: typeof IntroduceSoundTool; input: IntroduceSoundToolInput }
  | { tool: typeof ReadSoundsTool; input: ReadSoundsToolInput }
  | { tool: typeof ReadWordsTool; input: ReadWordsToolInput };

type Lesson = Activity[];

export const exampleLesson: Lesson = [
  {
    tool: IntroduceSoundTool,
    input: {
      sound: "m",
    },
  },
  {
    tool: IntroduceSoundTool,
    input: {
      sound: "s",
    },
  },
  {
    tool: ReadWordsTool,
    input: {
      words: [
        {
          spelling: "sam",
          sounds: ["s", "a", "m"],
          isFunny: false,
        },
      ],
    },
  },
  {
    tool: ReadSoundsTool,
    input: {
      sounds: ["m", "s"],
    },
  },
];
