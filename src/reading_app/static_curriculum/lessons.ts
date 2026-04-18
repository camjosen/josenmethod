import { HearItSayItTool } from "../tools/HearItSayItTool/HearItSayItTool.ts";
import { ReadSoundsTool } from "../tools/ReadSoundsTool/ReadSoundsTool.ts";
import { ReadWordsTool } from "../tools/ReadWordsTool/ReadWordsTool.ts";
import { WritingTool } from "../tools/WritingTool/WritingTool.ts";
import { sounds as s } from "../utils/sounds.ts";
import { words as w } from "../utils/words.ts";
import { z } from "zod/v4";

const tools = [HearItSayItTool, ReadSoundsTool, ReadWordsTool, WritingTool] as const;
type AnyTool = (typeof tools)[number];
type ActivityFor<T> = T extends AnyTool
  ? { toolName: T["name"]; input: z.infer<T["inputSchema"]> }
  : never;
type Activity = ActivityFor<AnyTool>;

/**
 * TODO
 *
 * [ ] The ReadWords tool has a "hide_end" variant. Delete it and create a new Rhyming tool allows you to
 *     specify a starting character and then a list of words.
 * [ ]
 */

export const lessons: { title: string; activities: Activity[] }[] = [
  {
    title: "Lesson 1",
    activities: [
      {
        toolName: "ReadSounds",
        input: { mode: "teach", sounds: [s.m, s.s] },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_fast",
          items: [w.me, w.if], // Ideally prepend "motor boat", "ice cream", "sis ter", and "ham burger", but that would require custom "sounds", which is weird.
        },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_slow",
          items: [w.am, w.if, w.in],
        },
      },
      {
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: [s.m, s.s] },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_fast",
          items: [w.me, w.if, w.she], // Ideally prepend "motor cycle".
        },
      },
      {
        toolName: "Writing",
        input: {
          tasks: [
            { type: "sound", sound: s.m },
            { type: "sound", sound: s.s },
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
        input: { mode: "reteach", sounds: [s.m, s.s] },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_fast",
          items: [w.if, w.me, w.am, w.in, w.she], // Ideally prepend "lawn mower → lawnmower" and "side walk → sidewalk" compound word blending.
        },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_slow",
          items: [w.she, w.on, w.if, w.ship],
        },
      },
      {
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: [s.m, s.s] },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_fast",
          items: [w.man, w.will, w.she, w.sit],
        },
      },
      {
        toolName: "Writing",
        input: {
          tasks: [
            { type: "sound", sound: s.s },
            { type: "sound", sound: s.m },
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
        input: { mode: "teach", sounds: [s.a] },
      },
      {
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: [s.m, s.a, s.s] },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_slow",
          items: [w.run, w.man, w.this, w.we],
        },
      },
      {
        toolName: "ReadSounds",
        input: {
          mode: "recall_check",
          sayItFast: true,
          sounds: [s.m, s.a, s.s],
        },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_slow_then_fast", // Student says slowly, and then fast.
          items: [w.me, w.man, w.if, w.we],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "default", // NUX???
          words: [w.am, { spelling: "sa", sounds: [s.s, s.a] }],
        },
      },
      {
        toolName: "Writing",
        input: {
          tasks: [
            { type: "sound", sound: s.a },
            { type: "sound", sound: s.m },
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
        input: { mode: "recall_check", sounds: [s.m, s.a, s.s] },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_fast",
          items: [
            w.at,
            w.eat,
            { spelling: "mat", sounds: [s.m, s.a, s.t] }, // TODO add to dictionary
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
        input: {
          mode: "recall_check",
          sayItFast: true, // Student should say the sounds slowly, then fast.
          sounds: [s.s, s.m, s.a],
        },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_slow_then_fast", // me slow -> you slow -> you fast
          items: [
            w.run,
            w.at,
            w.not,
            w.this,
            { spelling: "mat", sounds: [s.m, s.a, s.t] },
          ],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "default", // me slow (student uses finger but doesn't say anything, NUX?)
          words: [
            { spelling: "ma", sounds: [s.m, s.a] },
            { spelling: "sa", sounds: [s.s, s.a] },
          ],
        },
      },
      {
        toolName: "Writing",
        input: {
          tasks: [
            { type: "sound", sound: s.s },
            { type: "sound", sound: s.a },
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
        input: { mode: "teach", sounds: [s.e_long] },
      },
      {
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: [s.a, s.s, s.m, s.e_long] },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_slow",
          items: [w.me, w.see, w.that, w.we, w.and, w.am, w.eat, w.if],
        },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_slow_then_fast", // me slow -> you slow -> you fast
          items: [w.see, w.that, w.if, w.at, w.am],
        },
      },
      {
        toolName: "ReadSounds",
        input: {
          mode: "recall_check",
          sayItFast: true, // Technically "slow then fast"
          sounds: [s.e_long, s.s, s.m, s.a],
        },
      },
      {
        toolName: "ReadSounds",
        input: {
          mode: "recall_check",
          sayItFast: true, // TODO focus on NUX for moving finger
          sounds: [s.e_long, s.s, s.m, s.a],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "hide_end", // Needs support for "visible start"
          words: [w.meat, { spelling: "mat", sounds: [s.m, s.a, s.t] }, w.me],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "default", // No "say if fast". Just say it slow.
          words: [
            { spelling: "em", sounds: [s.e_long, s.m] },
            { spelling: "es", sounds: [s.e_long, s.s] },
          ],
        },
      },
      {
        toolName: "Writing",
        input: {
          tasks: [
            { type: "sound", sound: s.e_long },
            { type: "sound", sound: s.a },
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
        input: {
          mode: "recall_check",
          sayItFast: true, // Student says it slowly then fast
          sounds: [s.e_long, s.s, s.a, s.m],
        },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_slow",
          items: [
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
            { spelling: "sin", sounds: [s.s, s.i, s.n] }, // TODO add this
          ],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "hide_end", // TODO frame as "rhyming"... maybe
          words: [
            w.me,
            w.meat,
            w.mean,
            { spelling: "mat", sounds: [s.m, s.a, s.t] },
            w.men,
            w.meat,
            w.me,
          ],
        },
      },
      {
        toolName: "ReadSounds",
        input: {
          mode: "recall_check",
          sayItFast: true, // slow fast
          sounds: [s.e_long, s.a, s.m, s.s],
        },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_slow_then_fast", // Student says slowly, then fast.
          items: [
            w.at,
            w.sat,
            w.feet,
            { spelling: "sin", sounds: [s.s, s.i, s.n] },
            w.see,
            w.seen,
            w.we,
          ],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "hide_end", // Rhyming... student must read the first sound. Scaffolding for the whole word.
          words: [w.sat, w.seat, w.see, w.see, w.seat, w.sat],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "default", // Say slowly without pausing (no say it fast)
          words: [w.me, w.see], // "See" is just "se" (not spelled correctly)
        },
      },
      {
        toolName: "Writing",
        input: {
          tasks: [
            { type: "sound", sound: s.e_long },
            { type: "sound", sound: s.s },
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
        input: { mode: "teach", sounds: [s.t] }, // Nux for "quick sound" (I like that language)
      },
      {
        toolName: "ReadSounds",
        input: {
          mode: "recall_check",
          sayItFast: true,
          sounds: [s.e_long, s.s, s.m, s.a],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "hide_end", // TODO frame as "rhyming"... maybe... student says it slow then fast (no different from other rhyming activities)
          words: [w.see, w.sat, w.seat, w.seen],
        },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_slow",
          items: [w.see, w.feet, w.seat, w.meat, w.sat, w.at, w.seen],
        },
      },
      {
        toolName: "ReadSounds",
        input: { mode: "recall_check", sounds: [s.m, s.a, s.t, s.s, s.e_long] },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_slow_then_fast", // Slow then fast
          items: [w.am, w.run, w.not, w.eat, w.see, w.seen, w.seat],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "hide_end", // TODO frame as "rhyming"... maybe... student says it slow then fast (no different from other rhyming activities)
          words: [w.me, { spelling: "mat", sounds: [s.m, s.a, s.t] }, w.mean],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "default", // TODO no say it fast... focus on saying slowly without stopping between sounds.
          words: [w.at, w.eat, w.meat], // TODO Meat is actually just "met" with the long e.
        },
      },
      {
        toolName: "Writing",
        input: {
          tasks: [
            { type: "sound", sound: s.t },
            { type: "sound", sound: s.m },
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
        input: { mode: "recall_check", sounds: [s.m, s.e_long, s.t, s.s, s.a] }, // "say it fast" is only for t
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "hide_end", // rhyming
          words: [w.seen, w.seat],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "hide_end", // rhyming
          words: [w.me, { spelling: "mat", sounds: [s.m, s.a, s.t] }, w.mean], // Todo "mean" is just "men" with long e
        },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_slow",
          items: [
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
        input: {
          mode: "recall_check",
          sayItFast: true, // slow and then fast (except for "t", which can only be said fast)
          sounds: [s.t, s.e_long, s.m, s.s, s.a],
        },
      },
      {
        toolName: "HearItSayIt",
        input: {
          mode: "say_it_slow_then_fast", // slow then fast
          items: [
            w.run,
            w.rat,
            w.road,
            w.that,
            w.sit,
            w.sat,
            { spelling: "mat", sounds: [s.m, s.a, s.t] },
          ],
        },
      },
      {
        toolName: "ReadWords",
        input: {
          variant: "default", // Nux. Focus on saying the sounds without pause. No say it fast.
          words: [{ spelling: "mat", sounds: [s.m, s.a, s.t] }, w.seat, w.am], // TODO "set" with long e (not an actual word, but good practice)
        },
      },
      {
        toolName: "Writing",
        input: {
          tasks: [
            { type: "sound", sound: s.s },
            { type: "sound", sound: s.t },
          ],
        },
      },
    ],
  },
  // {
  //   title: "Lesson 9",
  //   activities: [
  //     {
  //       toolName: "ReadSounds",
  //       input: { mode: "teach", sounds: [s.r] },
  //     },
  //     {
  //       toolName: "ReadSounds",
  //       input: {
  //         mode: "recall_check",
  //         sounds: [s.m, s.a, s.s, s.e_long, s.t, s.r],
  //       },
  //     },
  //     {
  //       toolName: "ReadWords",
  //       input: {
  //         variant: "no_visuals_sound_it_out",
  //         words: [w.rat, w.road, w.run, w.ram, w.am, w.mean, w.eat, w.seat],
  //       },
  //     },
  //     {
  //       toolName: "ReadWords",
  //       input: {
  //         variant: "default",
  //         words: [{ spelling: "mat", sounds: [s.m, s.a, s.t] }, w.sat, w.am],
  //       },
  //     },
  //     {
  //       toolName: "ReadSounds",
  //       input: { mode: "recall_check", sounds: [s.e_long, s.a, s.s, s.m, s.r] },
  //     },
  //     {
  //       toolName: "ReadWords",
  //       input: {
  //         variant: "no_visuals_sound_it_out",
  //         words: [w.am, w.sat],
  //       },
  //     },
  //     {
  //       toolName: "ReadWords",
  //       input: {
  //         variant: "hide_end",
  //         words: [w.sat, w.sun, w.sam],
  //       },
  //     },
  //     {
  //       toolName: "ReadWords",
  //       input: {
  //         variant: "hide_end",
  //         words: [w.rat, w.run, w.ram],
  //       },
  //     },
  //     {
  //       toolName: "ReadWords",
  //       input: {
  //         variant: "hide_end",
  //         words: [w.me, { spelling: "mat", sounds: [s.m, s.a, s.t] }],
  //       },
  //     },
  //     {
  //       toolName: "Writing",
  //       input: {
  //         tasks: [
  //           { type: "sound", sound: s.r },
  //           { type: "sound", sound: s.m },
  //           { type: "sound", sound: s.a },
  //           { type: "sound", sound: s.s },
  //           { type: "sound", sound: s.e_long },
  //           { type: "sound", sound: s.t },
  //         ],
  //       },
  //     },
  //   ],
  // },
];
