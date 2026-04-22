import { z } from "zod/v4";

// prettier-ignore
const soundSymbols = [
  // vowels
  "a", "e", "i", "o", "u",
  // long vowels
  "a_long", "e_long", "i_long", "o_long", "u_long", "y_long",
  // special vowel sounds
  "oo", "ea", "ai", "ay", "ee", "ou", "ow",
  // consonants voiced and held
  "m", "mm", "r", "th", "n", "l", "ll", "w", "I", "v", "ar", "ing", "y", "er", "qu", "z",
  // voiced but not held
  "d", "g", "gg", "b", "j", "wh",
  // whispered and held
  "s", "ss", "f", "ff", "sh",
  // whispered but not held
  "t", "tt", "c", "ck", "h", "k", "p", "pp", "ch", "x",
  // silent
  "a_silent", "e_silent", "k_silent",
  // punctuation
  "apostrophe"
] as const;
export const soundSchema = z.enum(soundSymbols);

export const soundDefinitionSchema = z.object({
  name: soundSchema,
  characters: z.string().describe("Characters to render for this sound"),
  as_in: z.string(),
  whispered: z.boolean().optional(),
  stop: z.boolean().optional(),
  silent: z.boolean().optional(),
});
export type SoundDefinition = z.infer<typeof soundDefinitionSchema>;

// prettier-ignore
export const sounds = {
  // vowels
  a:      { name: "a",      characters: "a",   as_in: "and" },
  e:      { name: "e",      characters: "e",   as_in: "end" },
  i:      { name: "i",      characters: "i",   as_in: "if" },
  o:      { name: "o",      characters: "o",   as_in: "ox" },
  u:      { name: "u",      characters: "u",   as_in: "under" },

  // long vowels ("say the letter name")
  a_long: { name: "a_long", characters: "a",   as_in: "ate" },
  e_long: { name: "e_long", characters: "e",   as_in: "eat" },
  i_long: { name: "i_long", characters: "i",   as_in: "ice" },
  o_long: { name: "o_long", characters: "o",   as_in: "over" },
  u_long: { name: "u_long", characters: "u",   as_in: "use" },
  y_long: { name: "y_long", characters: "y",   as_in: "my" },

  // special vowel sounds
  oo: { name: "oo", characters: "oo",  as_in: "moon" },
  ea: { name: "ea", characters: "ea",  as_in: "eat" },
  ai: { name: "ai", characters: "ai",  as_in: "rain" },
  ay: { name: "ay", characters: "ay",  as_in: "day" },
  ee: { name: "ee", characters: "ee",  as_in: "see" },
  ou: { name: "ou", characters: "ou",  as_in: "loud" },
  ow: { name: "ow", characters: "ow",  as_in: "cow" },

  // consonants voiced and held
  m:   { name: "m",   characters: "m",   as_in: "man" },
  mm:  { name: "mm",  characters: "mm",  as_in: "swimming" },
  r:   { name: "r",   characters: "r",   as_in: "run" },
  th:  { name: "th",  characters: "th",  as_in: "this" },
  n:   { name: "n",   characters: "n",   as_in: "no" },
  l:   { name: "l",   characters: "l",   as_in: "late" },
  ll:  { name: "ll",  characters: "ll",  as_in: "bill" },
  w:   { name: "w",   characters: "w",   as_in: "we" },
  I:   { name: "I",   characters: "I",   as_in: "I" },
  v:   { name: "v",   characters: "v",   as_in: "very" },
  ar:  { name: "ar",  characters: "ar",  as_in: "arm" },
  ing: { name: "ing", characters: "ing", as_in: "sing" },
  y:   { name: "y",   characters: "y",   as_in: "yes" },
  er:  { name: "er",  characters: "er",  as_in: "brother" },
  qu:  { name: "qu",  characters: "qu",  as_in: "quick" },
  z:   { name: "z",   characters: "z",   as_in: "buzz" },

  // voiced but not held
  d:  { name: "d",  characters: "d",  as_in: "mad",   stop: true },
  g:  { name: "g",  characters: "g",  as_in: "tag",   stop: true },
  gg: { name: "gg", characters: "gg", as_in: "digging", stop: true },
  b:  { name: "b",  characters: "b",  as_in: "grab",  stop: true },
  j:  { name: "j",  characters: "j",  as_in: "judge", stop: true },
  wh: { name: "wh", characters: "wh", as_in: "why",   stop: true },

  // whispered and held consonants
  s:  { name: "s",  characters: "s",  as_in: "sat",  whispered: true },
  ss: { name: "ss", characters: "ss", as_in: "kiss", whispered: true },
  f:  { name: "f",  characters: "f",  as_in: "fun",  whispered: true },
  ff: { name: "ff", characters: "ff", as_in: "biff", whispered: true },
  sh: { name: "sh", characters: "sh", as_in: "she",  whispered: true },

  // whispered but not held consonants
  t:  { name: "t",  characters: "t",  as_in: "cat",      whispered: true, stop: true },
  tt: { name: "tt", characters: "tt", as_in: "mitt",     whispered: true, stop: true },
  c:  { name: "c",  characters: "c",  as_in: "tack",     whispered: true, stop: true },
  ck: { name: "ck", characters: "ck", as_in: "back",     whispered: true, stop: true },
  h:  { name: "h",  characters: "h",  as_in: "hat",      whispered: true, stop: true },
  k:  { name: "k",  characters: "k",  as_in: "tack",     whispered: true, stop: true },
  p:  { name: "p",  characters: "p",  as_in: "tap",      whispered: true, stop: true },
  pp: { name: "pp", characters: "pp", as_in: "stopping", whispered: true, stop: true },
  ch: { name: "ch", characters: "ch", as_in: "touch",    whispered: true, stop: true },
  x:  { name: "x",  characters: "x",  as_in: "ox",       whispered: true, stop: true },

  // silent
  a_silent: { name: "a_silent", characters: "a", as_in: "eat",    silent: true },
  e_silent: { name: "e_silent", characters: "e", as_in: "kite",   silent: true },
  k_silent: { name: "k_silent", characters: "k", as_in: "knight", silent: true },

  // punctuation (silent)
  apostrophe: { name: "apostrophe", characters: "'", as_in: "let's", silent: true },
} as const satisfies Record<z.infer<typeof soundSchema>, SoundDefinition>;
