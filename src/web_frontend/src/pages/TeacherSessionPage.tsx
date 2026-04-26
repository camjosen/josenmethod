import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchLessonDetail, fetchLessons, type LessonDetail, type LessonSummary } from "../session/api";
import { adaptLesson, type SessionLesson } from "../session/lessonAdapter";
import { SessionStage } from "../session/SessionStage";
import { Stage } from "../session/Stage";
import { useSession } from "../session/useSession";
import { useCurriculumFonts } from "../curriculumFonts";
import { FontPicker } from "../reading_exercise/FontPicker";
import type { ClientMsg, LessonState } from "@backend/sessions/types";

function cursorKey(a: number, i: number) {
  return `${a}:${i}`;
}

interface ControlsProps {
  lesson: LessonState;
  send: (msg: ClientMsg) => void;
}

function StarRating({ lesson, send }: ControlsProps) {
  const current = lesson.ratings[cursorKey(lesson.cursor.activityIdx, lesson.cursor.itemIdx)];
  const disabled = lesson.screen !== "activity";
  return (
    <div className="flex gap-2 justify-center">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          disabled={disabled}
          onClick={() => send({ type: "rate", stars: n as 1 | 2 | 3 | 4 | 5 })}
          className={`w-12 h-12 text-2xl rounded-full border transition ${
            current !== undefined && n <= current
              ? "bg-amber-400 text-neutral-900 border-amber-400"
              : "border-neutral-600 text-neutral-400"
          } ${disabled ? "opacity-30" : "hover:border-amber-400"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function Controls({ lesson, send }: ControlsProps) {
  const doneMessage = lesson.screen === "done" ? "Lesson complete" : null;
  return (
    <div className="flex flex-col gap-4 px-4 py-4 bg-neutral-950 border-t border-neutral-800">
      <div className="text-center text-xs text-neutral-500 uppercase tracking-wider">
        {doneMessage ?? `Activity ${lesson.cursor.activityIdx + 1} · Item ${lesson.cursor.itemIdx + 1}`}
      </div>
      <StarRating lesson={lesson} send={send} />
      <div className="flex gap-2">
        <button
          onClick={() => send({ type: "back" })}
          className="flex-1 py-3 rounded-md border border-neutral-600 text-neutral-100 hover:bg-neutral-800"
        >
          ← Back
        </button>
        <button
          onClick={() => send({ type: "advance" })}
          className="flex-1 py-3 rounded-md bg-neutral-100 text-neutral-900 font-medium hover:bg-white"
        >
          Next →
        </button>
      </div>
      <div className="flex justify-between text-xs text-neutral-500">
        <button
          onClick={() => send({ type: "exitLesson" })}
          className="hover:text-neutral-300"
        >
          ← Lesson list
        </button>
        <button
          onClick={() => send({ type: "reset" })}
          className="hover:text-neutral-300"
        >
          Reset lesson
        </button>
      </div>
    </div>
  );
}

interface PickerProps {
  lessons: LessonSummary[] | null;
  visited: Set<number>;
  currentIdx: number | null;
  onPick: (idx: number) => void;
}

function LessonPicker({ lessons, visited, currentIdx, onPick }: PickerProps) {
  if (!lessons) return <div className="p-4 text-neutral-400">Loading lessons…</div>;
  return (
    <ul className="flex flex-col gap-2 p-4 overflow-y-auto">
      {lessons.map((l) => {
        const isCurrent = l.idx === currentIdx;
        const isVisited = visited.has(l.idx);
        return (
          <li key={l.idx}>
            <button
              onClick={() => onPick(l.idx)}
              className={`w-full text-left rounded-md px-4 py-3 flex justify-between items-center ${
                isCurrent
                  ? "bg-amber-400 text-neutral-900"
                  : "bg-neutral-800 hover:bg-neutral-700"
              }`}
            >
              <span className="font-medium">{l.title}</span>
              <span className={`text-xs ${isCurrent ? "text-neutral-700" : "text-neutral-400"}`}>
                {isVisited ? "✓ in progress" : `${l.activityCount} activities`}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default function TeacherSessionPage() {
  useCurriculumFonts();
  const { code } = useParams<{ code: string }>();
  const { state, status, send } = useSession(code, "teacher");

  const [lessonList, setLessonList] = useState<LessonSummary[] | null>(null);
  const [lessonCache, setLessonCache] = useState<Record<number, SessionLesson>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLessons()
      .then(setLessonList)
      .catch((e) => setError(String(e)));
  }, []);

  const currentIdx = state?.currentLessonIdx ?? null;
  const currentLesson = currentIdx != null ? state?.lessons[currentIdx] ?? null : null;
  const currentContent = currentIdx != null ? lessonCache[currentIdx] ?? null : null;

  useEffect(() => {
    if (currentIdx == null) return;
    if (lessonCache[currentIdx]) return;
    fetchLessonDetail(currentIdx)
      .then((d: LessonDetail) =>
        setLessonCache((cache) => ({ ...cache, [currentIdx]: adaptLesson(d) }))
      )
      .catch((e) => setError(String(e)));
  }, [currentIdx, lessonCache]);

  if (!code) return <div>Missing session code.</div>;

  const visited = new Set(state ? Object.keys(state.lessons).map((k) => Number(k)) : []);

  return (
    <div className="h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <div className="px-4 py-2 flex justify-between items-center text-sm border-b border-neutral-800">
        <div>
          Session <span className="font-mono font-bold tracking-widest">{code}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="re-root tc-fontpicker-host">
            <FontPicker
              font={state?.font ?? "serif"}
              onChange={(font) => send({ type: "setFont", font })}
              className="re-font-picker-inline"
            />
          </div>
          <div className="text-neutral-400">
            {currentLesson?.lessonTitle ?? "No lesson selected"} · {status}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex">
        {currentLesson ? (
          <>
            <div className="w-64 border-r border-neutral-800 flex-shrink-0 min-h-0 overflow-hidden flex flex-col">
              <LessonPicker
                lessons={lessonList}
                visited={visited}
                currentIdx={currentIdx}
                onPick={(idx) => send({ type: "selectLesson", lessonIdx: idx })}
              />
            </div>
            <div className="flex-1 min-h-0 bg-black">
              {error && <div className="p-4 text-red-400">{error}</div>}
              {currentContent ? (
                <Stage>
                  <SessionStage
                    lessonState={currentLesson}
                    lesson={currentContent}
                    role="teacher"
                    font={state?.font}
                    onEnterActivity={(idx) => send({ type: "enterActivity", activityIdx: idx })}
                    onResetLesson={() => send({ type: "reset" })}
                    onItemDone={() => send({ type: "rate", stars: 5 })}
                    onItemFailed={() => send({ type: "rate", stars: 1 })}
                    onExitActivity={() => send({ type: "exitActivity" })}
                    onSetStoryFocus={(focus) => send({ type: "setStoryFocus", focus })}
                  />
                </Stage>
              ) : (
                <div className="p-4 text-neutral-400">Loading lesson…</div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
            <div className="px-4 pt-4 text-sm text-neutral-400">
              Pick a lesson to begin. You can switch between lessons at any time.
            </div>
            <LessonPicker
              lessons={lessonList}
              visited={visited}
              currentIdx={null}
              onPick={(idx) => send({ type: "selectLesson", lessonIdx: idx })}
            />
            {status === "connecting" && !state && (
              <div className="p-4 text-neutral-400">Connecting…</div>
            )}
            {error && <div className="p-4 text-red-400">{error}</div>}
          </div>
        )}
      </div>

      {currentLesson && <Controls lesson={currentLesson} send={send} />}
    </div>
  );
}
