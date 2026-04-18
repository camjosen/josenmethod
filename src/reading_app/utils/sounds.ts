type SoundDefinition = {
  symbol: string;
  as_in: string;
  whispered?: boolean;
  stop?: boolean;
  silent?: boolean;
};

export const sounds = {
  // vowels
  a: { symbol: "a", as_in: "and" },
  e: { symbol: "e", as_in: "end" },
  i: { symbol: "i", as_in: "if" },
  o: { symbol: "o", as_in: "ox" },
  u: { symbol: "u", as_in: "under" },

  // long vowels ("say the letter name")
  a_long: { symbol: "a_long", as_in: "ate" },
  e_long: { symbol: "e_long", as_in: "eat" },
  i_long: { symbol: "i_long", as_in: "ice" },
  o_long: { symbol: "o_long", as_in: "over" },
  u_long: { symbol: "u_long", as_in: "use" },
  y_long: { symbol: "y_long", as_in: "my" },

  // special vowel sounds
  oo: { symbol: "oo", as_in: "moon" },
  ea: { symbol: "ea", as_in: "eat" },
  ai: { symbol: "ai", as_in: "rain" },
  ou: { symbol: "ou", as_in: "loud" },

  // consonants voiced and held
  m: { symbol: "m", as_in: "man" },
  r: { symbol: "r", as_in: "run" },
  th: { symbol: "th", as_in: "this" },
  n: { symbol: "n", as_in: "no" },
  l: { symbol: "l", as_in: "late" },
  w: { symbol: "w", as_in: "we" },
  I: { symbol: "I", as_in: "I" },
  v: { symbol: "v", as_in: "very" },
  ar: { symbol: "ar", as_in: "arm" },
  ing: { symbol: "ing", as_in: "sing" },
  y: { symbol: "y", as_in: "yes" },
  er: { symbol: "er", as_in: "brother" },
  qu: { symbol: "qu", as_in: "quick" },
  z: { symbol: "z", as_in: "buzz" },

  // voiced but not held
  d: { symbol: "d", as_in: "mad", stop: true },
  g: { symbol: "g", as_in: "tag", stop: true },
  b: { symbol: "b", as_in: "grab", stop: true },
  j: { symbol: "j", as_in: "judge", stop: true },
  wh: { symbol: "wh", as_in: "why", stop: true },

  // whispered and held consonants
  s: { symbol: "s", as_in: "sat", whispered: true },
  f: { symbol: "f", as_in: "fun", whispered: true },
  sh: { symbol: "sh", as_in: "she", whispered: true },

  // whispered but not held consonants
  t: { symbol: "t", as_in: "cat", whispered: true, stop: true },
  c: { symbol: "c", as_in: "tack", whispered: true, stop: true },
  h: { symbol: "h", as_in: "hat", whispered: true, stop: true },
  k: { symbol: "k", as_in: "tack", whispered: true, stop: true },
  p: { symbol: "p", as_in: "tap", whispered: true, stop: true },
  ch: { symbol: "ch", as_in: "touch", whispered: true, stop: true },
  x: { symbol: "x", as_in: "ox", whispered: true, stop: true },

  // silent
  a_silent: { symbol: "a_silent", as_in: "eat", silent: true },
  k_silent: { symbol: "k_silent", as_in: "knight", silent: true },
} as const satisfies Record<string, SoundDefinition>;
