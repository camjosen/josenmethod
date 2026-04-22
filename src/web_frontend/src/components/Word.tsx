import { segmentWord, type Segment } from "@reading_app/utils/segment";
import type { SoundDefinition } from "@reading_app/utils/sounds";
import { type FontKey, fontMetadata } from "@reading_app/utils/fonts";
import type { Word as WordData } from "@reading_app/utils/words";
import { GlyphSVG } from "./GlyphSVG";

interface Props {
  word: WordData;
  font: FontKey;
  fontSize?: number;
  color?: string;
}

function segmentOpacity(sound: SoundDefinition | null): number {
  if (sound === null) return 0.35;
  if (sound.silent) return 0.35;
  return 1;
}

export function Word({ word, font, fontSize = 24, color }: Props) {
  const segments = segmentWord(word);

  if (font !== "custom") {
    const { fontFamily } = fontMetadata[font];
    return (
      <span style={{ fontFamily, fontSize, color }}>
        {segments.map((seg, i) => (
          <span key={i} style={{ opacity: segmentOpacity(seg.sound) }}>
            {seg.chars}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span style={{ display: "inline-flex", alignItems: "flex-end", gap: 1, color }}>
      {segments.flatMap((seg: Segment, i) =>
        seg.chars.split("").map((char, j) => (
          <GlyphSVG
            key={`${i}-${j}`}
            char={char}
            fontSize={fontSize}
            opacity={segmentOpacity(seg.sound)}
          />
        ))
      )}
    </span>
  );
}
