import type { ReactNode } from "react";
import type { FontKey } from "@reading_app/utils/fonts";
import type { LessonState as BackendLessonState } from "@backend/sessions/types";
import type { SessionLesson, SessionLessonActivity } from "./lessonAdapter";
import "../reading_exercise/reading-exercise.css";
import "../activities/activities.css";
import { Fleuron, FootOrnament, Glyphs, LogoMark, StarBig } from "../reading_exercise/glyphs";
import { Medallion } from "../reading_exercise/Medallion";
import { itemStatus, type ItemResult, type LessonState } from "../reading_exercise/state";
import { ItemActivity, type Role } from "../activities/ItemActivity";
import { ReadSoundsItem } from "../activities/items/ReadSoundsItem";
import { SoundIntroductionItem } from "../activities/items/SoundIntroductionItem";
import { ReadWordsItem } from "../activities/items/ReadWordsItem";
import { RhymingItem, rhymeTeacherExtra } from "../activities/items/RhymingItem";
import { VerbalBlendingItem, blendingTeacherExtra } from "../activities/items/VerbalBlendingItem";
import { WritingItem } from "../activities/items/WritingItem";
import { StoryItem, buildStoryItems, storyTeacherExtra } from "../activities/items/StoryItem";

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

const TOOL_GLYPH: Record<SessionLessonActivity["toolName"], ReactNode> = {
  ReadSounds: Glyphs.listen,
  SoundIntroduction: Glyphs.listen,
  ReadWords: Glyphs.read,
  Rhyming: Glyphs.speak,
  VerbalBlending: Glyphs.speak,
  Writing: Glyphs.star,
  Story: Glyphs.read,
};

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
          {lessonState.lessonTitle}
        </div>
      </div>
      <div className="re-lesson-view">
        <div className="re-lesson-safe">
          <div className="re-connector" />
          {lesson.activities.map((a, i) => (
            <div key={a.id} style={{ display: "contents" }}>
              <Medallion
                itemCount={a.itemCount}
                glyph={TOOL_GLYPH[a.toolName]}
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
  const common = {
    activityIdx,
    state,
    role,
    font,
    onItemDone,
    onItemFailed,
    onExit: onExitActivity,
    glyph: TOOL_GLYPH[activity.toolName],
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
    case "Story": {
      const storyInput = activity.input;
      const storyItems = buildStoryItems(storyInput);
      return (
        <ItemActivity
          {...common}
          toolName="Story"
          items={storyItems}
          flow={[]}
          renderItem={(itemRef, ctx) => (
            <StoryItem itemRef={itemRef} input={storyInput} ctx={ctx} />
          )}
          teacherExtraFor={(itemRef) => storyTeacherExtra(itemRef, storyInput)}
        />
      );
    }
  }
}

// Re-exports for consumers.
export { itemStatus };
