import { VerbalBlending } from "../tools/VerbalBleningTool.ts/VerbalBleningTool.ts";
import { ReadSoundsTool } from "../tools/ReadSoundsTool/ReadSoundsTool.ts";
import { ReadWordsTool } from "../tools/ReadWordsTool/ReadWordsTool.ts";
import { RhymingTool } from "../tools/RhymingTool/RhymingTool.ts";
import { StoryTool } from "../tools/StoryTool/StoryTool.ts";
import { WritingTool } from "../tools/WritingTool/WritingTool.ts";
import { sounds as s } from "../utils/sounds.ts";
import { words as w, pseudoWords as pw } from "../utils/words.ts";
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
      ["ReadSounds", { flow: ["introduction", "say_it_slowly", "say_it_slowly"], items: [s.m, s.s] }],
      ["VerbalBlending", { flow: ["guided_blending", "say_it_fast"], items: [["motor", "boat"], ["ice", "cream"], ["sis", "ter"], ["ham", "burger"], w.me, w.if] }],
      ["VerbalBlending", { flow: ["guided_blending", "blend"], items: [w.am, w.if, w.in] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.m, s.s] }],
      ["VerbalBlending", { flow: ["say_it_fast"], items: [["motor", "cycle"], w.me, w.if, w.she] }],
      ["Writing", { items: [s.m, s.s] }],
    ],
  },
  {
    title: "Lesson 2",
    activities: [
      ["ReadSounds", { flow: ["reintroduction", "say_it_slowly", "say_it_slowly"], modifications: ["require_touch"], items: [s.m, s.s] }],
      ["VerbalBlending", { flow: ["guided_blending", "say_it_fast"], items: [["lawn", "mower"], ["side", "walk"], w.if, w.me, w.am, w.in, w.she] }],
      ["VerbalBlending", { flow: ["guided_blending", "blend"], items: [w.she, w.on, w.if, w.ship] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.m, s.s] }],
      ["VerbalBlending", { flow: ["say_it_fast"], items: [["sis", "ter"], ["mis", "ter"], ["mo", "ther"], w.if, w.no, w.am] }],
      ["VerbalBlending", { flow: ["blend"], items: [w.man, w.will, w.she, w.sit] }],
      ["Writing", { items: [s.s, s.m] }],
    ],
  },
  {
    title: "Lesson 3",
    activities: [
      ["ReadSounds", { flow: ["introduction", "say_it_slowly", "say_it_slowly"], items: [s.a] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.m, s.a, s.s] }],
      ["VerbalBlending", { flow: ["blend"], items: [w.run, w.man, w.this, w.we] }],
      ["ReadSounds", { flow: ["say_it_slowly", "say_it_fast"], items: [s.m, s.a, s.s] }],
      ["VerbalBlending", { flow: ["blend", "say_it_fast"], items: [w.me, w.man, w.if, w.we] }],
      ["ReadWords", { flow: ["teacher_blends", "blend"], modifications: ["require_touch"], items: [w.am, pw.sa] }],
      ["Writing", { items: [s.a, s.m] }],
    ],
  },
  {
    title: "Lesson 4",
    activities: [
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.m, s.a, s.s] }],
      ["VerbalBlending", { flow: ["say_it_fast"], items: [w.at, w.eat, w.mat, w.this, w.run, w.not, w.that, w.we] }],
      ["ReadSounds", { flow: ["say_it_slowly", "say_it_fast"], items: [s.s, s.m, s.a] }],
      ["VerbalBlending", { flow: ["blend", "say_it_fast"], items: [w.run, w.at, w.not, w.this, w.mat] }],
      ["ReadWords", { flow: ["teacher_blends", "blend"], modifications: ["require_touch"], items: [pw.ma, pw.sa] }],
      ["Writing", { items: [s.s, s.a] }],
    ],
  },
  {
    title: "Lesson 5",
    activities: [
      ["ReadSounds", { flow: ["introduction", "say_it_slowly", "say_it_slowly"], items: [s.e_long] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.a, s.s, s.m, s.e_long] }],
      ["VerbalBlending", { flow: ["blend"], items: [w.me, w.see, w.that, w.we, w.and, w.am, w.eat, w.if] }],
      ["VerbalBlending", { flow: ["blend", "say_it_fast"], items: [w.see, w.that, w.if, w.at, w.am] }],
      ["ReadSounds", { flow: ["say_it_slowly", "say_it_fast"], items: [s.e_long, s.s, s.m, s.a] }],
      ["ReadSounds", { flow: ["say_it_slowly", "say_it_fast"], modifications: ["require_touch"], items: [s.e_long, s.s, s.m, s.a] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], modifications: ["teacher_models"], items: [r.m_eat, r.m_at, r.m_e] }],
      ["ReadWords", { flow: ["teacher_blends", "blend", "blend"], modifications: ["require_touch"], items: [pw.em, pw.es] }],
      ["Writing", { items: [s.e_long, s.a] }],
    ],
  },
  {
    title: "Lesson 6",
    activities: [
      ["ReadSounds", { flow: ["say_it_slowly", "say_it_fast"], items: [s.e_long, s.s, s.a, s.m] }],
      ["VerbalBlending", { flow: ["blend"], items: [w.we, w.in, w.run, w.not, w.fin, w.eat, w.that, w.feet, w.see, w.sat, w.seen, w.sin] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], modifications: ["teacher_models"], items: [r.m_e, r.m_eat, r.m_ean, r.m_at] }],
      ["ReadSounds", { flow: ["say_it_slowly", "say_it_fast"], modifications: ["require_touch"], items: [s.e_long, s.a, s.m, s.s] }],
      ["VerbalBlending", { flow: ["blend", "say_it_fast"], items: [w.at, w.sat, w.feet, w.sin, w.see, w.seen, w.we] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], modifications: ["teacher_models"], items: [r.s_at, r.s_eat, r.s_ee] }],
      ["ReadWords", { flow: ["teacher_blends", "blend", "blend"], modifications: ["require_touch"], items: [w.me, pw.se] }],
      ["Writing", { items: [s.e_long, s.s] }],
    ],
  },
  {
    title: "Lesson 7",
    activities: [
      ["ReadSounds", { flow: ["introduction", "say_it_slowly", "say_it_slowly"], items: [s.t] }],
      ["ReadSounds", { flow: ["say_it_slowly", "say_it_fast"], items: [s.e_long, s.s, s.m, s.a] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], modifications: ["teacher_models"], items: [r.s_ee, r.s_at, r.s_eat, r.s_een] }],
      ["VerbalBlending", { flow: ["blend"], items: [w.see, w.feet, w.seat, w.meat, w.sat, w.at, w.seen] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.m, s.a, s.t, s.s, s.e_long] }],
      ["VerbalBlending", { flow: ["blend", "say_it_fast"], items: [w.am, w.run, w.not, w.eat, w.see, w.seen, w.seat] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], modifications: ["teacher_models"], items: [r.m_e, r.m_at, r.m_ean] }],
      ["ReadWords", { flow: ["teacher_blends", "blend", "blend"], modifications: ["require_touch"], items: [w.at, w.eat, pw.met] }],
      ["Writing", { items: [s.t, s.m] }],
    ],
  },
  {
    title: "Lesson 8",
    activities: [
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.m, s.e_long, s.t, s.s, s.a] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.s_een, r.s_eat] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.m_e, r.m_at, r.m_ean] }],
      ["VerbalBlending", { flow: ["blend"], items: [w.sam, w.if, w.in, w.sun, w.run, w.road, w.meat, w.sit, w.sat, w.rat, w.am, w.ram] }],
      ["ReadSounds", { flow: ["say_it_slowly", "say_it_fast"], modifications: ["require_touch"], items: [s.t, s.e_long, s.m, s.s, s.a] }],
      ["VerbalBlending", { flow: ["blend", "say_it_fast"], items: [w.run, w.rat, w.road, w.that, w.sit, w.sat, w.mat] }],
      ["ReadWords", { flow: ["teacher_blends", "blend", "blend"], modifications: ["require_touch"], items: [w.mat, pw.set, w.am] }],
      ["Writing", { items: [s.s, s.t] }],
    ],
  },
  {
    title: "Lesson 9",
    activities: [
      ["ReadSounds", { flow: ["introduction", "say_it_slowly", "say_it_slowly"], items: [s.r] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.m, s.a, s.s, s.e_long, s.t, s.r] }],
      ["VerbalBlending", { flow: ["say_it_fast"], items: [w.rat, w.road, w.run, w.ram, w.am, w.mean, w.eat, w.seat] }],
      ["ReadWords", { flow: ["recall_sounds", "teacher_blends", "blend", "say_it_fast"], items: [w.mat, w.sat, w.am] }],
      ["ReadSounds", { flow: ["say_it_slowly", "say_it_fast"], items: [s.e_long, s.a, s.s, s.m, s.r] }],
      ["ReadWords", { flow: ["recall_sounds", "blend", "say_it_fast"], items: [w.am, w.sat] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.s_at, r.s_un, r.s_am] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.r_at, r.r_un, r.r_am] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.m_e, r.m_at] }],
      ["Writing", { items: [s.r, s.a] }],
      ["VerbalBlending", { flow: ["blend"], items: [w.this, w.feet, w.we, w.meat, w.see, w.sum, w.rat, w.road, w.run, w.if, w.mean] }],
    ],
  },
  {
    title: "Lesson 10",
    activities: [
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.r, s.m, s.t, s.a, s.s, s.e_long] }],
      ["VerbalBlending", { flow: ["blend", "say_it_fast"], modifications: ["repeat_until_firm"], items: [w.run, w.if, w.read, w.rope, w.soap, w.see, w.mat, w.me, w.am] }],
      ["ReadSounds", { flow: ["say_it_fast"], items: [s.m, s.a, s.t, s.s, s.e_long, s.r] }],
      ["ReadWords", { flow: ["recall_sounds", "teacher_blends", "say_it_fast", "blend", "say_it_fast"], items: [w.am, w.me, w.see] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], modifications: ["teacher_models"], items: [r.r_at, r.m_at, r.s_at] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.r_un, r.r_oad, r.r_at] }],
      ["ReadWords", { flow: ["recall_sounds", "blend", "say_it_fast"], modifications: ["require_touch"], items: [w.me, w.sat] }],
      ["Writing", { items: [s.r, s.a] }],
    ],
  },
  {
    title: "Lesson 11",
    activities: [
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.r, s.a, s.e_long, s.s, s.t, s.m] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], modifications: ["teacher_models"], items: [r.r_am, r.s_am] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], modifications: ["teacher_models"], items: [r.s_een, r.m_ean] }],
      ["VerbalBlending", { flow: ["blend", "say_it_fast"], modifications: ["repeat_until_firm"], items: [w.read, w.seed, w.if, w.it, w.rope, w.soap, w.mean] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], modifications: ["teach_silent_letters"], items: [w.eat] }],
      ["ReadWords", { flow: ["guided_sound_it_out", "say_it_fast"], items: [w.am, w.eat, w.ram, w.see, w.rat] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.m_at, r.r_at] }],
      ["ReadSounds", { flow: ["say_it_fast"], items: [s.s, s.e_long, s.m, s.r, s.a, s.t] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], modifications: ["require_touch"], items: [w.at, w.sat] }],
      ["Writing", { items: [s.t, s.e_long] }],
    ],
  },
  {
    title: "Lesson 12",
    activities: [
      ["ReadSounds", { flow: ["introduction", "say_it_slowly", "say_it_slowly"], items: [s.d] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.a, s.e_long, s.t, s.r, s.d] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.r_eed, r.s_eed] }],
      ["VerbalBlending", { flow: ["blend", "say_it_fast"], modifications: ["repeat_until_firm"], items: [w.read, w.seed, w.sad, w.seat, w.mad] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], modifications: ["require_touch"], items: [w.seed, w.rat, w.sam, w.me] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.m_at, r.r_at, r.s_at] }],
      ["ReadSounds", { flow: ["say_it_fast"], items: [s.d, s.e_long, s.t, s.s, s.r] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], modifications: ["require_touch"], items: [w.eat, w.seat] }],
      ["Writing", { items: [s.d, s.a] }],
    ],
  },
  {
    title: "Lesson 13",
    activities: [
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.s, s.a, s.t, s.d, s.e_long, s.r] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.r_ope, r.s_oap] }],
      ["VerbalBlending", { flow: ["blend", "say_it_fast"], modifications: ["repeat_until_firm"], items: [w.sad, w.mad, w.ear] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], items: [w.sad, w.mad, w.eat, w.meat, w.read, w.am, w.ram, w.me] }],
      ["ReadSounds", { flow: ["say_it_slowly", "say_it_fast"], modifications: ["require_touch"], items: [s.d, s.r, s.t, s.e_long, s.m] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.s_at, r.r_at, r.m_at] }],
      [
        "Story",
        {
          content: { paragraphs: [{ sentences: [{ words: [w.see, w.me, w.eat, "."] }] }] },
          firstReading: {
            fluencyExpectation: "beginner:sound_out_each_word",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
          secondReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
              modelItFirst: "full_story",
            },
          },
        },
      ],
      ["Writing", { items: [s.s, s.d] }],
    ],
  },
  {
    title: "Lesson 14",
    activities: [
      ["ReadSounds", { flow: ["introduction", "say_it_slowly", "say_it_slowly"], items: [s.i] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.r, s.d, s.t, s.e_long, s.i] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.s_eed, r.r_eed] }],
      ["VerbalBlending", { flow: ["blend", "say_it_fast"], modifications: ["repeat_until_firm"], items: [w.seed, w.read, w.sad, w.ear] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], items: [w.see, w.seed, w.rat, w.read, w.mad, w.sad, w.am, w.ear, w.at] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.i, s.t, s.a, s.r, s.d] }],
      [
        "Story",
        {
          content: { paragraphs: [{ sentences: [{ words: [w.see, w.me, w.read, "."] }] }] },
          firstReading: {
            fluencyExpectation: "beginner:sound_out_each_word",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
          secondReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
              modelItFirst: "full_story",
            },
          },
        },
      ],
      ["Writing", { items: [s.i, s.e_long] }],
    ],
  },
  {
    title: "Lesson 15",
    activities: [
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.r, s.t, s.e_long, s.a, s.i, s.d] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.m_eat, r.s_eat] }],
      ["VerbalBlending", { flow: ["blend"], items: [w.seed, w.read, w.ear, w.meet] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], items: [w.it, w.sit, w.ear, w.seed, w.rat, w.meet, w.mad] }],
      ["ReadSounds", { flow: ["say_it_fast"], items: [s.d, s.t, s.s, s.r, s.i] }],
      [
        "Story",
        {
          content: { paragraphs: [{ sentences: [{ words: [w.mad, w.at, w.me, "."] }] }] },
          firstReading: {
            fluencyExpectation: "beginner:sound_out_each_word",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
          secondReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
              modelItFirst: "full_story",
            },
          },
        },
      ],
      ["Writing", { items: [s.r, s.t] }],
    ],
  },
  {
    title: "Lesson 16",
    activities: [
      ["ReadSounds", { flow: ["introduction", "say_it_slowly", "say_it_slowly"], items: [s.th] }],
      ["ReadSounds", { flow: ["say_it_slowly"], modifications: ["require_touch"], items: [s.i, s.th, s.r, s.t] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.d, s.e_long] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], modifications: ["repeat_until_firm"], items: [w.is, w.it, w.sat, w.ear, w.meet, w.seem, w.read] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.r_am, r.s_am, r.m_am] }],
      ["ReadSounds", { flow: ["say_it_slowly", "say_it_fast"], modifications: ["require_touch"], items: [s.th, s.d, s.m, s.r, s.i, s.t] }],
      [
        "Story",
        {
          content: { paragraphs: [{ sentences: [{ words: [w.read, w.it, "."] }] }] },
          firstReading: {
            fluencyExpectation: "beginner:sound_out_each_word",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
          secondReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
              modelItFirst: "full_story",
            },
          },
        },
      ],
      ["Writing", { items: [s.d, s.i] }],
    ],
  },
  {
    title: "Lesson 17",
    activities: [
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.th, s.s, s.r, s.m, s.t, s.i, s.d] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], modifications: ["teach_funny_words"], items: [w.is] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], items: [w.this, w.that, w.ram, w.ear, w.seem, w.sit] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.m_at, r.s_at, r.th_at] }],
      ["ReadSounds", { flow: ["say_it_fast"], items: [s.s, s.th, s.e_long, s.i, s.a, s.t, s.d] }],
      [
        "Story",
        {
          content: { paragraphs: [{ sentences: [{ words: [w.this, w.rat, w.is, w.sad, "."] }] }] },
          firstReading: {
            fluencyExpectation: "beginner:sound_out_each_word",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
          secondReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
              modelItFirst: "full_story",
            },
          },
        },
      ],
      ["Writing", { items: [s.s, s.e_long] }],
    ],
  },
  {
    title: "Lesson 18",
    activities: [
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.a, s.th, s.r, s.i, s.t] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], items: [w.me, w.the, w.this, w.that, w.rat, w.sam] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.m_an, r.th_an] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.i, s.th, s.d, s.s, s.r] }],
      [
        "Story",
        {
          content: { paragraphs: [{ sentences: [{ words: [w.sam, w.is, w.mad, w.at, w.me, "."] }] }] },
          firstReading: {
            fluencyExpectation: "beginner:sound_out_each_word",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
          secondReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
          // focusWords (for word_finding — preserve for later): [w.at, w.me]
        },
      ],
      ["Writing", { items: [s.m, s.a] }],
    ],
  },
  {
    title: "Lesson 19",
    activities: [
      ["ReadSounds", { flow: ["introduction", "say_it_slowly", "say_it_slowly"], items: [s.c] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.r, s.th, s.t, s.m, s.d, s.c] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], items: [w.is] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], items: [w.at, w.that, w.ear, w.the, w.mitt, w.rid] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.th_at, r.m_at, r.s_at] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.i, s.c, s.s, s.t, s.a, s.th] }],
      [
        "Story",
        {
          content: { paragraphs: [{ sentences: [{ words: [w.see, w.the, w.ram, w.sit, "."] }] }] },
          firstReading: {
            fluencyExpectation: "beginner:sound_out_each_word",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
          secondReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
          // focusWords (for word_finding — preserve for later): [w.sit, w.the]
        },
      ],
      ["Writing", { items: [s.d, s.r] }],
    ],
  },
  {
    title: "Lesson 20",
    activities: [
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.e_long, s.c, s.a, s.r, s.i, s.d] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], items: [w.at, w.mad, w.sat, w.sack, w.rat, w.this] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], items: [w.cat] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.m_at, r.th_at, r.c_at] }],
      ["ReadSounds", { flow: ["say_it_fast"], items: [s.c, s.t, s.i, s.th, s.a] }],
      [
        "Story",
        {
          content: { paragraphs: [{ sentences: [{ words: [w.the, w.ram, w.is, w.sad, "."] }] }] },
          firstReading: {
            fluencyExpectation: "beginner:sound_out_each_word",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
          secondReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
          // focusWords (for word_finding — preserve for later): [w.ram, w.is]
        },
      ],
      ["Writing", { items: [s.c, s.d] }],
    ],
  },
  {
    title: "Lesson 21",
    activities: [
      ["ReadSounds", { flow: ["introduction", "say_it_slowly", "say_it_slowly"], items: [s.o] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.e_long, s.d, s.i, s.th, s.c] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], items: [w.sick, w.rack, w.this, w.am, w.mad, w.meet, w.cat, w.that] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.r_un, r.s_un, r.d_one] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.c, s.o, s.th, s.r, s.t, s.i] }],
      [
        "Story",
        {
          content: {
            paragraphs: [
              {
                sentences: [
                  { words: [w.this, w.cat, w.is, w.sick, "."], secondReadingQuestions: ["How does the cat feel?"] },
                  { words: [w.this, w.cat, w.is, w.sad, "."], secondReadingQuestions: ["What else do you know about the cat?", "Why is the cat sad?"] },
                ],
              },
            ],
          },
          firstReading: {
            fluencyExpectation: "beginner:sound_out_each_word",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
          secondReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
          // focusWords (for word_finding — preserve for later): [w.sick, w.sad]
        },
      ],
      ["Writing", { items: [s.i, s.t] }],
    ],
  },
  {
    title: "Lesson 22",
    activities: [
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.a, s.o, s.e_long, s.th, s.i, s.t] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], items: [w.mom, w.rod, w.cat, w.rat, w.sock, w.rock, w.it, w.this] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.m_an, r.th_an, r.c_an] }],
      ["ReadSounds", { flow: ["say_it_fast"], items: [s.th, s.c, s.o, s.d, s.e_long, s.i] }],
      ["ReadWords", { flow: ["sound_it_out", "sound_it_out", "say_it_fast"], modifications: ["teach_funny_words"], items: [w.a] }],
      [
        "Story",
        {
          content: {
            paragraphs: [
              {
                sentences: [
                  {
                    words: [w.this, w.is, w.a, w.seed, "."],
                    secondReadingQuestions: ["What is that?"],
                  },
                  {
                    words: [w.see, w.a, w.ram, w.eat, w.it, "."],
                    secondReadingQuestions: ["What is the ram eating?", "Who is eating a seed?"],
                  },
                ],
              },
            ],
          },
          firstReading: {
            fluencyExpectation: "beginner:sound_out_each_word",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
          secondReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
          // focusWords (for word_finding — preserve for later): [w.a, w.see, w.that, w.a, w.that, w.a, w.see, w.that, w.see]
        },
      ],
      ["Writing", { items: [s.o, s.c] }],
    ],
  },
  {
    title: "Lesson 23",
    activities: [
      ["ReadSounds", { flow: ["introduction", "say_it_slowly", "say_it_slowly"], items: [s.n] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.o, s.c, s.th, s.i, s.d] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], items: [w.rock, w.rod, w.sack, w.sock, w.sick, w.meet, w.cat, w.that] }],
      ["Rhyming", { flow: ["read_start", "hear_ending", "blend", "say_it_fast"], items: [r.m_oo, r.t_oo, r.d_o] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.n, s.o, s.i, s.c, s.e_long, s.a] }],
      [
        "Story",
        {
          content: {
            paragraphs: [{ sentences: [{ words: [w.this, w.is, w.a, w.rock, "."] }, { words: [w.sam, w.is, w.at, w.the, w.rock, "."] }] }],
          },
          firstReading: {
            fluencyExpectation: "beginner:sound_out_each_word",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
          secondReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
          // focusWords (for word_finding — preserve for later): [w.is, w.sam, w.is, w.rock, w.is, w.sam, w.rock, w.rock, w.is, w.sam]
        },
      ],
      ["Writing", { items: [s.r, s.o] }],
    ],
  },
  // Skip a bunch of lessons for now
  {
    title: "Lesson 52",
    activities: [
      ["ReadSounds", { flow: ["introduction", "say_it_slowly", "say_it_slowly"], items: [s.e] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.e_long, s.ch, s.p, s.v, s.e, s.o_long, s.k] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], items: [w.shop, w.chop, w.came] }], // dots removed except for under "ar"
      ["ReadWords", { flow: ["say_it_fast"], items: [w.cars, w.park, w.are, w.dog, w.cops, w.fog, w.log, w.to, w.goat] }],
      ["ReadSounds", { flow: ["say_it_fast"], items: [s.e, s.o_long, s.k, s.p, s.o, s.v] }],
      [
        "Story",
        {
          content: {
            paragraphs: [
              {
                sentences: [
                  {
                    words: [w.a, w.dog, w.was, w.in, w.the, w.fog, "."],
                    secondReadingQuestions: ["What's a fog?"],
                  },
                  { words: [w.a, w.cat, w.was, w.in, w.the, w.fog, "."] },
                  {
                    words: [w.a, w.goat, w.was, w.in, w.the, w.fog, "."],
                    secondReadingQuestions: ["Name everybody who was in the fog."],
                  },
                ],
              },
              { sentences: [{ words: [w.the, w.dog, w.and, w.the, w.cat, w.and, w.the, w.goat, w.came, w.to, w.a, w.log, "."] }] },
              {
                sentences: [
                  {
                    words: [w.the, w.cat, w.and, w.the, w.dog, w.sat, w.on, w.the, w.log, "."],
                    secondReadingQuestions: ["Who sat on the log?", "Who didn't sit on the log?"],
                  },
                  { words: [w.the, w.dog, w.and, w.the, w.cat, w.said, ",", '"', w.we, w.are, w.on, w.the, w.log, ".", '"'] },
                ],
              },
              {
                sentences: [
                  {
                    words: [w.the, w.goat, w.said, ",", '"', w.I, w.am, w.not, w.on, w.the, w.log, ".", w.I, w.am, w.in, w.the, w.log, ".", w.he, w.he, ".", '"'],
                    secondReadingQuestions: ['Why is he laughing and saying "he he"?'],
                  },
                ],
              },
            ],
          },
          firstReading: {
            fluencyExpectation: "beginner:sound_out_each_word",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
            },
          },
          secondReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
              directStudentAttention: "each_word",
            },
          },
        },
      ],
      ["Writing", { items: [s.ch, s.p] }],
    ],
  },
  {
    title: "Lesson 53",
    activities: [
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.e_long, s.e, s.a_long, s.a, s.o_long, s.o] }],
      ["ReadWords", { flow: ["sound_it_out", "sound_it_out", "say_it_fast"], modifications: ["teach_funny_words"], items: [w.girl] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], items: [w.each, w.cakes, w.home, w.ship, w.shop, w.chop] }],
      ["ReadWords", { flow: ["say_it_fast"], items: [w.farm, w.are, w.cars, w.lots, w.of, w.has, w.old, w.his, w.sheep] }],
      ["ReadSounds", { flow: ["say_it_fast"], items: [s.e, s.i, s.o_long, s.u, s.a_long, s.p] }],
      [
        "Story",
        {
          content: {
            title: { words: [w.lots, w.of, w.cars], secondReadingQuestions: ["What do you think this story is about?"] },
            paragraphs: [
              {
                sentences: [
                  { words: [w.a, w.man, w.on, w.a, w.farm, w.has, w.lots, w.of, w.cars, "."], secondReadingQuestions: ["What does he have?"] },
                  { words: [w.he, w.has, w.old, w.cars, "."] },
                  { words: [w.he, w.has, w.little, w.cars, "."], secondReadingQuestions: ["What kinds of cars does he have?"] },
                ],
              },
              {
                sentences: [
                  { words: [w.are, w.his, w.cars, w.for, w.goats, "?"], secondReadingQuestions: ["What do you think?"] },
                  { words: [w.no, "."], secondReadingQuestions: ["Are they for goats?"] },
                  { words: [w.are, w.his, w.cars, w.for, w.sheep, "?"] },
                  { words: [w.no, "."] },
                  { words: [w.are, w.his, w.cars, w.for, w.cows, "?"] },
                  { words: [w.no, "."] },
                ],
              },
              {
                sentences: [
                  { words: [w.his, w.cars, w.are, w.for, w.cops, "."] },
                  { words: [w.he, w.has, w.lots, w.of, w.cop, w.cars, "."], secondReadingQuestions: ["What kinds of cars does he have?"] },
                ],
              },
            ],
          },
          firstReading: {
            fluencyExpectation: "beginner:sound_out_each_word",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
            },
          },
          secondReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
            },
          },
        },
      ],
      ["Writing", { items: [s.w, s.v, s.p] }],
    ],
  },
  // Skip a few more lessons
  {
    title: "Lesson 58",
    activities: [
      ["ReadSounds", { flow: ["introduction", "say_it_slowly", "say_it_slowly"], items: [s.i_long] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.i, s.b, s.e, s.i_long, s.ch, s.o_long] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], items: [w.be, w.big, w.getting, w.bit, w.leaf, w.eating, w.bugs] }],
      ["ReadWords", { flow: ["say_it_fast"], items: [w.did, w.hit, w.then, w.dog, w.log, w.him, w.now, w.how] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.b, s.i_long, s.u, s.u, s.e, s.o, s.a] }],
      [
        "Story",
        {
          content: {
            title: { words: [w.a, w.bug, w.and, w.a, w.dog], secondReadingQuestions: ["What do you think this story is about?"] },
            paragraphs: [
              {
                sentences: [
                  { words: [w.a, w.bug, w.and, w.a, w.dog, w.sat, w.on, w.a, w.log, "."] },
                  {
                    words: [w.the, w.dog, w.said, ",", '"', w.that, w.bug, w.is, w.so, w.little, w.I, w.can, w.not, w.see, w.him, w.on, w.this, w.log, ".", '"'],
                    secondReadingQuestions: ["Why couldn't the dog see the bug?"],
                  },
                ],
              },
              {
                sentences: [{ words: [w.the, w.bug, w.said, ",", '"', w.I, w.am, w.big, ".", '"'] }],
              },
              {
                sentences: [{ words: [w.the, w.dog, w.said, ",", '"', w.he, w.is, w.not, w.big, ".", '"'] }],
              },
              {
                sentences: [
                  {
                    words: [w.the, w.bug, w.said, ",", '"', w.I, w.will, w.eat, w.this, w.log, ".", '"'],
                    secondReadingQuestions: ["What did the bug say?"],
                  },
                  { words: [w.and, w.he, w.did, "."] },
                  {
                    words: [w.he, w.bit, w.and, w.bit, w.and, w.bit, w.at, w.the, w.log, "."],
                    secondReadingQuestions: ["What did the bug do?"],
                  },
                  { words: [w.the, w.bug, w.said, ",", '"', w.now, w.that, w.dog, w.can, w.see, w.how, w.big, w.I, w.am, ".", '"'] },
                ],
              },
              {
                sentences: [
                  {
                    words: [w.the, w.dog, w.said, ",", '"', w.that, w.bug, w.can, w.eat, w.logs, ".", w.he, w.is, w.a, w.big, ",", w.big, w.bug, ".", '"'],
                    secondReadingQuestions: [`Why did the dog say, "He is a big, big bug?"`],
                  },
                ],
              },
            ],
          },
          firstReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
            },
          },
          secondReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
            },
          },
        },
      ],
      ["Writing", { items: [s.d, s.b] }],
    ],
  },
  {
    title: "Lesson 59",
    activities: [
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.i_long, s.ch, s.a, s.e, s.o, s.i] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], items: [w.fishing, w.bed, w.tub, w.but, w.bite, w.sleep, w.like] }],
      ["ReadWords", { flow: ["say_it_fast"], modifications: ["repeat_until_firm"], items: [w.leaf, w.more, w.ten, w.let_s] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.i_long, s.ch, s.a, s.e, s.o, s.i] }],
      [
        "Story",
        {
          content: {
            title: { words: [w.the, w.bugs], secondReadingQuestions: ["What do you think this story is about?"] },
            paragraphs: [
              {
                sentences: [
                  { words: [w.a, w.big, w.bug, w.met, w.a, w.little, w.bug, "."] },
                  { words: [w.the, w.big, w.bug, w.said, ",", '"', w.let_s, w.go, w.eat, ".", '"'], secondReadingQuestions: ["Did the big bug want to eat?"] },
                  { words: [w.so, w.the, w.big, w.bug, w.ate, w.a, w.leaf, w.and, w.a, w.nut, w.and, w.a, w.rock, "."], secondReadingQuestions: ["What did the big bug eat?"] },
                  { words: [w.the, w.big, w.bug, w.said, ",", '"', w.that, w.is, w.how, w.big, w.bugs, w.eat, ".", '"'] },
                ],
              },
              {
                sentences: [
                  { words: [w.the, w.little, w.bug, w.said, ",", '"', w.now, w.I, w.will, w.eat, ".", '"'] },
                  { words: [w.so, w.the, w.little, w.bug, w.ate, w.a, w.leaf, w.and, w.a, w.nut, w.and, w.a, w.rock, "."], secondReadingQuestions: ["What did the little bug eat?"] },
                  { words: [w.then, w.the, w.little, w.bug, w.went, w.to, w.a, w.log, w.and, w.ate, w.the, w.log, "."], secondReadingQuestions: ["Did she eat the log?"] },
                  { words: [w.then, w.she, w.ate, w.ten, w.more, w.logs, "."], secondReadingQuestions: ["Then what did she eat?"] },
                ],
              },
              {
                sentences: [{ words: ['"', w.wow, ",", '"', w.the, w.big, w.bug, w.said, "."] }, { words: ['"', w.that, w.little, w.bug, w.can, w.eat, w.a, w.lot, ".", '"'] }],
              },
              {
                sentences: [{ words: [w.the, w.little, w.bug, w.said, ",", '"', w.now, w.let_s, w.eat, w.more, ".", '"'], secondReadingQuestions: ["What did the little bug say?"] }],
              },
            ],
          },
          firstReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
            },
          },
          secondReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
            },
          },
        },
      ],
      ["Writing", { items: [s.g, s.b] }],
    ],
  },
  {
    title: "Lesson 60",
    activities: [
      ["ReadSounds", { flow: ["introduction", "say_it_slowly"], items: [s.y] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.k, s.i, s.ing, s.b, s.e] }],
      ["ReadWords", { flow: ["sound_it_out", "sound_it_out", "say_it_fast"], modifications: ["teach_funny_words"], items: [w.walk, w.talk] }],
      ["ReadWords", { flow: ["sound_it_out", "say_it_fast"], items: [w.stop, w.big, w.sleep, w.bed, w.bite, w.rub, w.fishing, w.likes, w.five] }],
      ["ReadWords", { flow: ["say_it_fast"], modifications: ["repeat_until_firm"], items: [w.his, w.end, w.but, w.sitting] }],
      ["ReadSounds", { flow: ["say_it_slowly"], items: [s.i_long, s.y, s.e, s.o_long, s.a_long, s.e_long] }],
      [
        "Story",
        {
          content: {
            title: { words: [w.the, w.man, w.and, w.his, w.bed], secondReadingQuestions: ["What do you think this story is about?"] },
            paragraphs: [
              {
                sentences: [
                  { words: [w.a, w.man, w.had, w.a, w.tub, "."] },
                  { words: [w.he, w.said, ",", '"', w.I, w.like, w.to, w.sit, w.in, w.this, w.tub, w.and, w.rub, ",", w.rub, ",", w.rub, ".", '"'], secondReadingQuestions: ["What did the man say?"] },
                ],
              },
              {
                sentences: [
                  { words: [w.then, w.the, w.man, w.said, ",", '"', w.now, w.I, w.will, w.sleep, w.in, w.this, w.bed, ".", '"'], secondReadingQuestions: ["What did the man say?"] },
                  { words: [w.but, w.a, w.dog, w.was, w.in, w.his, w.bed, "."], secondReadingQuestions: ["What was in his bed?"] },
                ],
              },
              {
                sentences: [{ words: [w.the, w.dog, w.said, ",", '"', w.can, w.I, w.sleep, w.in, w.this, w.bed, "?", '"'] }],
              },
              {
                sentences: [{ words: [w.the, w.man, w.said, ",", '"', w.no, ",", w.go, w.sleep, w.in, w.the, w.tub, ".", '"'] }],
              },
              {
                sentences: [{ words: [w.the, w.dog, w.said, ",", '"', w.I, w.like, w.to, w.sleep, w.in, w.beds, ".", '"'], secondReadingQuestions: ["Will the man let the dog sleep in the bed?"] }],
              },
              {
                sentences: [
                  // prettier-ignore
                  { words: [w.the, w.man, w.said, ",", '"', w.this, w.dog, w.likes, w.to, w.sleep, w.in, w.beds, ",", w.so, w.he, w.can, w.sleep, w.with, w.me, ".", w.but, w.I, w.do, w.not, w.like, w.dogs, w.that, w.bite, ".", '"'] },
                ],
              },
              {
                sentences: [
                  { words: [w.the, w.dog, w.said, ",", '"', w.I, w.do, w.not, w.like, w.to, w.bite, ".", '"'] },
                  { words: [w.so, w.the, w.man, w.and, w.the, w.dog, w.went, w.to, w.sleep, "."] },
                  { words: [w.and, w.the, w.dog, w.did, w.not, w.bite, w.the, w.man, "."], secondReadingQuestions: ["Does the dog like to bite?", "Did he bite the man?"] },
                ],
              },
            ],
          },
          firstReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
            },
          },
          secondReading: {
            fluencyExpectation: "intermediate:say_each_word_the_fast_way",
            scaffolding: {
              disambiguateSounds: true,
              visualizeBlending: true,
              visualizeReadingDirection: true,
            },
          },
        },
      ],
    ],
  },
];
