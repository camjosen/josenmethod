import type { VerbalBlendingInput } from "@reading_app/tools/VerbalBleningTool.ts/VerbalBleningTool";
import { Word } from "../../components/Word";
import type { ItemRenderCtx } from "../ItemActivity";

type BlendingItem = VerbalBlendingInput["items"][number];

interface Props {
  item: BlendingItem;
  ctx: ItemRenderCtx;
}

function isCompound(item: BlendingItem): item is [string, string] {
  return Array.isArray(item);
}

export function VerbalBlendingItem({ ctx }: Props) {
  // VerbalBlending has no student-facing visual — auditory tool. Show a neutral
  // "listening" marker so the chrome still reads as an activity.
  return (
    <div className="jm-item-frame jm-blending-neutral">
      <svg viewBox="0 0 120 120" width={280} height={280} className="jm-listening-glyph">
        <circle cx="60" cy="60" r="34" fill="none" stroke="var(--re-ink-3)" strokeWidth="2" opacity="0.45" />
        <circle cx="60" cy="60" r="22" fill="none" stroke="var(--re-ink-3)" strokeWidth="1.4" opacity="0.3" />
        <circle cx="60" cy="60" r="6" fill="var(--re-ochre)" opacity="0.85" />
      </svg>
      {/* Role and ctx are consumed via the teacher extra below — no student-visible text. */}
      <span style={{ display: "none" }}>{ctx.flowStep}</span>
    </div>
  );
}

export function blendingTeacherExtra(item: BlendingItem, ctx: ItemRenderCtx) {
  if (isCompound(item)) {
    return (
      <div className="jm-blending-compound">
        <span className="jm-blending-part">{item[0]}</span>
        <span className="jm-blending-dot">·</span>
        <span className="jm-blending-part">{item[1]}</span>
      </div>
    );
  }
  return (
    <div className="jm-blending-word">
      <Word word={item} font={ctx.font === "custom" ? undefined : ctx.font} fontSize={36} />
    </div>
  );
}
