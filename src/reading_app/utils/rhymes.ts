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
} satisfies Record<string, RhymeItem>;
