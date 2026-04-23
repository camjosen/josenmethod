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
    <div style={{ width: "100vw", height: "100vh", background: "#1a1613" }}>
      {status === "connecting" && !state && (
        <div className="text-neutral-100 p-4">Connecting…</div>
      )}
      {error && <div className="text-red-400 p-4">{error}</div>}
      {state && lesson && (
        <Stage>
          <SessionStage session={state} lesson={lesson} />
        </Stage>
      )}
    </div>
  );
}
