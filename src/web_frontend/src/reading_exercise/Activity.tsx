import { useCallback, useEffect, useRef, useState } from "react";
import { Word } from "../components/Word";
import { audio } from "./audio";
import type { Activity as ActivityData } from "./data";
import { BackArrow, Glyphs } from "./glyphs";
import { itemStatus, type ItemResult, type LessonState } from "./state";

interface Props {
  activity: ActivityData;
  idx: number;
  state: LessonState;
  onExit: () => void;
  onResult: (result: ItemResult) => void;
  onAdvance: () => void;
  showLegend: boolean;
}

type Phase = "enter" | "exit";
type Flash = ItemResult | null;

export function Activity({
  activity,
  idx,
  state,
  onExit,
  onResult,
  onAdvance,
  showLegend,
}: Props) {
  const currentItem = state.currentItem;
  const [animState, setAnimState] = useState<{
    wordIndex: number;
    phase: Phase;
    flash: Flash;
  }>({ wordIndex: currentItem, phase: "enter", flash: null });

  const prevItemRef = useRef(currentItem);
  useEffect(() => {
    if (prevItemRef.current !== currentItem) {
      prevItemRef.current = currentItem;
      setAnimState({ wordIndex: currentItem, phase: "enter", flash: null });
    }
  }, [currentItem]);

  const markAndAdvance = useCallback(
    (result: ItemResult) => {
      setAnimState((s) => ({ ...s, flash: result }));
      if (result === "done") audio.success();
      else audio.fail();

      setTimeout(() => {
        setAnimState((s) => ({ ...s, phase: "exit" }));
        onResult(result);
      }, 650);

      setTimeout(() => {
        onAdvance();
      }, 950);
    },
    [onResult, onAdvance]
  );

  const skip = useCallback(() => {
    setAnimState((s) => ({ ...s, phase: "exit" }));
    audio.tick();
    setTimeout(() => onAdvance(), 320);
  }, [onAdvance]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        markAndAdvance("done");
      } else if (e.key === "x" || e.key === "X" || e.key === "ArrowLeft") {
        e.preventDefault();
        markAndAdvance("failed");
      } else if (e.key === "Escape") {
        onExit();
      } else if (e.key === "n" || e.key === "N") {
        skip();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [markAndAdvance, skip, onExit]);

  const word = activity.items[animState.wordIndex];
  const cls = ["re-item-word"];
  if (animState.phase === "enter") cls.push("enter");
  if (animState.phase === "exit") cls.push("exit");
  if (animState.flash === "done") cls.push("success-flash");
  if (animState.flash === "failed") cls.push("fail-flash");

  return (
    <div className="re-activity-view">
      <div className="re-activity-stage">
        <div className="re-rim" />
      </div>

      <div className="re-activity-mark">{Glyphs[activity.type]}</div>

      <button className="re-chrome-btn left" onClick={onExit} aria-label="Back">
        <BackArrow />
      </button>

      <div className="re-item-container">
        <div
          key={`${animState.wordIndex}:${animState.phase}:${animState.flash}`}
          className={cls.join(" ")}
        >
          {word && <Word word={word} />}
        </div>
      </div>

      <div className="re-progress-row">
        {activity.items.map((_, i) => {
          const st = itemStatus(idx, i, state);
          const pcls = ["re-pdot"];
          if (st === "done") pcls.push("done");
          if (st === "failed") pcls.push("failed");
          if (st === "current") pcls.push("current");
          return <div key={i} className={pcls.join(" ")} />;
        })}
      </div>

      {showLegend && (
        <div className="re-key-legend">
          <div className="re-group">
            <kbd>Space</kbd> ✓
          </div>
          <div className="re-group">
            <kbd>X</kbd> ✗
          </div>
          <div className="re-group">
            <kbd>Esc</kbd> back
          </div>
        </div>
      )}
    </div>
  );
}
