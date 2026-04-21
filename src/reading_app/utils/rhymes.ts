import { sounds as s } from "./sounds.ts";
import { words as w } from "./words.ts";
import { SoundDefinition, Word } from "./shared_schemas.ts";

type RhymeItem = {
  startingSound: SoundDefinition;
  ending: Word;
  fullWord: Word;
};

export const rhymes = {
  m_e: {
    startingSound: s.m,
    ending: { spelling: "e", sounds: [s.e_long] },
    fullWord: w.me,
  },
  m_at: { startingSound: s.m, ending: w.at, fullWord: w.mat },
  m_eat: { startingSound: s.m, ending: w.eat, fullWord: w.meat },
  m_ean: {
    startingSound: s.m,
    ending: { spelling: "ean", sounds: [s.e_long, s.n] },
    fullWord: w.mean,
  },
  s_ee: {
    startingSound: s.s,
    ending: { spelling: "ee", sounds: [s.e_long] },
    fullWord: w.see,
  },
  s_at: { startingSound: s.s, ending: w.at, fullWord: w.sat },
  s_eat: { startingSound: s.s, ending: w.eat, fullWord: w.seat },
  s_een: {
    startingSound: s.s,
    ending: { spelling: "een", sounds: [s.e_long, s.n] },
    fullWord: w.seen,
  },
  s_un: {
    startingSound: s.s,
    ending: { spelling: "un", sounds: [s.u, s.n] },
    fullWord: w.sun,
  },
  s_am: {
    startingSound: s.s,
    ending: { spelling: "am", sounds: [s.a, s.m] },
    fullWord: w.sam,
  },
  r_at: { startingSound: s.r, ending: w.at, fullWord: w.rat },
  r_oad: {
    startingSound: s.r,
    ending: { spelling: "oad", sounds: [s.o_long, s.d] },
    fullWord: w.run,
  },
  r_un: {
    startingSound: s.r,
    ending: { spelling: "un", sounds: [s.u, s.n] },
    fullWord: w.run,
  },
  r_am: {
    startingSound: s.r,
    ending: { spelling: "am", sounds: [s.a, s.m] },
    fullWord: w.ram,
  },
  r_eed: {
    startingSound: s.r,
    ending: { spelling: "eed", sounds: [s.e_long, s.d] },
    fullWord: w.read,
  },
  s_eed: {
    startingSound: s.s,
    ending: { spelling: "eed", sounds: [s.e_long, s.d] },
    fullWord: w.seed,
  },
  r_ope: {
    startingSound: s.r,
    ending: { spelling: "ope", sounds: [s.o_long, s.p, s.e_silent] },
    fullWord: w.rope,
  },
  s_oap: {
    startingSound: s.s,
    ending: { spelling: "oap", sounds: [s.o_long, s.a_silent, s.p] },
    fullWord: w.soap,
  },
} satisfies Record<string, RhymeItem>;
