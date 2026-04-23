import type { SessionState } from "@backend/sessions/types";
import type { SessionLesson } from "./lessonAdapter";
import "../reading_exercise/reading-exercise.css";
import { Fleuron, FootOrnament, LogoMark, StarBig } from "../reading_exercise/glyphs";
import { Medallion } from "../reading_exercise/Medallion";
import { itemStatus, type ItemResult, type LessonState } from "../reading_exercise/state";

function toLessonState(s: SessionState): LessonState {
  const itemResults: Record<number, Record<number, ItemResult>> = {};
  for (const [key, value] of Object.entries(s.itemResults)) {
    const [aStr, iStr] = key.split(":");
    const a = Number(aStr);
    const i = Number(iStr);
    if (!itemResults[a]) itemResults[a] = {};
    itemResults[a][i] = value as ItemResult;
  }
  return {
    screen: s.screen,
    currentActivity: s.cursor.activityIdx,
    currentItem: s.cursor.itemIdx,
    itemResults,
    completedActivities: new Set(s.completedActivities),
  };
}

interface StageProps {
  session: SessionState;
  lesson: SessionLesson;
  onEnterActivity?: (idx: number) => void;
  onResetLesson?: () => void;
}

export function SessionStage({ session, lesson, onEnterActivity, onResetLesson }: StageProps) {
  const state = toLessonState(session);

  if (session.screen === "done") {
    return (
      <div className="re-lesson-done" onClick={onResetLesson}>
        <div className="re-ring">
          <StarBig />
        </div>
      </div>
    );
  }

  if (session.screen === "activity") {
    const activity = lesson.activities[session.cursor.activityIdx];
    const item = activity?.items[session.cursor.itemIdx];
    return (
      <div className="re-activity-view">
        <div className="re-activity-stage">
          <div className="re-rim" />
        </div>
        <div
          className="re-activity-mark"
          style={{ fontFamily: "serif", fontSize: 20, textTransform: "uppercase", letterSpacing: 2 }}
        >
          {activity?.toolName}
        </div>
        <div className="re-item-container">
          <div className="re-item-word enter">
            <span style={{ fontSize: "inherit", fontFamily: "inherit" }}>
              {item?.spelling ?? ""}
            </span>
          </div>
        </div>
        <div className="re-progress-row">
          {activity?.items.map((_, i) => {
            const st = itemStatus(session.cursor.activityIdx, i, state);
            const pcls = ["re-pdot"];
            if (st === "done") pcls.push("done");
            if (st === "failed") pcls.push("failed");
            if (st === "current") pcls.push("current");
            return <div key={i} className={pcls.join(" ")} />;
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="re-lesson-header">
        <div className="re-mark">
          <LogoMark />
        </div>
        <div className="re-lesson-dots">
          {lesson.activities.map((a, i) => {
            const isDone = state.completedActivities.has(i);
            const isCurrent = state.currentActivity === i;
            const cls = ["re-seg"];
            if (isDone) cls.push("done");
            if (isCurrent) cls.push("current");
            return <div key={a.id} className={cls.join(" ")} />;
          })}
        </div>
        <div style={{ fontFamily: "serif", fontSize: 12, color: "var(--re-ink-soft)" }}>
          {session.lessonTitle}
        </div>
      </div>
      <div className="re-lesson-view">
        <div className="re-lesson-safe">
          <div className="re-connector" />
          {lesson.activities.map((a, i) => (
            <div key={a.id} style={{ display: "contents" }}>
              <Medallion
                activity={a}
                idx={i}
                state={state}
                onEnter={(idx) => onEnterActivity?.(idx)}
                registerRef={() => {}}
              />
              {i < lesson.activities.length - 1 && (
                <div className="re-ornament">
                  <Fleuron />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="re-lesson-foot">
        <FootOrnament />
      </div>
    </>
  );
}
