type SoundDefinition = {
  symbol: string;
  as_in: string;
  whispered?: boolean;
  stop?: boolean;
  silent?: boolean;
};

export const sounds: Array<SoundDefinition> = [
  // vowels
  { symbol: "a", as_in: "and" },
  { symbol: "e", as_in: "end" },
  { symbol: "i", as_in: "if" },
  { symbol: "o", as_in: "ox" },
  { symbol: "u", as_in: "under" },

  // long vowel => "say the letter name"
  { symbol: "a_long", as_in: "ate" },
  { symbol: "e_long", as_in: "eat" },
  { symbol: "i_long", as_in: "ice" },
  { symbol: "o_long", as_in: "over" },
  { symbol: "u_long", as_in: "use" },
  { symbol: "y_long", as_in: "my" },

  // special vowel sounds
  { symbol: "oo", as_in: "moon" },
  { symbol: "ea", as_in: "eat" },
  { symbol: "ai", as_in: "rain" },
  { symbol: "ou", as_in: "loud" },

  // consonants voiced and held
  { symbol: "m", as_in: "man" },
  { symbol: "r", as_in: "run" },
  { symbol: "th", as_in: "this" },
  { symbol: "n", as_in: "no" },
  { symbol: "l", as_in: "late" },
  { symbol: "w", as_in: "we" },
  { symbol: "I", as_in: "I" },
  { symbol: "v", as_in: "very" },
  { symbol: "ar", as_in: "arm" },
  { symbol: "ing", as_in: "sing" },
  { symbol: "y", as_in: "yes" },
  { symbol: "er", as_in: "brother" },
  { symbol: "qu", as_in: "quick" },
  { symbol: "z", as_in: "buzz" },

  // voiced but not held
  { symbol: "d", as_in: "mad", stop: true },
  { symbol: "g", as_in: "tag", stop: true },
  { symbol: "b", as_in: "grab", stop: true },
  { symbol: "j", as_in: "judge", stop: true },
  { symbol: "wh", as_in: "why", stop: true },

  // whispered and held consonants
  { symbol: "s", as_in: "sat", whispered: true },
  { symbol: "f", as_in: "fun", whispered: true },
  { symbol: "sh", as_in: "she", whispered: true },

  // whispered but not held consonants
  { symbol: "t", as_in: "cat", whispered: true, stop: true },
  { symbol: "c", as_in: "tack", whispered: true, stop: true },
  { symbol: "h", as_in: "hat", whispered: true, stop: true },
  { symbol: "k", as_in: "tack", whispered: true, stop: true },
  { symbol: "p", as_in: "tap", whispered: true, stop: true },
  { symbol: "ch", as_in: "touch", whispered: true, stop: true },
  { symbol: "x", as_in: "ox", whispered: true, stop: true },

  // silent
  { symbol: "a_silent", as_in: "eat", silent: true },
  { symbol: "k_silent", as_in: "knight", silent: true },
] as const;
