import type { CSSProperties, ReactNode } from "react";
import type { SoundDefinition } from "@reading_app/utils/sounds";
import { type FontKey, fontMetadata } from "@reading_app/utils/fonts";
import type { Word as WordData } from "@reading_app/utils/words";
import { GlyphSVG } from "./GlyphSVG";

interface Props {
  word: WordData;
  font?: FontKey;
  fontSize?: number;
  color?: string;
  showLongVowel?: boolean;
  showDigraph?: boolean;
  showSilent?: boolean;
}

type Mode = "text" | "glyph";

function soundOpacity(sound: SoundDefinition, showSilent: boolean): number {
  return showSilent && sound.silent ? 0.35 : 1;
}

const markBase: CSSProperties = {
  position: "absolute",
  left: "15%",
  right: "15%",
  height: "0.08em",
  background: "currentColor",
  borderRadius: "1px",
  opacity: 0.85,
  pointerEvents: "none",
};
// Text mode anchors to the inline-block's line-box; glyph mode anchors to the flex-end SVG edge.
const longBarText: CSSProperties = { ...markBase, top: "0.22em" };
const longBarGlyph: CSSProperties = { ...markBase, top: "-0.08em" };
const underlineText: CSSProperties = { ...markBase, bottom: "0.12em" };
const underlineGlyph: CSSProperties = { ...markBase, bottom: "-0.1em" };

interface SoundSpanProps {
  sound: SoundDefinition;
  mode: Mode;
  showLongVowel: boolean;
  showDigraph: boolean;
  showSilent: boolean;
  children: ReactNode;
}

function SoundSpan({
  sound,
  mode,
  showLongVowel,
  showDigraph,
  showSilent,
  children,
}: SoundSpanProps) {
  const flex = mode === "glyph";
  const wrapperStyle: CSSProperties = {
    opacity: soundOpacity(sound, showSilent),
    position: "relative",
    display: flex ? "inline-flex" : "inline-block",
    ...(flex ? { alignItems: "flex-end", gap: 1 } : null),
  };
  return (
    <span style={wrapperStyle}>
      {children}
      {showLongVowel && sound.long_vowel && (
        <span style={flex ? longBarGlyph : longBarText} />
      )}
      {showDigraph && sound.digraph && (
        <span style={flex ? underlineGlyph : underlineText} />
      )}
    </span>
  );
}

export function Word({
  word,
  font,
  fontSize,
  color,
  showLongVowel = true,
  showDigraph = true,
  showSilent = true,
}: Props) {
  const flags = { showLongVowel, showDigraph, showSilent };
  if (font === "custom") {
    const size = fontSize ?? 24;
    return (
      <span style={{ display: "inline-flex", alignItems: "flex-end", gap: 1, color }}>
        {word.sounds.map((sound, i) => (
          <SoundSpan key={i} sound={sound} mode="glyph" {...flags}>
            {sound.characters.split("").map((char, j) => (
              <GlyphSVG key={j} char={char} fontSize={size} />
            ))}
          </SoundSpan>
        ))}
      </span>
    );
  }

  const fontFamily = font ? fontMetadata[font].fontFamily : undefined;
  return (
    <span style={{ fontFamily, fontSize, color }}>
      {word.sounds.map((sound, i) => (
        <SoundSpan key={i} sound={sound} mode="text" {...flags}>
          {sound.characters}
        </SoundSpan>
      ))}
    </span>
  );
}
