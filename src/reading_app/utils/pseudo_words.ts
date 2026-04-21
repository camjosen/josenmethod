import { sounds as s } from "./sounds";
import { Word } from "./shared_schemas";

export const pseudoWords = {
  em: { spelling: "em", sounds: [s.e_long, s.m] },
  es: { spelling: "es", sounds: [s.e_long, s.s] },
  ma: { spelling: "ma", sounds: [s.m, s.a] },
  met: { spelling: "met", sounds: [s.m, s.e_long, s.t] },
  rope: { spelling: "rope", sounds: [s.r, s.o_long, s.p] },
  sa: { spelling: "sa", sounds: [s.s, s.a] },
  se: { spelling: "se", sounds: [s.s, s.e_long] },
  set: { spelling: "set", sounds: [s.s, s.e_long, s.t] },
  soap: { spelling: "soap", sounds: [s.s, s.o_long, s.p] },
} satisfies Record<string, Word>;
