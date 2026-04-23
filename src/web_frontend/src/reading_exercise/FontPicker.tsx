import { type FontKey, fontKeySchema, fontMetadata } from "@reading_app/utils/fonts";
import { GlyphSVG } from "../components/GlyphSVG";

interface Props {
  font: FontKey;
  onChange: (font: FontKey) => void;
}

export function FontPicker({ font, onChange }: Props) {
  return (
    <div className="re-font-picker">
      {fontKeySchema.options.map((k) => (
        <button
          key={k}
          type="button"
          className={font === k ? "on" : ""}
          onClick={() => onChange(k)}
          aria-label={fontMetadata[k].label}
          title={fontMetadata[k].label}
        >
          {k === "custom" ? (
            <GlyphSVG char="a" fontSize={20} />
          ) : (
            <span style={{ fontFamily: fontMetadata[k].fontFamily }}>a</span>
          )}
        </button>
      ))}
    </div>
  );
}
