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

function soundOpacity(sound: SoundDefinition): number {
  return sound.silent ? 0.35 : 1;
}

export function Word({ word, font, fontSize = 24, color }: Props) {
  if (font !== "custom") {
    const { fontFamily } = fontMetadata[font];
    return (
      <span style={{ fontFamily, fontSize, color }}>
        {word.sounds.map((sound, i) => (
          <span key={i} style={{ opacity: soundOpacity(sound) }}>
            {sound.characters}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span style={{ display: "inline-flex", alignItems: "flex-end", gap: 1, color }}>
      {word.sounds.flatMap((sound, i) =>
        sound.characters.split("").map((char, j) => (
          <GlyphSVG
            key={`${i}-${j}`}
            char={char}
            fontSize={fontSize}
            opacity={soundOpacity(sound)}
          />
        ))
      )}
    </span>
  );
}
