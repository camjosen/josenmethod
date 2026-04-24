import type { RhymingToolInput } from "@reading_app/tools/RhymingTool/RhymingTool";
import { Word } from "../../components/Word";
import type { ItemRenderCtx } from "../ItemActivity";

type RhymeItem = RhymingToolInput["items"][number];

interface Props {
  rhyme: RhymeItem;
  ctx: ItemRenderCtx;
}

export function RhymingItem({ rhyme, ctx }: Props) {
  // Only the starting sound is shown on-screen; ending + fullWord live in the teacher banner.
  const startWord = {
    spelling: rhyme.startingSound.characters,
    sounds: [rhyme.startingSound],
  };
  const fontSize = ctx.font === "custom" ? 360 : undefined;

  return (
    <div className="jm-item-frame">
      <Word
        word={startWord}
        font={ctx.font}
        fontSize={fontSize}
        showLongVowel
        showDigraph
      />
    </div>
  );
}

export function rhymeTeacherExtra(rhyme: RhymeItem, ctx: ItemRenderCtx) {
  return (
    <div className="jm-rhyme-extra">
      <span className="jm-rhyme-part jm-rhyme-start">
        {rhyme.startingSound.characters}
      </span>
      <span className="jm-rhyme-join">+</span>
      <span className="jm-rhyme-part jm-rhyme-end">
        <Word word={rhyme.ending} font={ctx.font === "custom" ? undefined : ctx.font} fontSize={28} />
      </span>
      <span className="jm-rhyme-join">=</span>
      <span className="jm-rhyme-full">
        <Word word={rhyme.fullWord} font={ctx.font === "custom" ? undefined : ctx.font} fontSize={32} />
      </span>
    </div>
  );
}
