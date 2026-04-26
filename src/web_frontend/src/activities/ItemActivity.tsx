import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { FontKey } from "@reading_app/utils/fonts";
import { audio } from "../reading_exercise/audio";
import { BackArrow } from "../reading_exercise/glyphs";
import { type ItemResult, type LessonState } from "../reading_exercise/state";
import { FlowIndicator } from "./FlowIndicator";
import { TeacherScriptBanner } from "./TeacherScriptBanner";
import type { ToolName } from "./flowCopy";

export type Role = "teacher" | "student";

export interface ItemRenderCtx {
  flowStep: string;
  flowIdx: number;
  itemIdx: number;
  role: Role;
  font?: FontKey;
}

export interface ItemActivityProps<TItem> {
  toolName: ToolName;
  items: TItem[];
  /** Flow steps run _within_ each item. Empty array = one implicit step per item. */
  flow: string[];
  modifications?: string[];
  renderItem: (item: TItem, ctx: ItemRenderCtx) => ReactNode;
  /** Optional teacher-facing hint to show in the script banner. */
  teacherExtraFor?: (item: TItem, ctx: ItemRenderCtx) => ReactNode;
  /** Top progress strip — typically an `<ActivityPreview size="sm" progress={...} />`. */
  topStrip?: ReactNode;
  state: LessonState;
  role: Role;
  onItemDone?: () => void;
  onItemFailed?: () => void;
  onExit?: () => void;
  showLegend?: boolean;
  font?: FontKey;
}

type Phase = "enter" | "exit";
type Flash = ItemResult | null;

export function ItemActivity<TItem>({
  toolName,
  items,
  flow,
  modifications,
  renderItem,
  teacherExtraFor,
  topStrip,
  state,
  role,
  onItemDone,
  onItemFailed,
  onExit,
  showLegend = true,
  font,
}: ItemActivityProps<TItem>) {
  const currentItemIdx = state.currentItem;

  const [flowIdx, setFlowIdx] = useState(0);
  const [anim, setAnim] = useState<{ phase: Phase; flash: Flash }>({
    phase: "enter",
    flash: null,
  });

  // Reset flow and re-animate entry whenever the server advances the item cursor.
  const prevItemRef = useRef(currentItemIdx);
  useEffect(() => {
    if (prevItemRef.current !== currentItemIdx) {
      prevItemRef.current = currentItemIdx;
      setFlowIdx(0);
      setAnim({ phase: "enter", flash: null });
    }
  }, [currentItemIdx]);

  const lastFlowStep = Math.max(0, flow.length - 1);
  const onLastStep = flowIdx >= lastFlowStep;

  const commit = useCallback(
    (result: ItemResult) => {
      setAnim((s) => ({ ...s, flash: result }));
      if (result === "done") audio.success();
      else audio.fail();

      setTimeout(() => {
        setAnim({ phase: "exit", flash: result });
        if (result === "done") onItemDone?.();
        else onItemFailed?.();
      }, 650);
    },
    [onItemDone, onItemFailed]
  );

  const advance = useCallback(() => {
    if (role !== "teacher") return;
    if (!onLastStep) {
      setFlowIdx((i) => i + 1);
      audio.tick();
    } else {
      commit("done");
    }
  }, [role, onLastStep, commit]);

  const fail = useCallback(() => {
    if (role !== "teacher") return;
    commit("failed");
  }, [role, commit]);

  const backStep = useCallback(() => {
    if (role !== "teacher") return;
    if (flowIdx > 0) {
      setFlowIdx((i) => i - 1);
      audio.tick();
    }
  }, [role, flowIdx]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") {
        e.preventDefault();
        advance();
      } else if (e.key === "x" || e.key === "X") {
        e.preventDefault();
        fail();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        backStep();
      } else if (e.key === "Escape") {
        onExit?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, fail, backStep, onExit]);

  const item = items[currentItemIdx];
  const flowStep = flow[flowIdx] ?? "";
  const ctx: ItemRenderCtx = {
    flowStep,
    flowIdx,
    itemIdx: currentItemIdx,
    role,
    font,
  };

  const itemCls = ["re-item-word"];
  if (anim.phase === "enter") itemCls.push("enter");
  if (anim.phase === "exit") itemCls.push("exit");
  if (anim.flash === "done") itemCls.push("success-flash");
  if (anim.flash === "failed") itemCls.push("fail-flash");

  return (
    <div className="re-activity-view">
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
        <div className="re-activity-strip-preview">{topStrip}</div>
      </div>

      <div className="re-item-container">
        <div
          key={`${currentItemIdx}:${anim.phase}:${anim.flash}`}
          className={itemCls.join(" ")}
        >
          {item !== undefined && renderItem(item, ctx)}
        </div>
      </div>

      <div className="re-activity-foot">
        {role === "teacher" && flow.length > 0 && (
          <FlowIndicator toolName={toolName} flow={flow} flowIdx={flowIdx} />
        )}

        {role === "teacher" && (
          <TeacherScriptBanner
            toolName={toolName}
            flowStep={flowStep || undefined}
            modifications={modifications}
            extra={item !== undefined && teacherExtraFor ? teacherExtraFor(item, ctx) : undefined}
          />
        )}
      </div>

      {showLegend && role === "teacher" && (
        <div className="re-key-legend">
          <div className="re-group">
            <kbd>Space</kbd> next
          </div>
          <div className="re-group">
            <kbd>X</kbd> fail
          </div>
          <div className="re-group">
            <kbd>←</kbd> back
          </div>
          <div className="re-group">
            <kbd>Esc</kbd> exit
          </div>
        </div>
      )}
    </div>
  );
}
