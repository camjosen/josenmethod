import type { StoryToolInput } from "@reading_app/tools/StoryTool/StoryTool";
import type { Word as WordData } from "@reading_app/utils/words";
import { StoryText } from "../StoryText";
import type { ItemRenderCtx } from "../ItemActivity";

type StoryMode = StoryToolInput["items"][number];

interface Props {
  mode: StoryMode;
  content: StoryToolInput["content"];
  markup: StoryToolInput["markup"];
  focusWords?: StoryToolInput["focusWords"];
  ctx: ItemRenderCtx;
}

function onlyWords(items: StoryToolInput["focusWords"]): WordData[] | undefined {
  if (!items) return undefined;
  return items.filter((i): i is WordData => typeof i !== "string");
}

function questionsFromContent(content: StoryToolInput["content"]): string[] {
  const qs: string[] = [];
  for (const p of content.paragraphs) {
    for (const s of p.sentences) {
      if (s.questions) qs.push(...s.questions);
    }
  }
  return qs;
}

export function StoryItem({ mode, content, markup, focusWords, ctx }: Props) {
  const titleOnly = mode === "title_reading";
  const dimBody = titleOnly;
  const highlightFocus = mode === "word_finding";

  return (
    <div className="jm-story-item">
      <div className="jm-story-mode-tag">{modeLabel(mode)}</div>
      <StoryText
        content={content}
        markup={markup}
        focusWords={onlyWords(focusWords)}
        font={ctx.font}
        titleOnly={titleOnly}
        dimBody={dimBody}
        highlightFocus={highlightFocus}
        fontSize={40}
      />
    </div>
  );
}

const MODE_LABEL: Record<StoryMode, string> = {
  title_reading: "Title",
  guided_sound_it_out: "Guided sound-out",
  sound_it_out: "Sound it out",
  sound_it_out_with_questions: "Sound out + Qs",
  teacher_models_say_it_fast: "Teacher models",
  guided_say_it_fast: "Guided fluency",
  say_it_fast: "Fluent",
  say_it_fast_with_questions: "Fluent + Qs",
  word_finding: "Word finding",
};

function modeLabel(mode: StoryMode): string {
  return MODE_LABEL[mode] ?? mode;
}

export function storyTeacherExtra(_mode: StoryMode, content: StoryToolInput["content"]) {
  const qs = questionsFromContent(content);
  if (qs.length === 0) return undefined;
  return (
    <div className="jm-story-questions">
      <div className="jm-story-questions-label">Questions</div>
      <ul>
        {qs.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>
    </div>
  );
}
