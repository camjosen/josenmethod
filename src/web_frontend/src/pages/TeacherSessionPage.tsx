import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchLessonDetail, type LessonDetail } from "../session/api";
import { adaptLesson, type SessionLesson } from "../session/lessonAdapter";
import { SessionStage } from "../session/SessionStage";
import { Stage } from "../session/Stage";
import { useSession } from "../session/useSession";
import type { ClientMsg, SessionState } from "@backend/sessions/types";

function cursorKey(a: number, i: number) {
  return `${a}:${i}`;
}

interface ControlsProps {
  state: SessionState;
  send: (msg: ClientMsg) => void;
}

function StarRating({ state, send }: ControlsProps) {
  const current = state.ratings[cursorKey(state.cursor.activityIdx, state.cursor.itemIdx)];
  const disabled = state.screen !== "activity";
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

function Controls({ state, send }: ControlsProps) {
  const doneMessage = state.screen === "done" ? "Lesson complete" : null;
  return (
    <div className="flex flex-col gap-4 px-4 py-4 bg-neutral-950 border-t border-neutral-800">
      <div className="text-center text-xs text-neutral-500 uppercase tracking-wider">
        {doneMessage ?? `Activity ${state.cursor.activityIdx + 1} · Item ${state.cursor.itemIdx + 1}`}
      </div>
      <StarRating state={state} send={send} />
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
      <button
        onClick={() => send({ type: "reset" })}
        className="text-xs text-neutral-500 hover:text-neutral-300"
      >
        Reset lesson
      </button>
    </div>
  );
}

export default function TeacherSessionPage() {
  const { code } = useParams<{ code: string }>();
  const { state, status, send } = useSession(code, "teacher");
  const [lesson, setLesson] = useState<SessionLesson | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!state || lesson) return;
    fetchLessonDetail(state.lessonIdx)
      .then((d: LessonDetail) => setLesson(adaptLesson(d)))
      .catch((e) => setError(String(e)));
  }, [state, lesson]);

  if (!code) return <div>Missing session code.</div>;

  return (
    <div className="h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <div className="px-4 py-2 flex justify-between items-center text-sm border-b border-neutral-800">
        <div>
          Session <span className="font-mono font-bold tracking-widest">{code}</span>
        </div>
        <div className="text-neutral-400">
          {state?.lessonTitle ?? ""} · {status}
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-black">
        {status === "connecting" && !state && (
          <div className="p-4 text-neutral-400">Connecting…</div>
        )}
        {error && <div className="p-4 text-red-400">{error}</div>}
        {state && lesson && (
          <Stage>
            <SessionStage session={state} lesson={lesson} onEnterActivity={(idx) => send({ type: "enterActivity", activityIdx: idx })} onResetLesson={() => send({ type: "reset" })} />
          </Stage>
        )}
      </div>

      {state && <Controls state={state} send={send} />}
    </div>
  );
}
