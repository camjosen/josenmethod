import type { MouseEvent } from "react";
import type { FontKey } from "@reading_app/utils/fonts";
import type { StoryToolInput } from "@reading_app/tools/StoryTool/StoryTool";
import type { Word as WordData } from "@reading_app/utils/words";
import type { Punctuation } from "@reading_app/utils/punctuation";
import type { StoryFocus } from "@backend/sessions/types";
import { Word } from "../components/Word";
import { BackArrow } from "../reading_exercise/glyphs";
import type { Role } from "./ItemActivity";

type Sentence = StoryToolInput["content"]["paragraphs"][number]["sentences"][number];
type Slot = Sentence["words"][number];

function isPunct(slot: Slot): slot is Punctuation {
  return typeof slot === "string";
}

type Granularity = "word" | "sentence" | "paragraph";

function granularityOf(input: StoryToolInput): Granularity | null {
  const dsa =
    input.firstReading.scaffolding?.directStudentAttention ??
    input.secondReading?.scaffolding?.directStudentAttention;
  if (!dsa) return null;
  if (dsa === "each_word") return "word";
  if (dsa === "each_sentence") return "sentence";
  return "paragraph";
}

interface Props {
  input: StoryToolInput;
  role: Role;
  font?: FontKey;
  storyFocus?: StoryFocus | null;
  onSetStoryFocus?: (focus: StoryFocus | null) => void;
  onComplete?: () => void;
  onExit?: () => void;
}

export function StoryActivity({
  input,
  role,
  font,
  storyFocus,
  onSetStoryFocus,
  onComplete,
  onExit,
}: Props) {
  const { title, paragraphs } = input.content;
  const granularity = granularityOf(input);
  const focus = storyFocus ?? null;

  const articleClass = ["jm-story-article"];
  if (granularity) {
    articleClass.push("directing", `directing-${granularity}`);
  }

  const setFocus = (next: StoryFocus) => {
    if (!granularity || !onSetStoryFocus) return;
    onSetStoryFocus(next);
  };

  const isParagraphFocused = (pi: number) =>
    granularity === "paragraph" &&
    focus != null &&
    focus.paragraphIdx === pi;

  const isSentenceFocused = (pi: number, si: number) =>
    granularity === "sentence" &&
    focus != null &&
    focus.paragraphIdx === pi &&
    focus.sentenceIdx === si;

  const isWordFocused = (pi: number, si: number, wi: number) =>
    granularity === "word" &&
    focus != null &&
    focus.paragraphIdx === pi &&
    focus.sentenceIdx === si &&
    focus.wordIdx === wi;

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

      <article className={articleClass.join(" ")}>
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

        {paragraphs.map((p, pi) => {
          const paraClasses = ["jm-story-article-paragraph"];
          if (isParagraphFocused(pi)) paraClasses.push("is-focused");
          const onParagraphClick =
            granularity === "paragraph"
              ? () => setFocus({ paragraphIdx: pi })
              : undefined;
          return (
            <p
              key={pi}
              className={paraClasses.join(" ")}
              onClick={onParagraphClick}
            >
              {p.sentences.map((s, si) => {
                const sentenceClasses = ["jm-story-article-sentence"];
                if (isSentenceFocused(pi, si)) sentenceClasses.push("is-focused");
                const onSentenceClick =
                  granularity === "sentence"
                    ? (e: MouseEvent) => {
                        e.stopPropagation();
                        setFocus({ paragraphIdx: pi, sentenceIdx: si });
                      }
                    : undefined;
                return (
                  <span
                    key={si}
                    className={sentenceClasses.join(" ")}
                    onClick={onSentenceClick}
                  >
                    {s.words.map((slot, wi) => {
                      if (isPunct(slot)) {
                        return (
                          <span key={wi} className="jm-story-article-punct">{slot}</span>
                        );
                      }
                      const wordClasses = ["jm-story-article-word"];
                      if (isWordFocused(pi, si, wi)) wordClasses.push("is-focused");
                      const onWordClick =
                        granularity === "word"
                          ? (e: MouseEvent) => {
                              e.stopPropagation();
                              setFocus({
                                paragraphIdx: pi,
                                sentenceIdx: si,
                                wordIdx: wi,
                              });
                            }
                          : undefined;
                      return (
                        <span
                          key={wi}
                          className={wordClasses.join(" ")}
                          onClick={onWordClick}
                        >
                          <Word
                            word={slot as WordData}
                            font={font}
                            fontSize={64}
                            showLongVowel
                            showDigraph
                          />
                        </span>
                      );
                    })}{" "}
                  </span>
                );
              })}
            </p>
          );
        })}

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
