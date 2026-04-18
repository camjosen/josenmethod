export const sounds = [
  // vowels
  { symbol: "a", as_in: "and", voiced: true, hold: true },
  { symbol: "e", as_in: "end", voiced: true, hold: true },
  { symbol: "i", as_in: "if", voiced: true, hold: true },
  { symbol: "o", as_in: "ox", voiced: true, hold: true },
  { symbol: "u", as_in: "under", voiced: true, hold: true },

  // long vowel => "say the letter name"
  { symbol: "a_long", as_in: "ate", voiced: true, hold: true },
  { symbol: "e_long", as_in: "eat", voiced: true, hold: true },
  { symbol: "i_long", as_in: "ice", voiced: true, hold: true },
  { symbol: "o_long", as_in: "over", voiced: true, hold: true },
  { symbol: "u_long", as_in: "use", voiced: true, hold: true },
  { symbol: "y_long", as_in: "my", voiced: true, hold: true },

  // special vowel sounds
  { symbol: "oo", as_in: "moon", voiced: true, hold: true },
  { symbol: "ea", as_in: "eat", voiced: true, hold: true },
  { symbol: "ai", as_in: "rain", voiced: true, hold: true },
  { symbol: "ou", as_in: "loud", voiced: true, hold: true },

  // whispered and held consonants
  { symbol: "s", as_in: "sat", voiced: false, hold: true },
  { symbol: "f", as_in: "fun", voiced: false, hold: true },
  { symbol: "sh", as_in: "she", voiced: false, hold: true },

  // whispered but not held consonants
  { symbol: "t", as_in: "cat", voiced: false, hold: false },
  { symbol: "c", as_in: "tack", voiced: false, hold: false },
  { symbol: "h", as_in: "hat", voiced: false, hold: false },
  { symbol: "k", as_in: "tack", voiced: false, hold: false },
  { symbol: "p", as_in: "tap", voiced: false, hold: false },
  { symbol: "ch", as_in: "touch", voiced: false, hold: false },
  { symbol: "x", as_in: "ox", voiced: false, hold: false },

  // voiced and held
  { symbol: "m", as_in: "man", voiced: true, hold: true },
  { symbol: "r", as_in: "run", voiced: true, hold: true },
  { symbol: "th", as_in: "this", voiced: true, hold: true },
  { symbol: "n", as_in: "no", voiced: true, hold: true },
  { symbol: "l", as_in: "late", voiced: true, hold: true },
  { symbol: "w", as_in: "we", voiced: true, hold: true },
  { symbol: "I", as_in: "I", voiced: true, hold: true },
  { symbol: "v", as_in: "very", voiced: true, hold: true },
  { symbol: "ar", as_in: "arm", voiced: true, hold: true },
  { symbol: "ing", as_in: "sing", voiced: true, hold: true },
  { symbol: "y", as_in: "yes", voiced: true, hold: true },
  { symbol: "er", as_in: "brother", voiced: true, hold: true },
  { symbol: "qu", as_in: "quick", voiced: true, hold: true },
  { symbol: "z", as_in: "buzz", voiced: true, hold: true },

  // voiced but not held
  { symbol: "d", as_in: "mad", voiced: true, hold: false },
  { symbol: "g", as_in: "tag", voiced: true, hold: false },
  { symbol: "b", as_in: "grab", voiced: true, hold: false },
  { symbol: "j", as_in: "judge", voiced: true, hold: false },
  { symbol: "wh", as_in: "why", voiced: true, hold: false },
] as const;
