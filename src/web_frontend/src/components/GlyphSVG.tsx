import { type GlyphKey, glyphs } from "@reading_app/utils/custom_font";

interface Props {
  char: string;
  fontSize: number;
  color?: string;
  opacity?: number;
}

export function GlyphSVG({ char, fontSize, color = "currentColor", opacity = 1 }: Props) {
  const key = char === "'" ? "apostrophe" : char;
  const glyph = glyphs[key as GlyphKey];

  if (!glyph) {
    return (
      <span style={{ display: "inline-block", width: fontSize * 0.35 }} />
    );
  }

  const parts = glyph.viewBox.split(" ").map(Number);
  const vbWidth = parts[2];
  const vbHeight = parts[3];
  const svgWidth = (vbWidth / vbHeight) * fontSize;

  return (
    <svg
      viewBox={glyph.viewBox}
      width={svgWidth}
      height={fontSize}
      style={{ display: "block", overflow: "visible", opacity }}
    >
      {glyph.paths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={color}
          fill="none"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
