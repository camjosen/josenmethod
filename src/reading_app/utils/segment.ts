import type { SoundDefinition } from "./sounds";
import type { Word } from "./words";

export type Segment = {
  chars: string;
  sound: SoundDefinition | null;
};

// For each sound symbol, the character sequences to try in order (longest first).
const symbolPatterns: Record<string, string[]> = {
  // Multi-char sounds
  ing: ["ing"],
  th: ["th"],
  sh: ["sh"],
  ch: ["ch"],
  wh: ["wh"],
  qu: ["qu"],
  ar: ["ar"],
  er: ["er"],
  ou: ["ou", "ow"],
  oo: ["oo"],
  ea: ["ea"],
  ai: ["ai", "ay"],
  // Long vowels (multi-char spellings tried first)
  a_long: ["ay", "ai", "ea", "a"],
  e_long: ["ee", "ea", "ey", "ie", "e"],
  i_long: ["igh", "ie", "y", "i"],
  o_long: ["oa", "ow", "oe", "o"],
  u_long: ["ue", "ew", "u"],
  y_long: ["y"],
  // Short vowels
  a: ["a"],
  e: ["e"],
  i: ["i"],
  o: ["o"],
  u: ["u"],
  // Consonants
  m: ["m"],
  r: ["r"],
  n: ["n"],
  l: ["l"],
  w: ["w"],
  I: ["I", "i"],
  v: ["v"],
  y: ["y"],
  z: ["z", "s"],
  d: ["d"],
  g: ["g"],
  b: ["b"],
  j: ["j"],
  s: ["ss", "s"],
  f: ["ff", "ph", "f"],
  t: ["tt", "t"],
  // c = /k/ in "cat"; try plain "c" and "k" but not "ck" (that belongs to k)
  c: ["c", "k"],
  h: ["h"],
  // k = /k/ spelled as "ck", "k", or "c"
  k: ["ck", "k", "c"],
  p: ["pp", "p"],
  x: ["x"],
  // Silent letters
  a_silent: ["a"],
  e_silent: ["e"],
  k_silent: ["k"],
  // Punctuation
  apostrophe: ["'"],
};

/**
 * Maps each sound in word.sounds to the character(s) it corresponds to in
 * word.spelling. Characters that don't map to any sound (e.g. the apostrophe
 * in "don't", or a trailing silent-e not listed in sounds) are returned as
 * segments with sound === null.
 */
export function segmentWord(word: Word): Segment[] {
  const { spelling, sounds } = word;
  const segments: Segment[] = [];
  let cursor = 0;

  for (const sound of sounds) {
    if (cursor >= spelling.length) break;

    const patterns = symbolPatterns[sound.name] ?? [sound.name];
    let matched = false;

    // Allow a small lookahead so we can skip unmapped chars (e.g. "'" in "don't")
    // before finding the pattern for the current sound.
    const maxLookahead = Math.min(cursor + 4, spelling.length);

    for (let ahead = cursor; ahead < maxLookahead && !matched; ahead++) {
      for (const pattern of patterns) {
        const slice = spelling.slice(ahead, ahead + pattern.length);
        if (slice.toLowerCase() === pattern.toLowerCase()) {
          if (ahead > cursor) {
            segments.push({ chars: spelling.slice(cursor, ahead), sound: null });
          }
          segments.push({ chars: slice, sound });
          cursor = ahead + pattern.length;
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      segments.push({ chars: spelling[cursor], sound });
      cursor++;
    }
  }

  // Any remaining characters (e.g. trailing silent-e not listed in sounds)
  if (cursor < spelling.length) {
    segments.push({ chars: spelling.slice(cursor), sound: null });
  }

  return segments;
}
