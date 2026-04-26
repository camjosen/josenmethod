import type { ReactNode } from "react";
import type { StoryToolInput } from "@reading_app/tools/StoryTool/StoryTool";
import { StoryParagraph } from "../StoryText";
import type { ItemRenderCtx } from "../ItemActivity";

export interface StoryItemRef {
  paragraphIdx: number;
  readingIdx: 0 | 1;
}

interface Props {
  itemRef: StoryItemRef;
  input: StoryToolInput;
  ctx: ItemRenderCtx;
}

export function buildStoryItems(input: StoryToolInput): StoryItemRef[] {
  const passes: (0 | 1)[] = input.secondReading != null ? [0, 1] : [0];
  const refs: StoryItemRef[] = [];
  for (const readingIdx of passes) {
    for (let paragraphIdx = 0; paragraphIdx < input.content.paragraphs.length; paragraphIdx++) {
      refs.push({ paragraphIdx, readingIdx });
    }
  }
  return refs;
}

export function StoryItem({ itemRef, input, ctx }: Props) {
  const paragraph = input.content.paragraphs[itemRef.paragraphIdx];
  if (!paragraph) return null;

  return (
    <div className="jm-story-item">
      <StoryParagraph
        title={input.content.title}
        paragraph={paragraph}
        paragraphIdx={itemRef.paragraphIdx}
        paragraphCount={input.content.paragraphs.length}
        font={ctx.font}
        fontSize={40}
      />
    </div>
  );
}

export function storyTeacherExtra(itemRef: StoryItemRef, input: StoryToolInput): ReactNode {
  const paragraph = input.content.paragraphs[itemRef.paragraphIdx];
  if (!paragraph) return undefined;

  const isFirst = itemRef.readingIdx === 0;
  const passLabel = isFirst ? "First reading" : "Second reading";

  const sentencesWithQs = paragraph.sentences
    .map((s, idx) => ({
      idx,
      questions: isFirst ? s.firstReadingQuestions : s.secondReadingQuestions,
    }))
    .filter((s): s is { idx: number; questions: [string, ...string[]] } =>
      Array.isArray(s.questions) && s.questions.length > 0,
    );

  if (sentencesWithQs.length === 0) {
    return (
      <div className="jm-story-questions">
        <div className="jm-story-questions-label">{passLabel}</div>
      </div>
    );
  }

  return (
    <div className="jm-story-questions">
      <div className="jm-story-questions-label">{passLabel} — questions</div>
      {sentencesWithQs.map(({ idx, questions }) => (
        <div key={idx} className="jm-story-questions-sentence">
          <div className="jm-story-questions-sentence-label">Sentence {idx + 1}</div>
          <ul>
            {questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
