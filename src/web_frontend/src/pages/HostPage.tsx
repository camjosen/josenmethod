import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSession } from "../session/api";

export default function HostPage() {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const start = async () => {
    setBusy(true);
    setError(null);
    try {
      const code = await createSession();
      navigate(`/teacher/${code}`);
    } catch (e) {
      setError(String(e));
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-neutral-100">
      <div className="flex flex-col gap-4 w-80">
        <h1 className="text-2xl font-semibold text-center">Host a session</h1>
        <p className="text-sm text-neutral-400 text-center">
          Start a session, then pick lessons as you go.
        </p>
        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        <button
          onClick={start}
          disabled={busy}
          className="bg-neutral-100 text-neutral-900 rounded-md py-3 font-medium disabled:opacity-50"
        >
          {busy ? "Starting…" : "Start session"}
        </button>
      </div>
    </div>
  );
}
