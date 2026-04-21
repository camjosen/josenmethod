import { VerbalBlending } from "../tools/VerbalBleningTool.ts/VerbalBleningTool.ts";
import { ReadSoundsTool } from "../tools/ReadSoundsTool/ReadSoundsTool.ts";
import { ReadWordsTool } from "../tools/ReadWordsTool/ReadWordsTool.ts";
import { RhymingTool } from "../tools/RhymingTool/RhymingTool.ts";
import { StoryTool } from "../tools/StoryTool/StoryTool.ts";
import { WritingTool } from "../tools/WritingTool/WritingTool.ts";
import { sounds as s } from "../utils/sounds.ts";
import { words as w } from "../utils/words.ts";
import { pseudoWords as pw } from "../utils/pseudo_words.ts";
import { rhymes as r } from "../utils/rhymes.ts";
import { z } from "zod/v4";

const tools = [VerbalBlending, ReadSoundsTool, ReadWordsTool, RhymingTool, WritingTool, StoryTool] as const;
type AnyTool = (typeof tools)[number];
type ActivityFor<T> = T extends AnyTool ? [T["name"], z.infer<T["inputSchema"]>] : never;
type Activity = ActivityFor<AnyTool>;

export const lessons: { title: string; activities: Activity[] }[] = [
  {
    title: "Lesson 1",
    activities: [
      ["ReadSounds", { variant: "introduce", items: [s.m, s.s] }],
      ["VerbalBlending", { variant: "say_it_fast", scaffold: true, items: [["motor", "boat"], ["ice", "cream"], ["sis", "ter"], ["ham", "burger"], w.me, w.if] }],
      ["VerbalBlending", { variant: "blend", scaffold: true, items: [w.am, w.if, w.in] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow", items: [s.m, s.s] }],
      ["VerbalBlending", { variant: "say_it_fast", items: [["motor", "cycle"], w.me, w.if, w.she] }],
      ["Writing", { items: [s.m, s.s] }],
    ],
  },
  {
    title: "Lesson 2",
    activities: [
      ["ReadSounds", { variant: "reintroduce", items: [s.m, s.s] }],
      ["VerbalBlending", { variant: "say_it_fast", scaffold: true, items: [["lawn", "mower"], ["side", "walk"], w.if, w.me, w.am, w.in, w.she] }],
      ["VerbalBlending", { variant: "blend", scaffold: true, items: [w.she, w.on, w.if, w.ship] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow", items: [s.m, s.s] }],
      ["VerbalBlending", { variant: "say_it_fast", items: [["sis", "ter"], ["mis", "ter"], ["mo", "ther"], w.if, w.no, w.am] }],
      ["VerbalBlending", { variant: "blend", items: [w.man, w.will, w.she, w.sit] }],
      ["Writing", { items: [s.s, s.m] }],
    ],
  },
  {
    title: "Lesson 3",
    activities: [
      ["ReadSounds", { variant: "introduce", items: [s.a] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow", items: [s.m, s.a, s.s] }],
      ["VerbalBlending", { variant: "blend", items: [w.run, w.man, w.this, w.we] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow_then_fast", items: [s.m, s.a, s.s] }],
      ["VerbalBlending", { variant: "blend_then_say_it_fast", items: [w.me, w.man, w.if, w.we] }],
      ["ReadWords", { variant: "scaffolded", itemTasks: ["touch_sounds"], items: [w.am, pw.sa] }],
      ["Writing", { items: [s.a, s.m] }],
    ],
  },
  {
    title: "Lesson 4",
    activities: [
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow", items: [s.m, s.a, s.s] }],
      ["VerbalBlending", { variant: "say_it_fast", items: [w.at, w.eat, w.mat, w.this, w.run, w.not, w.that, w.we] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow_then_fast", items: [s.s, s.m, s.a] }],
      ["VerbalBlending", { variant: "blend_then_say_it_fast", items: [w.run, w.at, w.not, w.this, w.mat] }],
      ["ReadWords", { variant: "scaffolded", itemTasks: ["touch_sounds"], items: [pw.ma, pw.sa] }],
      ["Writing", { items: [s.s, s.a] }],
    ],
  },
  {
    title: "Lesson 5",
    activities: [
      ["ReadSounds", { variant: "introduce", items: [s.e_long] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow", items: [s.a, s.s, s.m, s.e_long] }],
      ["VerbalBlending", { variant: "blend", items: [w.me, w.see, w.that, w.we, w.and, w.am, w.eat, w.if] }],
      ["VerbalBlending", { variant: "blend_then_say_it_fast", items: [w.see, w.that, w.if, w.at, w.am] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow_then_fast", items: [s.e_long, s.s, s.m, s.a] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow_then_fast", touchIt: true, items: [s.e_long, s.s, s.m, s.a] }],
      ["Rhyming", { variant: "prepend_a_sound", scaffold: "teacher_models", items: [r.m_eat, r.m_at, r.m_e] }],
      ["ReadWords", { variant: "scaffolded", itemTasks: ["teacher_blends", "blend", "touch_sounds", "blend"], items: [pw.em, pw.es] }],
      ["Writing", { items: [s.e_long, s.a] }],
    ],
  },
  {
    title: "Lesson 6",
    activities: [
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow_then_fast", items: [s.e_long, s.s, s.a, s.m] }],
      ["VerbalBlending", { variant: "blend", items: [w.we, w.in, w.run, w.not, w.fin, w.eat, w.that, w.feet, w.see, w.sat, w.seen, w.sin] }],
      ["Rhyming", { variant: "prepend_a_sound", scaffold: "teacher_models", items: [r.m_e, r.m_eat, r.m_ean, r.m_at] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow_then_fast", touchIt: true, items: [s.e_long, s.a, s.m, s.s] }],
      ["VerbalBlending", { variant: "blend_then_say_it_fast", items: [w.at, w.sat, w.feet, w.sin, w.see, w.seen, w.we] }],
      ["Rhyming", { variant: "prepend_a_sound", scaffold: "teacher_models", items: [r.s_at, r.s_eat, r.s_ee] }],
      ["ReadWords", { variant: "scaffolded", itemTasks: ["teacher_blends", "blend", "touch_sounds", "blend"], items: [w.me, pw.se] }],
      ["Writing", { items: [s.e_long, s.s] }],
    ],
  },
  {
    title: "Lesson 7",
    activities: [
      ["ReadSounds", { variant: "introduce", items: [s.t] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow_then_fast", items: [s.e_long, s.s, s.m, s.a] }],
      ["Rhyming", { variant: "prepend_a_sound", scaffold: "teacher_models", items: [r.s_ee, r.s_at, r.s_eat, r.s_een] }],
      ["VerbalBlending", { variant: "blend", items: [w.see, w.feet, w.seat, w.meat, w.sat, w.at, w.seen] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow", items: [s.m, s.a, s.t, s.s, s.e_long] }],
      ["VerbalBlending", { variant: "blend_then_say_it_fast", items: [w.am, w.run, w.not, w.eat, w.see, w.seen, w.seat] }],
      ["Rhyming", { variant: "prepend_a_sound", scaffold: "teacher_models", items: [r.m_e, r.m_at, r.m_ean] }],
      ["ReadWords", { variant: "scaffolded", itemTasks: ["teacher_blends", "blend", "touch_sounds", "blend"], items: [w.at, w.eat, pw.met] }],
      ["Writing", { items: [s.t, s.m] }],
    ],
  },
  {
    title: "Lesson 8",
    activities: [
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow", items: [s.m, s.e_long, s.t, s.s, s.a] }],
      ["Rhyming", { variant: "prepend_a_sound", items: [r.s_een, r.s_eat] }],
      ["Rhyming", { variant: "prepend_a_sound", items: [r.m_e, r.m_at, r.m_ean] }],
      ["VerbalBlending", { variant: "blend", items: [w.sam, w.if, w.in, w.sun, w.run, w.road, w.meat, w.sit, w.sat, w.rat, w.am, w.ram] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow_then_fast", touchIt: true, items: [s.t, s.e_long, s.m, s.s, s.a] }],
      ["VerbalBlending", { variant: "blend_then_say_it_fast", items: [w.run, w.rat, w.road, w.that, w.sit, w.sat, w.mat] }],
      ["ReadWords", { variant: "scaffolded", itemTasks: ["teacher_blends", "blend", "touch_sounds", "blend"], items: [w.mat, pw.set, w.am] }],
      ["Writing", { items: [s.s, s.t] }],
    ],
  },
  {
    title: "Lesson 9",
    activities: [
      ["ReadSounds", { variant: "introduce", items: [s.r] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow", items: [s.m, s.a, s.s, s.e_long, s.t, s.r] }],
      ["VerbalBlending", { variant: "say_it_fast", items: [w.rat, w.road, w.run, w.ram, w.am, w.mean, w.eat, w.seat] }],
      ["ReadWords", { variant: "scaffolded", itemTasks: ["recall_sounds", "teacher_blends", "blend", "say_it_fast"], items: [w.mat, w.sat, w.am] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow_then_fast", items: [s.e_long, s.a, s.s, s.m, s.r] }],
      ["ReadWords", { variant: "scaffolded", itemTasks: ["recall_sounds", "blend", "say_it_fast"], items: [w.am, w.sat] }],
      ["Rhyming", { variant: "prepend_a_sound", items: [r.s_at, r.s_un, r.s_am] }],
      ["Rhyming", { variant: "prepend_a_sound", items: [r.r_at, r.r_un, r.r_am] }],
      ["Rhyming", { variant: "prepend_a_sound", items: [r.m_e, r.m_at] }],
      ["Writing", { items: [s.r, s.a] }],
      ["VerbalBlending", { variant: "blend", items: [w.this, w.feet, w.we, w.meat, w.see, w.sum, w.rat, w.road, w.run, w.if, w.mean] }],
    ],
  },
  {
    title: "Lesson 10",
    activities: [
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow", items: [s.r, s.m, s.t, s.a, s.s, s.e_long] }],
      ["VerbalBlending", { variant: "blend_then_say_it_fast", items: [w.run, w.if, w.read, w.rope, w.soap, w.see, w.mat, w.me, w.am] }],
      ["VerbalBlending", { variant: "blend_then_say_it_fast", items: [w.run, w.if, w.read, w.rope, w.soap, w.see, w.mat, w.me, w.am] }], // Intentional repeat
      ["ReadSounds", { variant: "recall", responseType: "say_it_fast", items: [s.m, s.a, s.t, s.s, s.e_long, s.r] }],
      ["ReadWords", { variant: "scaffolded", itemTasks: ["recall_sounds", "teacher_blends", "say_it_fast", "blend", "say_it_fast"], items: [w.am, w.me, w.see] }],
      ["Rhyming", { variant: "prepend_multiple_sounds", scaffold: "teacher_models", items: [r.r_at, r.m_at, r.s_at] }],
      ["Rhyming", { variant: "prepend_a_sound", items: [r.r_un, r.r_oad, r.r_at] }],
      ["ReadWords", { variant: "scaffolded", itemTasks: ["touch_sounds", "recall_sounds", "blend", "say_it_fast"], items: [w.me, w.sat] }],
      ["Writing", { items: [s.r, s.a] }],
    ],
  },
  {
    title: "Lesson 11",
    activities: [
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow", items: [s.r, s.a, s.e_long, s.s, s.t, s.m] }],
      ["Rhyming", { variant: "prepend_multiple_sounds", scaffold: "teacher_models", items: [r.r_am, r.s_am] }],
      ["Rhyming", { variant: "prepend_multiple_sounds", scaffold: "teacher_models", items: [r.s_een, r.m_ean] }],
      ["VerbalBlending", { variant: "blend_then_say_it_fast", items: [w.read, w.seed, w.if, w.it, w.rope, w.soap, w.mean] }],
      ["VerbalBlending", { variant: "blend_then_say_it_fast", items: [w.read, w.seed, w.if, w.it, w.rope, w.soap, w.mean] }], // Intenitonal repeat
      ["ReadWords", { variant: "silent_letters_intro", items: [w.eat] }],
      ["ReadWords", { variant: "scaffolded", itemTasks: ["guided_sound_it_out", "say_it_fast"], items: [w.am, w.eat, w.ram, w.see, w.rat] }],
      ["Rhyming", { variant: "prepend_multiple_sounds", items: [r.m_at, r.r_at] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_fast", items: [s.s, s.e_long, s.m, s.r, s.a, s.t] }],
      ["ReadWords", { variant: "scaffolded", itemTasks: ["touch_sounds", "sound_it_out", "say_it_fast"], items: [w.at, w.sat] }],
      ["Writing", { items: [s.t, s.e_long] }],
    ],
  },
  {
    title: "Lesson 12",
    activities: [
      ["ReadSounds", { variant: "introduce", items: [s.d] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow", items: [s.a, s.e_long, s.t, s.r, s.d] }],
      ["Rhyming", { variant: "prepend_multiple_sounds", items: [r.r_eed, r.s_eed] }],
      ["VerbalBlending", { variant: "blend_then_say_it_fast", items: [w.read, w.seed, w.sad, w.seat, w.mad] }],
      ["VerbalBlending", { variant: "blend_then_say_it_fast", items: [w.read, w.seed, w.sad, w.seat, w.mad] }], // Intentional repeat
      ["ReadWords", { variant: "scaffolded", itemTasks: ["touch_sounds", "sound_it_out", "say_it_fast"], items: [w.seed, w.rat, w.sam, w.me] }],
      ["Rhyming", { variant: "prepend_multiple_sounds", items: [r.m_at, r.r_at, r.s_at] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_fast", items: [s.d, s.e_long, s.t, s.s, s.r] }],
      ["ReadWords", { variant: "scaffolded", itemTasks: ["touch_sounds", "sound_it_out", "say_it_fast"], items: [w.eat, w.seat] }],
      ["Writing", { items: [s.d, s.a] }],
    ],
  },
  {
    title: "Lesson 13",
    activities: [
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow", items: [s.s, s.a, s.t, s.d, s.e_long, s.r] }],
      ["Rhyming", { variant: "prepend_multiple_sounds", items: [r.r_ope, r.s_oap] }],
      ["VerbalBlending", { variant: "blend_then_say_it_fast", items: [w.sad, w.mad, w.ear] }],
      ["VerbalBlending", { variant: "blend_then_say_it_fast", items: [w.sad, w.mad, w.ear] }], // Intentional repeat
      ["ReadWords", { variant: "scaffolded", itemTasks: ["sound_it_out", "say_it_fast"], items: [w.sad, w.mad, w.eat, w.meat, w.read, w.am, w.ram, w.me] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow_then_fast", touchIt: true, items: [s.d, s.r, s.t, s.e_long, s.m] }],
      ["Rhyming", { variant: "prepend_multiple_sounds", items: [r.s_at, r.r_at, r.m_at] }],
      [
        "Story",
        {
          itemTasks: ["guide_word_by_word", "guide_word_by_word", "teacher_models_the_fast_way"],
          markup: ["arrows", "dots"],
          paragraphs: [[[w.see, w.me, w.eat]]],
        },
      ],
      ["Writing", { items: [s.s, s.d] }],
    ],
  },
  // Skip a bunch of lessons for now
  {
    title: "Lesson 52",
    activities: [
      ["ReadSounds", { variant: "introduce", items: [s.e] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow", items: [s.e_long, s.ch, s.p, s.v, s.e, s.o_long, s.k] }],
      ["ReadWords", { variant: "scaffolded", itemTasks: ["sound_it_out", "say_it_fast"], items: [w.shop, w.chop, w.came] }], // dots removed except for under "ar"
      ["ReadWords", { variant: "scaffolded", itemTasks: ["say_it_fast"], items: [w.cars, w.park, w.are, w.dog, w.cops, w.fog, w.log, w.to, w.goat] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_fast", items: [s.e, s.o_long, s.k, s.p, s.o, s.v] }],
      [
        "Story",
        {
          markup: ["arrows"],
          itemTasks: ["sound_it_out", "read_the_fast_way_with_questions", "picture_comprehension"],
          paragraphs: [
            [
              [w.a, w.dog, w.was, w.in, w.the, w.fog, "period"],
              [w.a, w.cat, w.was, w.in, w.the, w.fog, "period"],
              [w.a, w.goat, w.was, w.in, w.the, w.fog, "period"],
            ],
            [[w.the, w.dog, w.and, w.the, w.cat, w.and, w.the, w.goat, w.came, w.to, w.a, w.log, "period"]],
            [
              [w.the, w.cat, w.and, w.the, w.dog, w.sat, w.on, w.the, w.log, "period"],
              [w.the, w.dog, w.and, w.the, w.cat, w.said, "comma", "quotation_mark", w.we, w.are, w.on, w.the, w.log, "period", "quotation_mark"],
            ],
            [[w.the, w.goat, w.said, "comma", "quotation_mark", w.I, w.am, w.not, w.on, w.the, w.log, "period", w.I, w.am, w.in, w.the, w.log, "period", w.he, w.he, "period", "quotation_mark"]],
          ],
        },
      ],
      ["Writing", { items: [s.ch, s.p] }],
    ],
  },
  {
    title: "Lesson 53",
    activities: [
      ["ReadSounds", { variant: "recall", responseType: "say_it_slow", items: [s.e_long, s.e, s.a_long, s.a, s.o_long, s.o] }],
      ["ReadWords", { variant: "introduce_funny_word", items: [w.girl] }],
      ["ReadWords", { variant: "scaffolded", itemTasks: ["sound_it_out", "say_it_fast"], items: [w.each, w.cakes, w.home, w.ship, w.shop, w.chop] }],
      ["ReadWords", { variant: "scaffolded", itemTasks: ["say_it_fast"], items: [w.farm, w.are, w.cars, w.lots, w.of, w.has, w.old, w.his, w.sheep] }],
      ["ReadSounds", { variant: "recall", responseType: "say_it_fast", items: [s.e, s.i, s.o_long, s.u, s.a_long, s.p] }],
      [
        "Story",
        {
          title: { words: [w.lots, w.of, w.cars] },
          markup: ["arrows"],
          itemTasks: ["title_reading", "read_the_fast_way_with_questions", "picture_comprehension"],
          paragraphs: [
            [
              [w.a, w.man, w.on, w.a, w.farm, w.has, w.lots, w.of, w.cars, "period"],
              [w.he, w.has, w.old, w.cars, "period"],
              [w.he, w.has, w.little, w.cars, "period"],
            ],
            [
              [w.are, w.his, w.cars, w.for, w.goats, "question_mark"],
              [w.no, "period"],
              [w.are, w.his, w.cars, w.for, w.sheep, "question_mark"],
              [w.no, "period"],
              [w.are, w.his, w.cars, w.for, w.cows, "question_mark"],
              [w.no, "period"],
            ],
            [
              [w.his, w.cars, w.are, w.for, w.cops, "period"],
              [w.he, w.has, w.lots, w.of, w.cop, w.cars, "period"],
            ],
          ],
        },
      ],
      ["Writing", { items: [s.w, s.v, s.p] }],
    ],
  },
];
