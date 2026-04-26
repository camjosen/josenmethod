import type { FontKey } from "@reading_app/utils/fonts";
import type { StoryToolInput } from "@reading_app/tools/StoryTool/StoryTool";
import type { Word as WordData } from "@reading_app/utils/words";
import type { Punctuation } from "@reading_app/utils/punctuation";
import { Word } from "../components/Word";
import { BackArrow } from "../reading_exercise/glyphs";
import type { Role } from "./ItemActivity";

type Sentence = StoryToolInput["content"]["paragraphs"][number]["sentences"][number];
type Slot = Sentence["words"][number];

function isPunct(slot: Slot): slot is Punctuation {
  return typeof slot === "string";
}

interface Props {
  input: StoryToolInput;
  role: Role;
  font?: FontKey;
  onComplete?: () => void;
  onExit?: () => void;
}

export function StoryActivity({ input, role, font, onComplete, onExit }: Props) {
  const { title, paragraphs } = input.content;

  return (
    <div className="re-activity-view">
      {role === "teacher" && (
        <div className="re-activity-strip">
          {onExit ? (
            <button
              className="re-activity-strip-back"
              onClick={onExit}
              aria-label="Back"
            >
              <BackArrow />
            </button>
          ) : (
            <span className="re-activity-strip-back-spacer" aria-hidden />
          )}
          <div className="re-activity-strip-preview" />
        </div>
      )}

      <article className="jm-story-article">
        {title && (
          <h1 className="jm-story-article-title">
            {title.words.map((slot, i) =>
              isPunct(slot) ? (
                <span key={i} className="jm-story-article-punct">{slot}</span>
              ) : (
                <Word
                  key={i}
                  word={slot as WordData}
                  font={font}
                  fontSize={88}
                  showLongVowel
                  showDigraph
                />
              )
            )}
          </h1>
        )}

        {paragraphs.map((p, pi) => (
          <p key={pi} className="jm-story-article-paragraph">
            {p.sentences.map((s, si) => (
              <span key={si} className="jm-story-article-sentence">
                {s.words.map((slot, wi) =>
                  isPunct(slot) ? (
                    <span key={wi} className="jm-story-article-punct">{slot}</span>
                  ) : (
                    <span key={wi} className="jm-story-article-word">
                      <Word
                        word={slot as WordData}
                        font={font}
                        fontSize={64}
                        showLongVowel
                        showDigraph
                      />
                    </span>
                  )
                )}{" "}
              </span>
            ))}
          </p>
        ))}

        {role === "teacher" && onComplete && (
          <div className="jm-story-article-actions">
            <button
              className="jm-story-article-complete"
              onClick={onComplete}
            >
              Mark complete
            </button>
          </div>
        )}
      </article>
    </div>
  );
}
