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
  /** Ochre at 0.85 by default — the brand's "hint" colour. */
  hintColor?: string;
  showLongVowel?: boolean;
  showDigraph?: boolean;
  showSilent?: boolean;
  /** Render one dot per sound below the word to help with sounding out. */
  showDots?: boolean;
}

type Mode = "text" | "glyph";

const DEFAULT_HINT = "rgba(178, 125, 43, 0.85)";

interface DotKind {
  whispered: boolean;
  voiced: boolean;
  stop: boolean;
  hold: boolean;
}

function classifyDot(sound: SoundDefinition): DotKind | null {
  if (sound.silent) return null;
  const whispered = sound.whispered === true;
  const stop = sound.stop === true;
  return { whispered, voiced: !whispered, stop, hold: !stop };
}

interface SoundDotProps {
  kind: DotKind | null;
  hintColor: string;
  fontSize: number;
}

function SoundDot({ kind, hintColor, fontSize }: SoundDotProps) {
  if (!kind) return null;

  // Whispered dots float up; voiced sit ~4px lower. Px (not em) so the gap is
  // constant across sizes.
  const voffPx = kind.whispered ? -6 : -2;

  // Stops stay small; holds grow noticeably bigger.
  const baseSize = Math.max(5, Math.round(fontSize * 0.11));
  const bigSize = Math.max(8, Math.round(fontSize * 0.22));

  const common: CSSProperties = {
    display: "inline-block",
    borderRadius: "999px",
    background: hintColor,
    transform: `translateY(var(--voff))`,
    transition: "transform 200ms var(--ease-quill)",
    // --voff is read by the keyframes so animated dots honour the offset.
    ["--voff" as never]: `${voffPx}px`,
  };

  if (kind.stop) {
    return (
      <span
        className="jm-sound-dot jm-dot-stop"
        style={{ ...common, width: baseSize, height: baseSize }}
      />
    );
  }

  return (
    <span
      className="jm-sound-dot jm-dot-hold"
      style={{
        ...common,
        width: bigSize,
        height: bigSize,
        ["--dot-start" as never]: `${baseSize / bigSize}`,
      }}
    />
  );
}

interface MarkProps {
  kind: "long" | "digraph";
  hintColor: string;
  mode: Mode;
}

function Mark({ kind, hintColor, mode }: MarkProps) {
  const common: CSSProperties = {
    position: "absolute",
    left: "6%",
    right: "6%",
    height: "0.16em",
    background: hintColor,
    borderRadius: "999px",
    opacity: 0.55,
    pointerEvents: "none",
  };
  if (kind === "long") {
    return (
      <span
        aria-hidden
        style={{ ...common, top: mode === "glyph" ? "-0.14em" : "0.12em" }}
      />
    );
  }
  return (
    <span
      aria-hidden
      style={{ ...common, bottom: mode === "glyph" ? "-0.18em" : "0.02em" }}
    />
  );
}

interface SoundSpanProps {
  sound: SoundDefinition;
  mode: Mode;
  fontSize?: number;
  hintColor: string;
  showLongVowel: boolean;
  showDigraph: boolean;
  showSilent: boolean;
  showDots: boolean;
  children: ReactNode;
}

function SoundSpan({
  sound,
  mode,
  fontSize,
  hintColor,
  showLongVowel,
  showDigraph,
  showSilent,
  showDots,
  children,
}: SoundSpanProps) {
  const flex = mode === "glyph";
  const opacity = showSilent && sound.silent ? 0.35 : 1;
  const dotKind = showDots ? classifyDot(sound) : null;

  // Dots mode needs an explicit fontSize so the text-box + dot-slot heights
  // can be measured in pixels (otherwise the rows don't align across fonts).
  const hasSize = typeof fontSize === "number" && showDots;
  const dotSlotHeight = hasSize ? Math.round(fontSize * 0.5) : 0;
  const textBoxHeight = hasSize ? Math.round(fontSize * 1.02) : null;

  const textBoxStyle: CSSProperties = hasSize
    ? {
        position: "relative",
        display: "inline-flex",
        alignItems: "flex-end",
        justifyContent: "center",
        height: `${textBoxHeight}px`,
        lineHeight: 1,
        gap: flex ? 1 : 0,
      }
    : {
        position: "relative",
        display: flex ? "inline-flex" : "inline-block",
        ...(flex ? { alignItems: "flex-end", gap: 1 } : null),
      };

  return (
    <span
      className="jm-sound"
      style={{
        opacity,
        position: "relative",
        display: "inline-block",
        verticalAlign: "top",
        paddingBottom: showDots && hasSize ? `${dotSlotHeight}px` : 0,
      }}
    >
      <span style={textBoxStyle}>
        {children}
        {showLongVowel && sound.long_vowel && (
          <Mark kind="long" hintColor={hintColor} mode={mode} />
        )}
        {showDigraph && sound.digraph && (
          <Mark kind="digraph" hintColor={hintColor} mode={mode} />
        )}
      </span>

      {showDots && hasSize && (
        <span
          className="jm-dot-slot"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${textBoxHeight}px`,
            height: `${dotSlotHeight}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SoundDot kind={dotKind} hintColor={hintColor} fontSize={fontSize} />
        </span>
      )}
    </span>
  );
}

export function Word({
  word,
  font,
  fontSize,
  color,
  hintColor = DEFAULT_HINT,
  showLongVowel = true,
  showDigraph = true,
  showSilent = true,
  showDots = false,
}: Props) {
  const isCustom = font === "custom";
  const mode: Mode = isCustom ? "glyph" : "text";
  const fontFamily = !isCustom && font ? fontMetadata[font].fontFamily : undefined;
  const glyphSize = fontSize ?? 24;

  const spanFlags = {
    mode,
    fontSize,
    hintColor,
    showLongVowel,
    showDigraph,
    showSilent,
    showDots,
  };

  return (
    <span
      className="jm-word"
      style={{
        fontFamily,
        fontSize,
        color,
        display: "inline-flex",
        alignItems: "flex-start",
        lineHeight: 1,
      }}
    >
      {word.sounds.map((sound, i) => (
        <SoundSpan key={i} sound={sound} {...spanFlags}>
          {isCustom ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "flex-end",
                gap: 1,
                // Custom-glyph baseline sits at 20/28 (71%) of the rendered
                // height; real fonts with line-height:1 have baseline at ~78%.
                // Nudge the glyph row down so the baselines align.
                transform: `translateY(${Math.round(glyphSize * 0.07)}px)`,
              }}
            >
              {sound.characters.split("").map((char, j) => (
                <GlyphSVG key={j} char={char} fontSize={glyphSize} />
              ))}
            </span>
          ) : (
            sound.characters
          )}
        </SoundSpan>
      ))}
    </span>
  );
}
