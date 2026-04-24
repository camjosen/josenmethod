import type { SoundDefinition } from "@reading_app/utils/sounds";
import type { WritingTask } from "@reading_app/tools/WritingTool/WritingTool";
import { Word } from "../../components/Word";
import type { ItemRenderCtx } from "../ItemActivity";

interface Props {
  task: WritingTask;
  ctx: ItemRenderCtx;
}

function isSoundTask(task: WritingTask): task is SoundDefinition {
  return "characters" in task && "name" in task;
}

export function WritingItem({ task, ctx }: Props) {
  const word = isSoundTask(task)
    ? { spelling: task.characters, sounds: [task] }
    : task;
  const fontSize = ctx.font === "custom" ? 360 : undefined;

  return (
    <div className="jm-item-frame jm-writing-item">
      <Word
        word={word}
        font={ctx.font}
        fontSize={fontSize}
        color="rgba(28, 26, 23, 0.35)"
        showLongVowel
        showDigraph
      />
    </div>
  );
}
