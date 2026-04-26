import type { FontKey } from "@reading_app/utils/fonts";
import type { StoryToolInput } from "@reading_app/tools/StoryTool/StoryTool";
import type { Word as WordData } from "@reading_app/utils/words";
import type { Punctuation } from "@reading_app/utils/punctuation";
import { Word } from "../components/Word";

type Paragraph = StoryToolInput["content"]["paragraphs"][number];
type WordOrPunct = Paragraph["sentences"][number]["words"][number];

function isPunctuation(w: WordOrPunct): w is Punctuation {
  return typeof w === "string";
}

interface Props {
  title?: StoryToolInput["content"]["title"];
  paragraph: Paragraph;
  paragraphIdx: number;
  paragraphCount: number;
  font?: FontKey;
  fontSize?: number;
}

export function StoryParagraph({
  title,
  paragraph,
  paragraphIdx,
  paragraphCount,
  font,
  fontSize = 40,
}: Props) {
  const titleFont = Math.round(fontSize * 1.25);
  const hasPrev = paragraphIdx > 0;
  const hasNext = paragraphIdx < paragraphCount - 1;
  const showTitle = title && paragraphIdx === 0;

  const renderWord = (w: WordOrPunct, key: number) => {
    if (isPunctuation(w)) {
      return (
        <span key={key} className="jm-story-punct">
          {w}
        </span>
      );
    }
    return (
      <span key={key} className="jm-story-word">
        <Word
          word={w as WordData}
          font={font}
          fontSize={fontSize}
          showLongVowel
          showDigraph
        />
      </span>
    );
  };

  return (
    <div className="jm-story-text">
      {showTitle && title && (
        <h2 className="jm-story-title">
          {title.words.map((w, i) => (
            <span key={i} className="jm-story-word">
              <Word
                word={w as WordData}
                font={font}
                fontSize={titleFont}
                showLongVowel
                showDigraph
              />
            </span>
          ))}
        </h2>
      )}

      <div className="jm-story-paragraph-row">
        <span
          className={`jm-story-chevron ${hasPrev ? "" : "disabled"}`.trim()}
          aria-hidden
        >
          ‹
        </span>

        <div className="jm-story-paragraph">
          {paragraph.sentences.map((s, si) => (
            <span key={si} className="jm-story-sentence">
              {s.words.map((w, wi) => renderWord(w, wi))}{" "}
            </span>
          ))}
        </div>

        <span
          className={`jm-story-chevron ${hasNext ? "" : "disabled"}`.trim()}
          aria-hidden
        >
          ›
        </span>
      </div>

      <div className="jm-story-paragraph-progress">
        {paragraphIdx + 1} / {paragraphCount}
      </div>
    </div>
  );
}
