import { ReadSoundsTool } from "../tools/ReadSoundsTool/ReadSoundsTool.ts";
import { ReadWordsTool } from "../tools/ReadWordsTool/ReadWordsTool.ts";
import { WritingTool } from "../tools/WritingTool/WritingTool.ts";
import { words as w } from "../utils/words.ts";
import { z } from "zod/v4";

const tools = [ReadSoundsTool, ReadWordsTool, WritingTool] as const;
type AnyTool = (typeof tools)[number];
type Activity = {
  [T in AnyTool as T["name"]]: {
    toolName: T["name"];
    input: z.infer<T["inputSchema"]>;
  };
}[AnyTool["name"]];

export const lessons: { title: string; activities: Activity[] }[] = [
  {
    title: "Lesson 1",
    activities: [
      {
        toolName: "ReadSounds",
        input: { mode: "teach", sounds: ["m", "s"] },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "no_visuals_say_it_fast",
          words: [w.me, w.if], // Ideally prepend "motor boat", "ice cream", "sis ter", and "ham burger", but that would require custom "sounds", which is weirw.
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "no_visuals_sound_it_out",
          words: [w.am, w.if, w.in],
        },
      },
      {
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: ["m", "s"] },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "no_visuals_say_it_fast",
          words: [w.me, w.if, w.she], // Ideally prepend "motor cycle".
        },
      },
      {
        toolName: "Writing",
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
        toolName: "ReadSounds",
        input: { mode: "reteach", sounds: ["m", "s"] },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "no_visuals_say_it_fast",
          words: [w.if, w.me, w.am, w.in, w.she], // Ideally prepend "lawn mower → lawnmower" and "side walk → sidewalk" compound word blending.
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "no_visuals_sound_it_out",
          words: [w.she, w.on, w.if, w.ship],
        },
      },
      {
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: ["m", "s"] },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "no_visuals_say_it_fast",
          words: [w.man, w.will, w.she, w.sit],
        },
      },
      {
        toolName: "Writing",
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
        toolName: "ReadSounds",
        input: { mode: "teach", sounds: ["a"] },
      },
      {
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: ["m", "a", "s"] },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "no_visuals_sound_it_out",
          words: [w.run, w.man, w.this, w.we],
        },
      },
      {
        toolName: "ReadSounds",
        input: {
          mode: "recall_check",
          sayItFast: true,
          sounds: ["m", "a", "s"],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "no_visuals_sound_it_out",
          words: [w.me, w.man, w.if, w.we],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "default",
          words: [w.am, { spelling: "sa", sounds: ["s", "a"] }],
        },
      },
      {
        toolName: "Writing",
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
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: ["m", "a", "s"] },
      },
      {
        toolName: "ReadWords",
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
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: ["s", "m", "a"] },
      },
      {
        toolName: "ReadWords",
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
        toolName: "ReadWords",
        input: {
          variant: "default",
          words: [
            { spelling: "ma", sounds: ["m", "a"] },
            { spelling: "sa", sounds: ["s", "a"] },
          ],
        },
      },
      {
        toolName: "Writing",
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
        toolName: "ReadSounds",
        input: { mode: "teach", sounds: ["e_long"] },
      },
      {
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: ["a", "s", "m", "e_long"] },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "no_visuals_say_it_fast",
          words: [w.me, w.see, w.that, w.we, w.and, w.am, w.eat, w.if],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "no_visuals_sound_it_out",
          words: [w.see, w.that, w.if, w.at, w.am],
        },
      },
      {
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: ["e_long", "s", "m", "a"] },
      },
      {
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: ["e_long", "s", "m", "a"] },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "hide_end",
          words: [w.meat, { spelling: "mat", sounds: ["m", "a", "t"] }, w.me],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "default",
          words: [
            { spelling: "em", sounds: ["e_long", "m"] },
            { spelling: "es", sounds: ["e_long", "s"] },
          ],
        },
      },
      {
        toolName: "Writing",
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
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: ["e_long", "s", "a", "m"] },
      },
      {
        toolName: "ReadWords",
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
        toolName: "ReadWords",
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
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: ["e_long", "a", "m", "s"] },
      },
      {
        toolName: "ReadWords",
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
        toolName: "ReadWords",
        input: {
          variant: "hide_end",
          words: [w.sat, w.seat, w.see, w.see, w.seat, w.sat],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "default",
          words: [w.me, w.see],
        },
      },
      {
        toolName: "Writing",
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
        toolName: "ReadSounds",
        input: { mode: "teach", sounds: ["t"] },
      },
      {
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: ["e_long", "s", "m", "a"] },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "hide_end",
          words: [w.see, w.sat, w.seat, w.seen],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "no_visuals_say_it_fast",
          words: [w.see, w.feet, w.seat, w.meat, w.sat, w.at, w.seen],
        },
      },
      {
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: ["m", "a", "t", "s", "e_long"] },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "no_visuals_say_it_fast",
          words: [w.am, w.run, w.not, w.eat, w.see, w.seen, w.seat],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "hide_end",
          words: [w.me, { spelling: "mat", sounds: ["m", "a", "t"] }, w.mean],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "default",
          words: [w.at, w.eat, w.meat],
        },
      },
      {
        toolName: "Writing",
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
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: ["m", "e_long", "t", "s", "a"] },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "hide_end",
          words: [w.seen, w.seat],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "hide_end",
          words: [w.me, { spelling: "mat", sounds: ["m", "a", "t"] }, w.mean],
        },
      },
      {
        toolName: "ReadWords",
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
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: ["t", "e_long", "m", "s", "a"] },
      },
      {
        toolName: "ReadWords",
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
        toolName: "ReadWords",
        input: {
          variant: "default",
          words: [{ spelling: "mat", sounds: ["m", "a", "t"] }, w.seat, w.am],
        },
      },
      {
        toolName: "Writing",
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
        toolName: "ReadSounds",
        input: { mode: "teach", sounds: ["r"] },
      },
      {
        toolName: "ReadSounds",
        input: {
          mode: "recall_check",
          sounds: ["m", "a", "s", "e_long", "t", "r"],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "no_visuals_sound_it_out",
          words: [w.rat, w.road, w.run, w.ram, w.am, w.mean, w.eat, w.seat],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "default",
          words: [{ spelling: "mat", sounds: ["m", "a", "t"] }, w.sat, w.am],
        },
      },
      {
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: ["e_long", "a", "s", "m", "r"] },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "no_visuals_sound_it_out",
          words: [w.am, w.sat],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "hide_end",
          words: [w.sat, w.sun, w.sam],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "hide_end",
          words: [w.rat, w.run, w.ram],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "hide_end",
          words: [w.me, { spelling: "mat", sounds: ["m", "a", "t"] }],
        },
      },
      {
        toolName: "Writing",
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
