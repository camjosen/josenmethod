import type { SoundDefinition } from "@reading_app/utils/sounds";
import { Word } from "../../components/Word";
import type { ItemRenderCtx } from "../ItemActivity";

interface Props {
  sound: SoundDefinition;
  ctx: ItemRenderCtx;
}

export function ReadSoundsItem({ sound, ctx }: Props) {
  // Render as a single-sound "word" so we reuse Word's long-vowel / digraph marks.
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
