import type { Word as WordData } from "@reading_app/utils/words";
import { Word } from "../../components/Word";
import type { ItemRenderCtx } from "../ItemActivity";

interface Props {
  word: WordData;
  modifications?: string[];
  ctx: ItemRenderCtx;
}

export function ReadWordsItem({ word, modifications, ctx }: Props) {
  const mods = modifications ?? [];
  const showSilent = mods.includes("teach_silent_letters");
  const showFunnyHint = mods.includes("teach_funny_words") && word.isFunny === true;
  const fontSize = ctx.font === "custom" ? 360 : undefined;

  return (
    <div className="jm-item-frame">
      <Word
        word={word}
        font={ctx.font}
        fontSize={fontSize}
        showSilent={showSilent}
        showLongVowel
        showDigraph
      />
      {showFunnyHint && <div className="jm-funny-hint">funny word</div>}
    </div>
  );
}
