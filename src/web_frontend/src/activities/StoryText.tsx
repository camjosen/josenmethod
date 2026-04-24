import type { FontKey } from "@reading_app/utils/fonts";
import type { StoryToolInput } from "@reading_app/tools/StoryTool/StoryTool";
import type { Word as WordData } from "@reading_app/utils/words";
import type { Punctuation } from "@reading_app/utils/punctuation";
import { Word } from "../components/Word";

type WordOrPunct = WordData | Punctuation;

type Content = StoryToolInput["content"];
type Markup = StoryToolInput["markup"];

function isPunctuation(w: WordOrPunct): w is Punctuation {
  return typeof w === "string";
}

function sameWord(a: WordData, b: WordData) {
  return a.spelling === b.spelling;
}

function isFocus(word: WordOrPunct, focus?: WordData[]): boolean {
  if (!focus || focus.length === 0 || isPunctuation(word)) return false;
  return focus.some((f) => sameWord(f, word as WordData));
}

interface Props {
  content: Content;
  markup?: Markup;
  focusWords?: WordData[];
  font?: FontKey;
  /** Highlight the story title only (e.g. "title_reading" mode). */
  titleOnly?: boolean;
  /** Dim the non-title body when title is the focus. */
  dimBody?: boolean;
  /** Highlight focus words (used by word_finding). */
  highlightFocus?: boolean;
  fontSize?: number;
}

export function StoryText({
  content,
  markup,
  focusWords,
  font,
  titleOnly = false,
  dimBody = false,
  highlightFocus = false,
  fontSize = 40,
}: Props) {
  const showDots = markup?.includes("dots") ?? false;
  const showArrows = markup?.includes("arrows") ?? false;
  const titleFont = Math.round(fontSize * 1.25);

  const renderWord = (w: WordOrPunct, key: number) => {
    if (isPunctuation(w)) {
      return (
        <span key={key} className="jm-story-punct">
          {w}
        </span>
      );
    }
    const highlight = highlightFocus && isFocus(w, focusWords);
    const cls = ["jm-story-word"];
    if (showArrows) cls.push("has-arrow");
    if (highlight) cls.push("focus");
    return (
      <span key={key} className={cls.join(" ")}>
        <Word
          word={w}
          font={font}
          fontSize={fontSize}
          showDots={showDots}
          showLongVowel
          showDigraph
        />
      </span>
    );
  };

  return (
    <div className="jm-story-text">
      {content.title && (
        <h2
          className={`jm-story-title ${titleOnly ? "highlight" : ""} ${
            dimBody && !titleOnly ? "" : ""
          }`.trim()}
        >
          {content.title.words.map((w, i) => (
            <span key={i} className="jm-story-word">
              <Word
                word={w}
                font={font}
                fontSize={titleFont}
                showDots={false}
                showLongVowel
                showDigraph
              />
            </span>
          ))}
        </h2>
      )}
      <div className={`jm-story-body ${dimBody ? "dim" : ""}`.trim()}>
        {content.paragraphs.map((p, pi) => (
          <p key={pi} className="jm-story-paragraph">
            {p.sentences.map((s, si) => (
              <span key={si} className="jm-story-sentence">
                {s.words.map((w, wi) => renderWord(w, wi))}{" "}
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}
