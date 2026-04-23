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
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-neutral-900"
      />
      <span className="text-sm text-neutral-700">{label}</span>
    </label>
  );
}

export default function DictionaryPage() {
  useCurriculumFonts();
  const [font, setFont] = useState<FontKey>("serif");
  const [showLongVowel, setShowLongVowel] = useState(true);
  const [showDigraph, setShowDigraph] = useState(true);
  const [showSilent, setShowSilent] = useState(true);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-neutral-50/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-xl font-semibold tracking-tight">
            Dictionary
            <span className="ml-2 text-sm font-normal text-neutral-500">
              {entries.length} words
            </span>
          </h1>
          <div className="flex items-center gap-6 flex-wrap">
            <label className="flex items-center gap-2 text-sm text-neutral-700">
              Font
              <select
                value={font}
                onChange={(e) => setFont(e.target.value as FontKey)}
                className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
              >
                {fontOptions.map((k) => (
                  <option key={k} value={k}>
                    {fontMetadata[k].label}
                  </option>
                ))}
              </select>
            </label>
            <Toggle
              label="Long vowel bars"
              checked={showLongVowel}
              onChange={setShowLongVowel}
            />
            <Toggle
              label="Digraph underlines"
              checked={showDigraph}
              onChange={setShowDigraph}
            />
            <Toggle
              label="Silent letter fade"
              checked={showSilent}
              onChange={setShowSilent}
            />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <ul className="flex flex-wrap gap-x-8 gap-y-6">
          {entries.map((word) => (
            <li key={word.spelling} className="leading-none">
              <Word
                word={word}
                font={font}
                fontSize={30}
                showLongVowel={showLongVowel}
                showDigraph={showDigraph}
                showSilent={showSilent}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
