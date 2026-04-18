import {
  IntroduceSoundTool,
  IntroduceSoundToolInput,
} from "../tools/IntroduceSoundTool/IntroduceSoundTool.ts";
import {
  ReadWordsTool,
  ReadWordsToolInput,
} from "../tools/ReadWordsTool/ReadWordsTool.ts";
import {
  ReadSoundsTool,
  ReadSoundsToolInput,
} from "../tools/ReadSoundsTool/ReadSoundsTool.ts";
import { words as w } from "../utils/words.ts";
import {
  WritingTool,
  WritingToolInput,
} from "../tools/WritingTool/WritingTool.ts";

type Activity =
  | { tool: typeof IntroduceSoundTool; input: IntroduceSoundToolInput }
  | { tool: typeof ReadSoundsTool; input: ReadSoundsToolInput }
  | { tool: typeof ReadWordsTool; input: ReadWordsToolInput }
  | { tool: typeof WritingTool; input: WritingToolInput };

export const lessons: { title: string; activities: Activity[] }[] = [
  {
    title: "Lesson 1",
    activities: [
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
          variant: "no_visuals",
          words: [w.me, w.if], // Ideally prepend "motor boat", "ice cream", "sis ter", and "ham burger", but that would require custom "sounds", which is weirw.
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_sound_it_out",
          words: [w.am, w.if, w.in],
        },
      },
      {
        tool: ReadSoundsTool,
        input: {
          sounds: ["m", "s"],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals",
          words: [w.me, w.if, w.she], // Ideally prepend "motor cycle".
        },
      },
      {
        tool: WritingTool,
        input: {
          tasks: [
            {
              type: "sound",
              sound: "m",
            },
            {
              type: "sound",
              sound: "s",
            },
          ],
        },
      },
    ],
  },
];
