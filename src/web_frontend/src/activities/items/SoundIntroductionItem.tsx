import type { SoundDefinition } from "@reading_app/utils/sounds";
import { Word } from "../../components/Word";
import type { ItemRenderCtx } from "../ItemActivity";

interface Props {
  sound: SoundDefinition;
  ctx: ItemRenderCtx;
}

export function SoundIntroductionItem({ sound, ctx }: Props) {
  const word = { spelling: sound.characters, sounds: [sound] };
  const fontSize = ctx.font === "custom" ? 360 : undefined;

  return (
    <div className="jm-item-frame">
      <Word
        word={word}
        font={ctx.font}
        fontSize={fontSize}
        showLongVowel
        showDigraph
      />
    </div>
  );
}
