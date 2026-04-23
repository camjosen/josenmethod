import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSession, fetchLessons, type LessonSummary } from "../session/api";

export default function HostPage() {
  const [lessons, setLessons] = useState<LessonSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLessons()
      .then(setLessons)
      .catch((e) => setError(String(e)));
  }, []);

  const start = async (idx: number) => {
    setBusy(true);
    try {
      const code = await createSession(idx);
      navigate(`/teacher/${code}`);
    } catch (e) {
      setError(String(e));
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Pick a lesson</h1>
        {error && <div className="text-red-400 mb-4">{error}</div>}
        {!lessons && !error && <div>Loading…</div>}
        {lessons && (
          <ul className="flex flex-col gap-2">
            {lessons.map((l) => (
              <li key={l.idx}>
                <button
                  disabled={busy}
                  onClick={() => start(l.idx)}
                  className="w-full text-left bg-neutral-800 hover:bg-neutral-700 rounded-md px-4 py-3 flex justify-between items-center disabled:opacity-50"
                >
                  <span className="font-medium">{l.title}</span>
                  <span className="text-sm text-neutral-400">{l.activityCount} activities</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
