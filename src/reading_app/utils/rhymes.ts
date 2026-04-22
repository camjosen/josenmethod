import { sounds as s, SoundDefinition } from "./sounds.ts";
import { words as w, Word } from "./words.ts";

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
  m_am: {
    startingSound: s.m,
    ending: { spelling: "am", sounds: [s.a, s.m] },
    fullWord: w.mam,
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
  th_at: { startingSound: s.th, ending: w.at, fullWord: w.that },
  m_an: { startingSound: s.m, ending: w.an, fullWord: w.man },
  th_an: { startingSound: s.th, ending: w.an, fullWord: w.than },
  c_at: { startingSound: s.c, ending: w.at, fullWord: w.cat },
  d_one: {
    startingSound: s.d,
    ending: { spelling: "one", sounds: [s.u, s.n] },
    fullWord: w.done,
  },
  c_an: { startingSound: s.c, ending: w.an, fullWord: w.can },
  m_oo: {
    startingSound: s.m,
    ending: { spelling: "oo", sounds: [s.oo] },
    fullWord: w.moo,
  },
  t_oo: {
    startingSound: s.t,
    ending: { spelling: "oo", sounds: [s.oo] },
    fullWord: w.too,
  },
  d_o: {
    startingSound: s.d,
    ending: { spelling: "o", sounds: [s.oo] },
    fullWord: w.do,
  },
} satisfies Record<string, RhymeItem>;
