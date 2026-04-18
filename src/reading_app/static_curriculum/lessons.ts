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
  | { tool: typeof ReadSoundsTool; input: ReadSoundsToolInput }
  | { tool: typeof ReadWordsTool; input: ReadWordsToolInput }
  | { tool: typeof WritingTool; input: WritingToolInput };

export const lessons: { title: string; activities: Activity[] }[] = [
  {
    title: "Lesson 1",
    activities: [
      {
        tool: ReadSoundsTool,
        input: { mode: "teach", sounds: ["m", "s"] },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_say_it_fast",
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
        input: { mode: "recall_check", sounds: ["m", "s"] },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_say_it_fast",
          words: [w.me, w.if, w.she], // Ideally prepend "motor cycle".
        },
      },
      {
        tool: WritingTool,
        input: {
          tasks: [
            { type: "sound", sound: "m" },
            { type: "sound", sound: "s" },
          ],
        },
      },
    ],
  },
  {
    title: "Lesson 2",
    activities: [
      {
        tool: ReadSoundsTool,
        input: { mode: "reteach", sounds: ["m", "s"] },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_say_it_fast",
          words: [w.if, w.me, w.am, w.in, w.she], // Ideally prepend "lawn mower → lawnmower" and "side walk → sidewalk" compound word blending.
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_sound_it_out",
          words: [w.she, w.on, w.if, w.ship],
        },
      },
      {
        tool: ReadSoundsTool,
        input: { mode: "recall_check", sounds: ["m", "s"] },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_say_it_fast",
          words: [w.man, w.will, w.she, w.sit],
        },
      },
      {
        tool: WritingTool,
        input: {
          tasks: [
            { type: "sound", sound: "s" },
            { type: "sound", sound: "m" },
          ],
        },
      },
    ],
  },
  {
    title: "Lesson 3",
    activities: [
      {
        tool: ReadSoundsTool,
        input: { mode: "teach", sounds: ["a"] },
      },
      {
        tool: ReadSoundsTool,
        input: { mode: "recall_check", sounds: ["m", "a", "s"] },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_say_it_fast",
          words: [w.run, w.man, w.this, w.we],
        },
      },
      {
        tool: ReadSoundsTool,
        input: { mode: "recall_check", sounds: ["m", "a", "s"] },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_sound_it_out",
          words: [w.me, w.man, w.if, w.we],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "default",
          words: [w.am, { spelling: "sa", sounds: ["s", "a"] }],
        },
      },
      {
        tool: WritingTool,
        input: {
          tasks: [
            { type: "sound", sound: "m" },
            { type: "sound", sound: "s" },
            { type: "sound", sound: "a" },
          ],
        },
      },
    ],
  },
  {
    title: "Lesson 4",
    activities: [
      {
        tool: ReadSoundsTool,
        input: { mode: "recall_check", sounds: ["m", "a", "s"] },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_say_it_fast",
          words: [
            w.at,
            w.eat,
            { spelling: "mat", sounds: ["m", "a", "t"] },
            w.this,
            w.run,
            w.not,
            w.that,
            w.we,
          ],
        },
      },
      {
        tool: ReadSoundsTool,
        input: { mode: "recall_check", sounds: ["s", "m", "a"] },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_sound_it_out",
          words: [
            w.run,
            w.at,
            w.not,
            w.this,
            { spelling: "mat", sounds: ["m", "a", "t"] },
          ],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "default",
          words: [
            { spelling: "ma", sounds: ["m", "a"] },
            { spelling: "sa", sounds: ["s", "a"] },
          ],
        },
      },
      {
        tool: WritingTool,
        input: {
          tasks: [
            { type: "sound", sound: "m" },
            { type: "sound", sound: "a" },
            { type: "sound", sound: "s" },
          ],
        },
      },
    ],
  },
  {
    title: "Lesson 5",
    activities: [
      {
        tool: ReadSoundsTool,
        input: { mode: "teach", sounds: ["e_long"] },
      },
      {
        tool: ReadSoundsTool,
        input: { mode: "recall_check", sounds: ["a", "s", "m", "e_long"] },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_say_it_fast",
          words: [w.me, w.see, w.that, w.we, w.and, w.am, w.eat, w.if],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_sound_it_out",
          words: [w.see, w.that, w.if, w.at, w.am],
        },
      },
      {
        tool: ReadSoundsTool,
        input: { mode: "recall_check", sounds: ["e_long", "s", "m", "a"] },
      },
      {
        tool: ReadSoundsTool,
        input: { mode: "recall_check", sounds: ["e_long", "s", "m", "a"] },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "hide_end",
          words: [w.meat, { spelling: "mat", sounds: ["m", "a", "t"] }, w.me],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "default",
          words: [
            { spelling: "em", sounds: ["e_long", "m"] },
            { spelling: "es", sounds: ["e_long", "s"] },
          ],
        },
      },
      {
        tool: WritingTool,
        input: {
          tasks: [
            { type: "sound", sound: "e_long" },
            { type: "sound", sound: "s" },
            { type: "sound", sound: "m" },
            { type: "sound", sound: "a" },
          ],
        },
      },
    ],
  },
  {
    title: "Lesson 6",
    activities: [
      {
        tool: ReadSoundsTool,
        input: { mode: "recall_check", sounds: ["e_long", "s", "a", "m"] },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_say_it_fast",
          words: [
            w.we,
            w.in,
            w.run,
            w.not,
            w.fin,
            w.eat,
            w.that,
            w.feet,
            w.see,
            w.sat,
            w.seen,
            { spelling: "sin", sounds: ["s", "i", "n"] },
          ],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "hide_end",
          words: [
            w.me,
            w.meat,
            w.mean,
            { spelling: "mat", sounds: ["m", "a", "t"] },
            w.men,
            w.meat,
            w.me,
          ],
        },
      },
      {
        tool: ReadSoundsTool,
        input: { mode: "recall_check", sounds: ["e_long", "a", "m", "s"] },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_sound_it_out",
          words: [
            w.at,
            w.sat,
            w.feet,
            { spelling: "sin", sounds: ["s", "i", "n"] },
            w.see,
            w.seen,
            w.we,
          ],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "hide_end",
          words: [w.sat, w.seat, w.see, w.see, w.seat, w.sat],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "default",
          words: [w.me, w.see],
        },
      },
      {
        tool: WritingTool,
        input: {
          tasks: [
            { type: "sound", sound: "e_long" },
            { type: "sound", sound: "a" },
            { type: "sound", sound: "m" },
            { type: "sound", sound: "s" },
          ],
        },
      },
    ],
  },
  {
    title: "Lesson 7",
    activities: [
      {
        tool: ReadSoundsTool,
        input: { mode: "teach", sounds: ["t"] },
      },
      {
        tool: ReadSoundsTool,
        input: { mode: "recall_check", sounds: ["e_long", "s", "m", "a"] },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "hide_end",
          words: [w.see, w.sat, w.seat, w.seen],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_say_it_fast",
          words: [w.see, w.feet, w.seat, w.meat, w.sat, w.at, w.seen],
        },
      },
      {
        tool: ReadSoundsTool,
        input: { mode: "recall_check", sounds: ["m", "a", "t", "s", "e_long"] },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_say_it_fast",
          words: [w.am, w.run, w.not, w.eat, w.see, w.seen, w.seat],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "hide_end",
          words: [w.me, { spelling: "mat", sounds: ["m", "a", "t"] }, w.mean],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "default",
          words: [w.at, w.eat, w.meat],
        },
      },
      {
        tool: WritingTool,
        input: {
          tasks: [
            { type: "sound", sound: "m" },
            { type: "sound", sound: "a" },
            { type: "sound", sound: "t" },
            { type: "sound", sound: "s" },
            { type: "sound", sound: "e_long" },
          ],
        },
      },
    ],
  },
  {
    title: "Lesson 8",
    activities: [
      {
        tool: ReadSoundsTool,
        input: { mode: "recall_check", sounds: ["m", "e_long", "t", "s", "a"] },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "hide_end",
          words: [w.seen, w.seat],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "hide_end",
          words: [w.me, { spelling: "mat", sounds: ["m", "a", "t"] }, w.mean],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_say_it_fast",
          words: [
            w.sam,
            w.if,
            w.in,
            w.sun,
            w.run,
            w.road,
            w.meat,
            w.sit,
            w.sat,
            w.rat,
            w.am,
            w.ram,
          ],
        },
      },
      {
        tool: ReadSoundsTool,
        input: { mode: "recall_check", sounds: ["t", "e_long", "m", "s", "a"] },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_sound_it_out",
          words: [
            w.run,
            w.rat,
            w.road,
            w.that,
            w.sit,
            w.sat,
            { spelling: "mat", sounds: ["m", "a", "t"] },
          ],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "default",
          words: [{ spelling: "mat", sounds: ["m", "a", "t"] }, w.seat, w.am],
        },
      },
      {
        tool: WritingTool,
        input: {
          tasks: [
            { type: "sound", sound: "m" },
            { type: "sound", sound: "e_long" },
            { type: "sound", sound: "t" },
            { type: "sound", sound: "s" },
            { type: "sound", sound: "a" },
          ],
        },
      },
    ],
  },
  {
    title: "Lesson 9",
    activities: [
      {
        tool: ReadSoundsTool,
        input: { mode: "teach", sounds: ["r"] },
      },
      {
        tool: ReadSoundsTool,
        input: {
          mode: "recall_check",
          sounds: ["m", "a", "s", "e_long", "t", "r"],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_sound_it_out",
          words: [w.rat, w.road, w.run, w.ram, w.am, w.mean, w.eat, w.seat],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "default",
          words: [{ spelling: "mat", sounds: ["m", "a", "t"] }, w.sat, w.am],
        },
      },
      {
        tool: ReadSoundsTool,
        input: { mode: "recall_check", sounds: ["e_long", "a", "s", "m", "r"] },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "no_visuals_sound_it_out",
          words: [w.am, w.sat],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "hide_end",
          words: [w.sat, w.sun, w.sam],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "hide_end",
          words: [w.rat, w.run, w.ram],
        },
      },
      {
        tool: ReadWordsTool,
        input: {
          variant: "hide_end",
          words: [w.me, { spelling: "mat", sounds: ["m", "a", "t"] }],
        },
      },
      {
        tool: WritingTool,
        input: {
          tasks: [
            { type: "sound", sound: "r" },
            { type: "sound", sound: "m" },
            { type: "sound", sound: "a" },
            { type: "sound", sound: "s" },
            { type: "sound", sound: "e_long" },
            { type: "sound", sound: "t" },
          ],
        },
      },
    ],
  },
];
