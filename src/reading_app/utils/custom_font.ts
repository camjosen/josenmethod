// Single-stroke SVGs (one per character) that can be animated
// using the `stroke-dashoffset` technique.
// The strokes should closely mimic the Patrick Hand font
// https://fonts.google.com/specimen/Patrick+Hand?preview.script=Latn
//
// Coordinate system (viewBox height always 28):
//   baseline y=20  |  x-height y=8  |  ascender/cap y=2  |  descender y=26

export type Glyph = {
  viewBox: string;
  // Each string is an SVG path 'd' attribute. Animate each path independently
  // with stroke-dasharray set to its total length and stroke-dashoffset from
  // that length down to 0.
  paths: string[];
};

export type GlyphKey =
  | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m"
  | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"
  | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M"
  | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"
  | "apostrophe";

export const glyphs: Record<GlyphKey, Glyph> = {

  // ─── Uppercase ───────────────────────────────────────────────────────────────

  A: {
    viewBox: "0 0 18 28",
    paths: ["M 2,20 L 9,2 L 16,20", "M 4,13 L 14,13"],
  },

  // Single stroke retraces the left stem between the two bumps
  B: {
    viewBox: "0 0 18 28",
    paths: [
      "M 3,2 L 3,20 C 14,20 14,15 14,15 C 14,11 3,11 3,11 C 13,11 13,7 13,7 C 13,2 3,2 3,2",
    ],
  },

  C: {
    viewBox: "0 0 18 28",
    paths: [
      "M 15,6 C 13,3 10,2 7,2 C 4,2 2,5 2,11 C 2,16 4,20 8,20 C 11,20 13,18 15,16",
    ],
  },

  // Single stroke: up left stem, arc across top and right, arc along bottom back to start
  D: {
    viewBox: "0 0 18 28",
    paths: [
      "M 3,20 L 3,2 C 9,2 16,5 16,11 C 16,17 9,20 3,20",
    ],
  },

  E: {
    viewBox: "0 0 16 28",
    paths: [
      "M 3,2 L 3,20",
      "M 3,2 L 14,2",
      "M 3,11 L 11,11",
      "M 3,20 L 14,20",
    ],
  },

  F: {
    viewBox: "0 0 16 28",
    paths: [
      "M 3,2 L 3,20",
      "M 3,2 L 14,2",
      "M 3,11 L 11,11",
    ],
  },

  // C-shape with inner horizontal shelf on the right
  G: {
    viewBox: "0 0 18 28",
    paths: [
      "M 15,6 C 13,3 10,2 7,2 C 4,2 2,5 2,11 C 2,16 4,20 8,20 C 12,20 15,18 15,14 L 9,14",
    ],
  },

  H: {
    viewBox: "0 0 18 28",
    paths: ["M 3,2 L 3,20", "M 15,2 L 15,20", "M 3,11 L 15,11"],
  },

  I: {
    viewBox: "0 0 12 28",
    paths: ["M 6,2 L 6,20", "M 2,2 L 10,2", "M 2,20 L 10,20"],
  },

  J: {
    viewBox: "0 0 14 28",
    paths: [
      "M 3,2 L 11,2",
      "M 9,2 L 9,17 C 9,21 7,22 4,21 C 2,20 2,18 2,17",
    ],
  },

  K: {
    viewBox: "0 0 16 28",
    paths: ["M 3,2 L 3,20", "M 14,2 L 3,11 L 14,20"],
  },

  L: {
    viewBox: "0 0 16 28",
    paths: ["M 3,2 L 3,20 L 14,20"],
  },

  // Single stroke: V-shape from bottom-left up and down through center to bottom-right
  M: {
    viewBox: "0 0 22 28",
    paths: ["M 2,20 L 2,2 L 11,14 L 20,2 L 20,20"],
  },

  // Single stroke diagonal connecting two verticals
  N: {
    viewBox: "0 0 18 28",
    paths: ["M 3,20 L 3,2 L 15,20 L 15,2"],
  },

  O: {
    viewBox: "0 0 18 28",
    paths: [
      "M 9,2 C 13,2 16,6 16,11 C 16,16 13,20 9,20 C 5,20 2,16 2,11 C 2,6 5,2 9,2",
    ],
  },

  P: {
    viewBox: "0 0 18 28",
    paths: [
      "M 3,2 L 3,20",
      "M 3,2 C 9,2 15,4 15,8 C 15,11 9,11 3,11",
    ],
  },

  Q: {
    viewBox: "0 0 18 28",
    paths: [
      "M 9,2 C 13,2 16,6 16,11 C 16,16 13,20 9,20 C 5,20 2,16 2,11 C 2,6 5,2 9,2",
      "M 11,16 L 17,22",
    ],
  },

  R: {
    viewBox: "0 0 18 28",
    paths: [
      "M 3,2 L 3,20",
      "M 3,2 C 9,2 15,4 15,8 C 15,11 9,11 3,11 L 15,20",
    ],
  },

  S: {
    viewBox: "0 0 16 28",
    paths: [
      "M 14,5 C 13,3 11,2 8,2 C 5,2 3,4 3,7 C 3,10 5,11 9,11 C 13,11 15,13 15,16 C 15,19 13,20 10,20 C 7,20 5,19 4,17",
    ],
  },

  T: {
    viewBox: "0 0 18 28",
    paths: ["M 9,2 L 9,20", "M 2,2 L 16,2"],
  },

  U: {
    viewBox: "0 0 18 28",
    paths: [
      "M 3,2 L 3,15 C 3,20 6,21 9,21 C 12,21 15,20 15,15 L 15,2",
    ],
  },

  V: {
    viewBox: "0 0 18 28",
    paths: ["M 2,2 L 9,20 L 16,2"],
  },

  W: {
    viewBox: "0 0 24 28",
    paths: ["M 2,2 L 7,20 L 12,8 L 17,20 L 22,2"],
  },

  X: {
    viewBox: "0 0 16 28",
    paths: ["M 2,2 L 14,20", "M 14,2 L 2,20"],
  },

  Y: {
    viewBox: "0 0 16 28",
    paths: ["M 2,2 L 8,11 L 14,2", "M 8,11 L 8,20"],
  },

  Z: {
    viewBox: "0 0 16 28",
    paths: ["M 2,2 L 14,2 L 2,20 L 14,20"],
  },

  // ─── Lowercase ───────────────────────────────────────────────────────────────

  // Bowl traced CCW from top-right, then downstroke on right side
  a: {
    viewBox: "0 0 16 28",
    paths: [
      "M 13,11 C 13,7 10,5 7,5 C 4,5 2,8 2,12 C 2,16 4,20 7,20 C 10,20 13,17 13,11 L 13,20",
    ],
  },

  // Left ascender + right bowl (single path retraces stem to bowl junction)
  b: {
    viewBox: "0 0 16 28",
    paths: [
      "M 3,2 L 3,20 L 3,13 C 3,9 5,7 8,7 C 11,7 13,10 13,13 C 13,17 11,20 8,20 C 5,20 3,18 3,13",
    ],
  },

  // Left-opening arc
  c: {
    viewBox: "0 0 14 28",
    paths: [
      "M 13,9 C 12,7 10,6 7,6 C 4,6 2,8 2,13 C 2,17 4,20 7,20 C 10,20 12,18 13,16",
    ],
  },

  // Right ascender + left bowl
  d: {
    viewBox: "0 0 16 28",
    paths: [
      "M 13,2 L 13,20 L 13,14 C 13,10 11,8 8,8 C 5,8 2,10 2,14 C 2,17 4,20 7,20 C 10,20 13,18 13,14",
    ],
  },

  // Horizontal midbar, then arc CW back around to open mouth
  e: {
    viewBox: "0 0 16 28",
    paths: [
      "M 2,13 L 12,13 C 12,9 10,6 7,6 C 4,6 2,9 2,13 C 2,17 4,20 7,20 C 10,20 12,18 13,16",
    ],
  },

  // Curved top stem + crossbar
  f: {
    viewBox: "0 0 14 28",
    paths: [
      "M 11,5 C 11,3 10,2 8,2 C 6,2 5,3 5,5 L 5,20",
      "M 2,11 L 10,11",
    ],
  },

  // Bowl + descending hook
  g: {
    viewBox: "0 0 16 28",
    paths: [
      "M 13,11 C 13,7 10,5 7,5 C 4,5 2,8 2,12 C 2,16 4,20 7,20 C 10,20 13,17 13,11 L 13,24 C 13,27 11,28 8,28 C 6,28 5,27 5,25",
    ],
  },

  // Left ascender + single arch
  h: {
    viewBox: "0 0 16 28",
    paths: [
      "M 3,2 L 3,20 L 3,12 C 3,9 5,8 8,8 C 11,8 13,10 13,13 L 13,20",
    ],
  },

  // Vertical stroke + dot
  i: {
    viewBox: "0 0 10 28",
    paths: [
      "M 5,9 L 5,20",
      "M 6,5 C 6,3.5 4,3.5 4,5 C 4,6.5 6,6.5 6,5",
    ],
  },

  // Descending vertical with hook + dot
  j: {
    viewBox: "0 0 12 30",
    paths: [
      "M 7,9 L 7,24 C 7,27 5,28 3,26",
      "M 8,5 C 8,3.5 6,3.5 6,5 C 6,6.5 8,6.5 8,5",
    ],
  },

  // Left ascender + two angled strokes
  k: {
    viewBox: "0 0 14 28",
    paths: ["M 3,2 L 3,20", "M 12,8 L 3,14 L 12,20"],
  },

  // Tall vertical — ascender to baseline
  l: {
    viewBox: "0 0 10 28",
    paths: ["M 5,2 L 5,20"],
  },

  // Two arches — single path retraces stem between arches
  m: {
    viewBox: "0 0 22 28",
    paths: [
      "M 2,9 L 2,20 L 2,12 C 2,9 4,8 6,8 C 9,8 10,10 10,13 L 10,20 L 10,13 C 10,10 12,8 15,8 C 18,8 20,10 20,13 L 20,20",
    ],
  },

  // Single arch
  n: {
    viewBox: "0 0 16 28",
    paths: [
      "M 3,9 L 3,20 L 3,12 C 3,9 5,8 8,8 C 11,8 13,10 13,13 L 13,20",
    ],
  },

  // Closed oval, clockwise from top
  o: {
    viewBox: "0 0 16 28",
    paths: [
      "M 7,6 C 10,6 13,9 13,13 C 13,17 10,20 7,20 C 4,20 2,17 2,13 C 2,9 4,6 7,6",
    ],
  },

  // Left stem with descender + right bowl
  p: {
    viewBox: "0 0 16 28",
    paths: [
      "M 3,9 L 3,26 L 3,14 C 3,10 5,8 8,8 C 11,8 13,11 13,14 C 13,17 11,20 8,20 C 5,20 3,18 3,14",
    ],
  },

  // Right descender + left bowl
  q: {
    viewBox: "0 0 14 28",
    paths: [
      "M 11,9 L 11,26 L 11,14 C 11,10 9,8 6,8 C 3,8 1,11 1,14 C 1,17 3,20 6,20 C 9,20 11,18 11,14",
    ],
  },

  // Downstroke then partial rightward arch
  r: {
    viewBox: "0 0 14 28",
    paths: [
      "M 3,9 L 3,20 L 3,12 C 3,9 5,7 7,7 C 9,7 11,8 11,10",
    ],
  },

  // Double-curve S shape
  s: {
    viewBox: "0 0 14 28",
    paths: [
      "M 12,9 C 12,7 10,6 8,6 C 5,6 3,8 3,10 C 3,12 5,13 8,13 C 11,13 12,15 12,17 C 12,19 10,20 8,20 C 6,20 4,19 3,17",
    ],
  },

  // Vertical + crossbar
  t: {
    viewBox: "0 0 14 28",
    paths: ["M 7,4 L 7,20", "M 3,10 L 12,10"],
  },

  // Two downstrokes connected by a curved bottom
  u: {
    viewBox: "0 0 16 28",
    paths: [
      "M 2,8 L 2,17 C 2,21 5,22 8,21 C 11,20 13,18 13,15 L 13,8",
    ],
  },

  // V shape
  v: {
    viewBox: "0 0 14 28",
    paths: ["M 2,8 L 7,20 L 12,8"],
  },

  // Double-V shape
  w: {
    viewBox: "0 0 20 28",
    paths: ["M 2,8 L 6,20 L 10,11 L 14,20 L 18,8"],
  },

  // Two crossing diagonals
  x: {
    viewBox: "0 0 14 28",
    paths: ["M 2,8 L 12,20", "M 12,8 L 2,20"],
  },

  // Two upper diagonals, right leg continues below baseline
  y: {
    viewBox: "0 0 14 28",
    paths: [
      "M 2,8 L 7,16",
      "M 12,8 L 7,16 L 5,26 C 4.5,27.5 3.5,27.5 3,26",
    ],
  },

  // Three-stroke Z
  z: {
    viewBox: "0 0 14 28",
    paths: ["M 2,8 L 12,8 L 2,20 L 12,20"],
  },

  // ─── Punctuation ─────────────────────────────────────────────────────────────

  // Comma-like curved apostrophe
  apostrophe: {
    viewBox: "0 0 8 28",
    paths: ["M 4,4 C 5,4 5.5,5 4.5,6 L 3.5,8"],
  },
};
