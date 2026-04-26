import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchLessonDetail, type LessonDetail } from "../session/api";
import { adaptLesson, type SessionLesson } from "../session/lessonAdapter";
import { SessionStage } from "../session/SessionStage";
import { Stage } from "../session/Stage";
import { useSession } from "../session/useSession";

export default function StudentSessionPage() {
  const { code } = useParams<{ code: string }>();
  const { state, status } = useSession(code, "student");
  const [lessonCache, setLessonCache] = useState<Record<number, SessionLesson>>({});
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#1a1613" }}>
      {status === "connecting" && !state && (
        <div className="text-neutral-100 p-4">Connecting…</div>
      )}
      {error && <div className="text-red-400 p-4">{error}</div>}
      {state && !currentLesson && (
        <div className="w-full h-full flex items-center justify-center text-neutral-300">
          <div className="text-center">
            <div className="text-2xl font-serif mb-2">Waiting for teacher…</div>
            <div className="text-sm text-neutral-500 font-mono tracking-widest">{code}</div>
          </div>
        </div>
      )}
      {currentLesson && currentContent && (
        <Stage>
          <SessionStage lessonState={currentLesson} lesson={currentContent} role="student" />
        </Stage>
      )}
    </div>
  );
}
