import type { ReactNode } from "react";
import type { ActivityType } from "./data";

export const Glyphs: Record<ActivityType, ReactNode> = {
  read: (
    <svg viewBox="0 0 24 24" className="glyph">
      <path d="M3 5.5 C 7 5, 10 6, 12 8 C 14 6, 17 5, 21 5.5 L 21 19 C 17 18.5, 14 19.5, 12 21 C 10 19.5, 7 18.5, 3 19 Z" />
      <path d="M12 8 L 12 21" />
    </svg>
  ),
  listen: (
    <svg viewBox="0 0 24 24" className="glyph">
      <path d="M7 14 C 5 14, 4 12, 4 10 C 4 6, 7 3, 12 3 C 17 3, 20 6, 20 10 C 20 12, 19 14, 17 14" />
      <path d="M7 14 C 7 17, 5 17, 4 18 C 5 19, 7 21, 9 20 C 11 19, 10 16, 10 14 Z" />
      <path d="M17 14 C 17 17, 19 17, 20 18 C 19 19, 17 21, 15 20 C 13 19, 14 16, 14 14 Z" />
    </svg>
  ),
  speak: (
    <svg viewBox="0 0 24 24" className="glyph">
      <path d="M12 3 C 10 3, 9 4, 9 6 L 9 12 C 9 14, 10 15, 12 15 C 14 15, 15 14, 15 12 L 15 6 C 15 4, 14 3, 12 3 Z" />
      <path d="M6 11 C 6 15, 9 18, 12 18 C 15 18, 18 15, 18 11" />
      <path d="M12 18 L 12 21 M9 21 L 15 21" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" className="glyph">
      <path d="M12 3 L 14.5 9.2 L 21 9.8 L 16 14 L 17.5 20.5 L 12 17 L 6.5 20.5 L 8 14 L 3 9.8 L 9.5 9.2 Z" />
    </svg>
  ),
};

export const Fleuron = () => (
  <svg viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <path d="M4 12 L 14 12" />
    <path d="M 14 8 Q 20 4, 26 8 Q 20 12, 14 8 Z" fill="currentColor" stroke="none" opacity="0.65" />
    <path d="M 14 16 Q 20 20, 26 16 Q 20 12, 14 16 Z" fill="currentColor" stroke="none" opacity="0.65" />
    <path d="M26 12 L 36 12" />
  </svg>
);

export const FootOrnament = () => (
  <svg viewBox="0 0 160 20" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M0 10 H 60" />
    <path d="M 68 6 Q 74 10, 80 6 Q 74 10, 80 14 Q 74 10, 68 14 Q 74 10, 68 6 Z" fill="currentColor" stroke="none" opacity="0.7" />
    <path d="M 100 10 H 160" />
    <circle cx="80" cy="10" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const BackArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12 H 5" />
    <path d="M 11 6 L 5 12 L 11 18" />
  </svg>
);

export const LogoMark = () => (
  <svg viewBox="0 0 140 120" fill="none" stroke="var(--re-ink)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 18,60 C 18,22 62,22 66,60 C 70,98 114,98 114,60 C 114,36 96,28 80,44" />
    <circle cx="114" cy="60" r="8.5" fill="var(--re-oxblood)" stroke="none" />
  </svg>
);

export const Waveform = () => (
  <svg viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M1 6 L 4 6" />
    <path d="M 6 2 L 6 10" />
    <path d="M 9 4 L 9 8" />
    <path d="M 12 1 L 12 11" />
    <path d="M 15 3 L 15 9" />
    <path d="M 18 2 L 18 10" />
    <path d="M 20 5 L 20 7" />
    <path d="M 23 6 L 24 6" />
  </svg>
);

export const StarBig = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="star">
    <path d="M12 2 L 14.8 9.2 L 22 9.8 L 16.4 14.3 L 18.3 21.5 L 12 17.5 L 5.7 21.5 L 7.6 14.3 L 2 9.8 L 9.2 9.2 Z" />
  </svg>
);
