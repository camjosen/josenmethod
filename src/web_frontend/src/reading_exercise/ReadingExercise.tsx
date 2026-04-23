import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Activity } from "./Activity";
import { audio } from "./audio";
import { SAMPLE_LESSON } from "./data";
import { Glyphs, FootOrnament, StarBig } from "./glyphs";
import { Lesson, LessonHeader } from "./Lesson";
import type { ItemResult, LessonState } from "./state";
import { TransitionGhost, type TransitionRect } from "./TransitionGhost";
import "./reading-exercise.css";

interface TransitionSpec {
  from: TransitionRect;
  to: TransitionRect;
  glyph: React.ReactNode;
  targetIdx: number;
}

function LessonComplete({ onReset }: { onReset: () => void }) {
  return (
    <div className="re-lesson-done" onClick={onReset}>
      <div className="re-ring">
        <StarBig />
      </div>
    </div>
  );
}

function useStageFit(stageRef: React.RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const fit = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const s = Math.min(w / 1366, h / 1024);
      stage.style.transform = `scale(${s})`;
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [stageRef]);
}

export function ReadingExercise() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  useStageFit(stageRef);

  const [variant, setVariant] = useState<"safe" | "bold">("bold");
  const [state, setState] = useState<LessonState>({
    screen: "lesson",
    currentActivity: 0,
    currentItem: 0,
    itemResults: {},
    completedActivities: new Set<number>(),
  });

  const [transition, setTransition] = useState<TransitionSpec | null>(null);
  const activityRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const hiddenMedallionRef = useRef<HTMLElement | null>(null);

  const registerRef = useCallback((idx: number, node: HTMLDivElement | null) => {
    activityRefs.current[idx] = node;
  }, []);

  const enterActivity = useCallback((idx: number) => {
    const node = activityRefs.current[idx];
    const stage = stageRef.current;
    if (!node || !stage) return;
    const medEl = node.querySelector<HTMLElement>(".re-medallion");
    if (!medEl) return;

    const nr = medEl.getBoundingClientRect();
    const sr = stage.getBoundingClientRect();
    const scale = sr.width / 1366;
    const from: TransitionRect = {
      x: (nr.left - sr.left) / scale + nr.width / scale / 2,
      y: (nr.top - sr.top) / scale + nr.height / scale / 2,
      w: nr.width / scale,
      h: nr.height / scale,
    };
    const to: TransitionRect = { x: 1366 / 2, y: 1024 / 2, w: 1700, h: 1700 };

    const activity = SAMPLE_LESSON.activities[idx];
    setTransition({ from, to, glyph: Glyphs[activity.type], targetIdx: idx });

    medEl.style.visibility = "hidden";
    hiddenMedallionRef.current = medEl;

    setTimeout(() => audio.hype(), 300);

    setTimeout(() => {
      setState((s) => ({
        ...s,
        screen: "activity",
        currentActivity: idx,
        currentItem: 0,
      }));
    }, 780);

    setTimeout(() => {
      setTransition(null);
      if (hiddenMedallionRef.current) {
        hiddenMedallionRef.current.style.visibility = "";
        hiddenMedallionRef.current = null;
      }
    }, 840);
  }, []);

  const exitActivity = useCallback(() => {
    setState((s) => ({ ...s, screen: "lesson" }));
  }, []);

  const recordResult = useCallback((result: ItemResult) => {
    setState((s) => {
      const aIdx = s.currentActivity;
      const prev = s.itemResults[aIdx] || {};
      return {
        ...s,
        itemResults: { ...s.itemResults, [aIdx]: { ...prev, [s.currentItem]: result } },
      };
    });
  }, []);

  const advance = useCallback(() => {
    setState((s) => {
      const act = SAMPLE_LESSON.activities[s.currentActivity];
      const nextItem = s.currentItem + 1;
      if (nextItem < act.items.length) {
        audio.tick();
        return { ...s, currentItem: nextItem };
      }
      const nextActivity = s.currentActivity + 1;
      const newCompleted = new Set(s.completedActivities);
      newCompleted.add(s.currentActivity);

      if (nextActivity >= SAMPLE_LESSON.activities.length) {
        setTimeout(() => audio.lessonDone(), 200);
        return { ...s, screen: "done", completedActivities: newCompleted };
      }
      setTimeout(() => audio.activityDone(), 150);
      return {
        ...s,
        screen: "lesson",
        completedActivities: newCompleted,
        currentActivity: nextActivity,
        currentItem: 0,
      };
    });
  }, []);

  const resetLesson = useCallback(() => {
    setState({
      screen: "lesson",
      currentActivity: 0,
      currentItem: 0,
      itemResults: {},
      completedActivities: new Set<number>(),
    });
  }, []);

  useEffect(() => {
    if (state.screen === "lesson") {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [state.screen]);

  const activity = SAMPLE_LESSON.activities[state.currentActivity];
  const showLesson = state.screen === "lesson" || transition !== null;

  return (
    <div className="re-root">
      <div className="re-stage-wrap">
        <div className="re-stage" ref={stageRef}>
          {showLesson && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: state.screen === "lesson" ? 1 : 0,
                transition: "opacity 300ms ease",
                pointerEvents: state.screen === "lesson" ? "auto" : "none",
              }}
            >
              <LessonHeader state={state} lesson={SAMPLE_LESSON} />
              <Lesson
                lesson={SAMPLE_LESSON}
                state={state}
                onEnter={enterActivity}
                registerRef={registerRef}
                variant={variant}
              />
              <div className="re-lesson-foot">
                <FootOrnament />
              </div>
              <div className="re-variant-toggle">
                <button
                  className={variant === "safe" ? "on" : ""}
                  onClick={() => setVariant("safe")}
                >
                  Safe
                </button>
                <button
                  className={variant === "bold" ? "on" : ""}
                  onClick={() => setVariant("bold")}
                >
                  Bold
                </button>
              </div>
            </div>
          )}

          {state.screen === "activity" && activity && (
            <div style={{ position: "absolute", inset: 0, animation: "re-fade-in 300ms ease both" }}>
              <Activity
                activity={activity}
                idx={state.currentActivity}
                state={state}
                onExit={exitActivity}
                onResult={recordResult}
                onAdvance={advance}
                showLegend
              />
            </div>
          )}

          {transition && (
            <TransitionGhost
              from={transition.from}
              to={transition.to}
              glyph={transition.glyph}
              onDone={() => {}}
            />
          )}

          {state.screen === "done" && <LessonComplete onReset={resetLesson} />}
        </div>
      </div>
    </div>
  );
}
