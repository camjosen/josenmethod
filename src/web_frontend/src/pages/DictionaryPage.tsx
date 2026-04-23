import { useState } from "react";
import { words } from "@reading_app/utils/words";
import { type FontKey, fontKeySchema, fontMetadata } from "@reading_app/utils/fonts";
import { Word } from "@/components/Word";
import { useCurriculumFonts } from "@/curriculumFonts";

const entries = Object.values(words);
const fontOptions = fontKeySchema.options;

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label
      className="flex items-center gap-2 cursor-pointer select-none"
      style={{ color: "var(--ink-2)" }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4"
        style={{ accentColor: "var(--ochre)" }}
      />
      <span className="jm-body-s" style={{ color: "var(--ink-2)" }}>
        {label}
      </span>
    </label>
  );
}

export default function DictionaryPage() {
  useCurriculumFonts();
  const [font, setFont] = useState<FontKey>("serif");
  const [showLongVowel, setShowLongVowel] = useState(true);
  const [showDigraph, setShowDigraph] = useState(true);
  const [showSilent, setShowSilent] = useState(true);
  const [showDots, setShowDots] = useState(false);

  return (
    <div
      className="jm-root min-h-screen"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <header
        className="sticky top-0 z-10 backdrop-blur"
        style={{
          background: "color-mix(in srgb, var(--paper) 90%, transparent)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="jm-eyebrow" style={{ color: "var(--oxblood)" }}>
              § Reading · Dictionary
            </div>
            <h1
              className="jm-h1"
              style={{ margin: "2px 0 0", letterSpacing: "var(--tracking-tight)" }}
            >
              Dictionary
              <span
                className="jm-meta"
                style={{ marginLeft: "var(--sp-3)", fontStyle: "italic" }}
              >
                {entries.length} words
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <label
              className="flex items-center gap-2 jm-body-s"
              style={{ color: "var(--ink-2)" }}
            >
              Font
              <select
                value={font}
                onChange={(e) => setFont(e.target.value as FontKey)}
                className="px-2 py-1 jm-body-s"
                style={{
                  background: "var(--vellum)",
                  border: "1px solid var(--rule)",
                  borderRadius: "var(--radius-1)",
                  color: "var(--ink)",
                  outline: "none",
                }}
              >
                {fontOptions.map((k) => (
                  <option key={k} value={k}>
                    {fontMetadata[k].label}
                  </option>
                ))}
              </select>
            </label>
            <Toggle
              label="Long-vowel overline"
              checked={showLongVowel}
              onChange={setShowLongVowel}
            />
            <Toggle
              label="Digraph underline"
              checked={showDigraph}
              onChange={setShowDigraph}
            />
            <Toggle
              label="Silent letters dimmed"
              checked={showSilent}
              onChange={setShowSilent}
            />
            <Toggle
              label="Sound-out dots"
              checked={showDots}
              onChange={setShowDots}
            />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <ul className="flex flex-wrap gap-x-10 gap-y-8">
          {entries.map((word) => (
            <li key={word.spelling} className="leading-none">
              <Word
                word={word}
                font={font}
                fontSize={30}
                color="var(--ink)"
                showLongVowel={showLongVowel}
                showDigraph={showDigraph}
                showSilent={showSilent}
                showDots={showDots}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
