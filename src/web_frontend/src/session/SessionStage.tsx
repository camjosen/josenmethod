import type { FontKey } from "@reading_app/utils/fonts";
import type { LessonState as BackendLessonState } from "@backend/sessions/types";
import type { SessionLesson, SessionLessonActivity } from "./lessonAdapter";
import "../reading_exercise/reading-exercise.css";
import "../activities/activities.css";
import { FootOrnament, StarBig } from "../reading_exercise/glyphs";
import {
  activityStatus,
  itemStatus,
  type ItemResult,
  type LessonState,
} from "../reading_exercise/state";
import { ActivityPreview } from "./ActivityPreview";
import { ItemActivity, type Role } from "../activities/ItemActivity";
import { ReadSoundsItem } from "../activities/items/ReadSoundsItem";
import { SoundIntroductionItem } from "../activities/items/SoundIntroductionItem";
import { ReadWordsItem } from "../activities/items/ReadWordsItem";
import { RhymingItem, rhymeTeacherExtra } from "../activities/items/RhymingItem";
import { VerbalBlendingItem, blendingTeacherExtra } from "../activities/items/VerbalBlendingItem";
import { WritingItem } from "../activities/items/WritingItem";
import { StoryActivity } from "../activities/StoryActivity";

function toLessonState(l: BackendLessonState): LessonState {
  const itemResults: Record<number, Record<number, ItemResult>> = {};
  for (const [key, value] of Object.entries(l.itemResults)) {
    const [aStr, iStr] = key.split(":");
    const a = Number(aStr);
    const i = Number(iStr);
    if (!itemResults[a]) itemResults[a] = {};
    itemResults[a][i] = value as ItemResult;
  }
  return {
    screen: l.screen,
    currentActivity: l.cursor.activityIdx,
    currentItem: l.cursor.itemIdx,
    itemResults,
    completedActivities: new Set(l.completedActivities),
  };
}

interface StageProps {
  lessonState: BackendLessonState;
  lesson: SessionLesson;
  role?: Role;
  font?: FontKey;
  onEnterActivity?: (idx: number) => void;
  onResetLesson?: () => void;
  onItemDone?: () => void;
  onItemFailed?: () => void;
  onExitActivity?: () => void;
}

export function SessionStage({
  lessonState,
  lesson,
  role = "student",
  font,
  onEnterActivity,
  onResetLesson,
  onItemDone,
  onItemFailed,
  onExitActivity,
}: StageProps) {
  const state = toLessonState(lessonState);

  if (lessonState.screen === "done") {
    return (
      <div className="re-lesson-done" onClick={onResetLesson}>
        <div className="re-ring">
          <StarBig />
        </div>
      </div>
    );
  }

  if (lessonState.screen === "activity") {
    const activity = lesson.activities[lessonState.cursor.activityIdx];
    if (!activity) return null;
    return renderActivity(activity, state, lessonState.cursor.activityIdx, {
      role,
      font,
      onItemDone,
      onItemFailed,
      onExitActivity,
    });
  }

  return (
    <>
      <div className="re-lesson-header">
        <div className="re-lesson-title">{lessonState.lessonTitle}</div>
      </div>

      <div className="re-lesson-list">
        {lesson.activities.map((a, i) => {
          const status = activityStatus(i, state);
          const isCurrent = status === "current";
          const progress = isCurrent
            ? { currentItem: state.currentItem, itemResults: state.itemResults[i] ?? {} }
            : undefined;
          const clickable = role === "teacher" && status !== "locked";
          const cls = ["re-lesson-row", status];
          if (clickable) cls.push("clickable");
          return (
            <div
              key={a.id}
              className={cls.join(" ")}
              onClick={clickable ? () => onEnterActivity?.(i) : undefined}
            >
              <div className="re-lesson-row-meta">
                <span className="re-lesson-row-num">{i + 1}</span>
                {status === "done" && (
                  <span className="re-lesson-row-status" aria-label="done">✓</span>
                )}
                {status === "current" && (
                  <span className="re-lesson-row-status" aria-label="current">●</span>
                )}
              </div>
              <ActivityPreview activity={a} progress={progress} size="lg" font={font} />
            </div>
          );
        })}
      </div>

      <div className="re-lesson-foot">
        <FootOrnament />
      </div>
    </>
  );
}

interface ActivityOpts {
  role: Role;
  font?: FontKey;
  onItemDone?: () => void;
  onItemFailed?: () => void;
  onExitActivity?: () => void;
}

function renderActivity(
  activity: SessionLessonActivity,
  state: LessonState,
  activityIdx: number,
  opts: ActivityOpts
) {
  const { role, font, onItemDone, onItemFailed, onExitActivity } = opts;
  const progress = {
    currentItem: state.currentItem,
    itemResults: state.itemResults[activityIdx] ?? {},
  };
  const topStrip = (
    <ActivityPreview activity={activity} progress={progress} size="sm" font={opts.font} />
  );
  const common = {
    state,
    role,
    font,
    onItemDone,
    onItemFailed,
    onExit: onExitActivity,
    topStrip,
  };

  switch (activity.toolName) {
    case "ReadSounds":
      return (
        <ItemActivity
          {...common}
          toolName="ReadSounds"
          items={activity.input.items}
          flow={activity.input.flow}
          modifications={activity.input.modifications}
          renderItem={(sound, ctx) => <ReadSoundsItem sound={sound} ctx={ctx} />}
        />
      );
    case "SoundIntroduction":
      return (
        <ItemActivity
          {...common}
          toolName="SoundIntroduction"
          items={[activity.input.sound]}
          flow={[]}
          renderItem={(sound, ctx) => <SoundIntroductionItem sound={sound} ctx={ctx} />}
        />
      );
    case "ReadWords":
      return (
        <ItemActivity
          {...common}
          toolName="ReadWords"
          items={activity.input.items}
          flow={activity.input.flow}
          modifications={activity.input.modifications}
          renderItem={(word, ctx) => (
            <ReadWordsItem word={word} modifications={activity.input.modifications} ctx={ctx} />
          )}
        />
      );
    case "Rhyming":
      return (
        <ItemActivity
          {...common}
          toolName="Rhyming"
          items={activity.input.items}
          flow={activity.input.flow}
          modifications={activity.input.modifications}
          renderItem={(rhyme, ctx) => <RhymingItem rhyme={rhyme} ctx={ctx} />}
          teacherExtraFor={(rhyme, ctx) => rhymeTeacherExtra(rhyme, ctx)}
        />
      );
    case "VerbalBlending":
      return (
        <ItemActivity
          {...common}
          toolName="VerbalBlending"
          items={activity.input.items}
          flow={activity.input.flow}
          modifications={activity.input.modifications}
          renderItem={(item, ctx) => <VerbalBlendingItem item={item} ctx={ctx} />}
          teacherExtraFor={(item, ctx) => blendingTeacherExtra(item, ctx)}
        />
      );
    case "Writing":
      return (
        <ItemActivity
          {...common}
          toolName="Writing"
          items={activity.input.items}
          flow={[]}
          renderItem={(task, ctx) => <WritingItem task={task} ctx={ctx} />}
        />
      );
    case "Story":
      return (
        <StoryActivity
          input={activity.input}
          role={role}
          font={font}
          onComplete={onItemDone}
          onExit={onExitActivity}
        />
      );
  }
}

// Re-exports for consumers.
export { itemStatus };
