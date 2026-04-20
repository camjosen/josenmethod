import { VerbalBlending } from "../tools/VerbalBleningTool.ts/VerbalBleningTool.ts";
import { ReadSoundsTool } from "../tools/ReadSoundsTool/ReadSoundsTool.ts";
import { ReadWordsTool } from "../tools/ReadWordsTool/ReadWordsTool.ts";
import { RhymeTool } from "../tools/RhymeTool/RhymeTool.ts";
import { WriteItTool } from "../tools/WriteItTool/WriteItTool.ts";
import { sounds as s } from "../utils/sounds.ts";
import { words as w } from "../utils/words.ts";
import { z } from "zod/v4";

const tools = [VerbalBlending, ReadSoundsTool, ReadWordsTool, RhymeTool, WriteItTool] as const;
type AnyTool = (typeof tools)[number];
type ActivityFor<T> = T extends AnyTool ? [T["name"], z.infer<T["inputSchema"]>] : never;
type Activity = ActivityFor<AnyTool>;

export const lessons: { title: string; activities: Activity[] }[] = [
  {
    title: "Lesson 1",
    activities: [
      ["ReadSounds", { variant: "introduce", items: [s.m, s.s] }],
      ["VerbalBlending", { variant: "say_it_fast", scaffold: true, items: [["motor", "boat"], ["ice", "cream"], ["sis", "ter"], ["ham", "burger"], w.me, w.if] }],
      ["VerbalBlending", { variant: "say_it_slow", scaffold: true, items: [w.am, w.if, w.in] }],
      ["ReadSounds", { variant: "recall", items: [s.m, s.s] }],
      ["VerbalBlending", { variant: "say_it_fast", items: [["motor", "cycle"], w.me, w.if, w.she] }],
      ["WriteIt", { items: [s.m, s.s] }],
    ],
  },
  {
    title: "Lesson 2",
    activities: [
      ["ReadSounds", { variant: "reintroduce", items: [s.m, s.s] }],
      ["VerbalBlending", { variant: "say_it_fast", scaffold: true, items: [["lawn", "mower"], ["side", "walk"], w.if, w.me, w.am, w.in, w.she] }],
      ["VerbalBlending", { variant: "say_it_slow", scaffold: true, items: [w.she, w.on, w.if, w.ship] }],
      ["ReadSounds", { variant: "recall", items: [s.m, s.s] }],
      ["VerbalBlending", { variant: "say_it_slow", items: [w.man, w.will, w.she, w.sit] }],
      ["WriteIt", { items: [s.s, s.m] }],
    ],
  },
  {
    title: "Lesson 3",
    activities: [
      ["ReadSounds", { variant: "introduce", items: [s.a] }],
      ["ReadSounds", { variant: "recall", items: [s.m, s.a, s.s] }],
      ["VerbalBlending", { variant: "say_it_slow", items: [w.run, w.man, w.this, w.we] }],
      ["ReadSounds", { variant: "recall", sayItFast: true, items: [s.m, s.a, s.s] }], // HERE I AM. I dislike the sayItFast param
      ["VerbalBlending", { variant: "say_it_slow_then_fast", items: [w.me, w.man, w.if, w.we] }],
      ["ReadWords", { variant: "default", words: [w.am, { spelling: "sa", sounds: [s.s, s.a] }] }], // NUX???
      ["WriteIt", { items: [s.a, s.m] }],
    ],
  },
  {
    title: "Lesson 4",
    activities: [
      ["ReadSounds", { variant: "recall", items: [s.m, s.a, s.s] }],
      ["VerbalBlending", { variant: "say_it_fast", items: [w.at, w.eat, w.mat, w.this, w.run, w.not, w.that, w.we] }],
      ["ReadSounds", { variant: "recall", sayItFast: true, items: [s.s, s.m, s.a] }], // Student says sounds slowly, then fast.
      ["VerbalBlending", { variant: "say_it_slow_then_fast", items: [w.run, w.at, w.not, w.this, w.mat] }], // me slow -> you slow -> you fast
      ["ReadWords", { variant: "default", words: [{ spelling: "ma", sounds: [s.m, s.a] },{ spelling: "sa", sounds: [s.s, s.a] }]}], // prettier-ignore
      ["WriteIt", { items: [s.s, s.a] }],
    ],
  },
  {
    title: "Lesson 5",
    activities: [
      ["ReadSounds", { variant: "introduce", items: [s.e_long] }],
      ["ReadSounds", { variant: "recall", items: [s.a, s.s, s.m, s.e_long] }],
      ["VerbalBlending", { variant: "say_it_slow", items: [w.me, w.see, w.that, w.we, w.and, w.am, w.eat, w.if] }],
      ["VerbalBlending", { variant: "say_it_slow_then_fast", items: [w.see, w.that, w.if, w.at, w.am] }],
      ["ReadSounds", { variant: "recall", sayItFast: true, items: [s.e_long, s.s, s.m, s.a] }],
      ["ReadSounds", { variant: "recall", sayItFast: true, touchIt: true, items: [s.e_long, s.s, s.m, s.a] }],
      ["Rhyme", { startingSound: s.m, words: [w.meat, w.mat, w.me] }],
      [
        "ReadWords",
        {
          variant: "default",
          words: [
            { spelling: "em", sounds: [s.e_long, s.m] },
            { spelling: "es", sounds: [s.e_long, s.s] },
          ],
        },
      ], // No "say it fast". Just say it slow.
      ["WriteIt", { items: [s.e_long, s.a] }],
    ],
  },
  {
    title: "Lesson 6",
    activities: [
      ["ReadSounds", { variant: "recall", sayItFast: true, items: [s.e_long, s.s, s.a, s.m] }],
      [
        "VerbalBlending",
        {
          variant: "say_it_slow",
          items: [w.we, w.in, w.run, w.not, w.fin, w.eat, w.that, w.feet, w.see, w.sat, w.seen, w.sin],
        },
      ], // TODO add "sin"
      ["Rhyme", { startingSound: s.m, words: [w.me, w.meat, w.mean, w.mat, w.men, w.meat, w.me] }],
      ["ReadSounds", { variant: "recall", sayItFast: true, touchIt: true, items: [s.e_long, s.a, s.m, s.s] }],
      ["VerbalBlending", { variant: "say_it_slow_then_fast", items: [w.at, w.sat, w.feet, w.sin, w.see, w.seen, w.we] }], // Student says slowly, then fast.
      ["Rhyme", { startingSound: s.s, words: [w.sat, w.seat, w.see, w.see, w.seat, w.sat] }],
      ["ReadWords", { variant: "default", words: [w.me, w.see] }], // Say slowly without pausing (no say it fast). "See" is just "se" (not spelled correctly)
      ["WriteIt", { items: [s.e_long, s.s] }],
    ],
  },
  {
    title: "Lesson 7",
    activities: [
      ["ReadSounds", { variant: "introduce", items: [s.t] }],
      ["ReadSounds", { variant: "recall", sayItFast: true, items: [s.e_long, s.s, s.m, s.a] }],
      ["Rhyme", { startingSound: s.s, words: [w.see, w.sat, w.seat, w.seen] }],
      ["VerbalBlending", { variant: "say_it_slow", items: [w.see, w.feet, w.seat, w.meat, w.sat, w.at, w.seen] }],
      ["ReadSounds", { variant: "recall", items: [s.m, s.a, s.t, s.s, s.e_long] }],
      ["VerbalBlending", { variant: "say_it_slow_then_fast", items: [w.am, w.run, w.not, w.eat, w.see, w.seen, w.seat] }], // Slow then fast
      ["Rhyme", { startingSound: s.m, words: [w.me, w.mat, w.mean] }],
      ["ReadWords", { variant: "default", words: [w.at, w.eat, w.meat] }], // TODO no say it fast... focus on saying slowly without stopping between sounds. TODO Meat is actually just "met" with the long e.
      ["WriteIt", { items: [s.t, s.m] }],
    ],
  },
  {
    title: "Lesson 8",
    activities: [
      ["ReadSounds", { variant: "recall", items: [s.m, s.e_long, s.t, s.s, s.a] }], // "say it fast" is only for t
      ["Rhyme", { startingSound: s.s, words: [w.seen, w.seat] }],
      ["Rhyme", { startingSound: s.m, words: [w.me, w.mat, w.mean] }], // Todo "mean" is just "men" with long e
      ["VerbalBlending", { variant: "say_it_slow", items: [w.sam, w.if, w.in, w.sun, w.run, w.road, w.meat, w.sit, w.sat, w.rat, w.am, w.ram] }],
      ["ReadSounds", { variant: "recall", sayItFast: true, touchIt: true, items: [s.t, s.e_long, s.m, s.s, s.a] }], // slow and then fast (except for "t", which can only be said fast)
      ["VerbalBlending", { variant: "say_it_slow_then_fast", items: [w.run, w.rat, w.road, w.that, w.sit, w.sat, w.mat] }], // slow then fast
      ["ReadWords", { variant: "default", words: [w.mat, w.seat, w.am] }], // Nux. Focus on saying the sounds without pause. No say it fast. TODO "set" with long e (not an actual word, but good practice)
      ["WriteIt", { items: [s.s, s.t] }],
    ],
  },
  {
    title: "Lesson 9",
    activities: [
      ["ReadSounds", { variant: "introduce", items: [s.r] }],
      ["ReadSounds", { variant: "recall", items: [s.m, s.a, s.s, s.e_long, s.t, s.r] }],
      ["ReadWords", { variant: "no_visuals_sound_it_out", words: [w.rat, w.road, w.run, w.ram, w.am, w.mean, w.eat, w.seat] }],
      ["ReadWords", { variant: "default", words: [w.mat, w.sat, w.am] }],
      ["ReadSounds", { variant: "recall", sayItFast: true, items: [s.e_long, s.a, s.s, s.m, s.r] }],
      ["ReadWords", { variant: "no_visuals_sound_it_out", words: [w.am, w.sat] }],
      // ["ReadWords", { variant: "hide_end", words: [w.sat, w.sun, w.sam] }],
      // ["ReadWords", { variant: "hide_end", words: [w.rat, w.run, w.ram] }],
      // ["ReadWords", { variant: "hide_end", words: [w.me, w.mat] }],
      ["WriteIt", { items: [s.r, s.a] }],
    ],
  },
];
