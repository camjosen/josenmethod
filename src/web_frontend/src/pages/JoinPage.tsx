import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { lookupSession } from "../session/api";

export default function JoinPage() {
  const [code, setCode] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = code.trim().toUpperCase();
    if (!clean) return;
    setBusy(true);
    setError(null);
    try {
      const res = await lookupSession(clean);
      if (!res.exists) {
        setError("Session not found");
        setBusy(false);
        return;
      }
      navigate(`/${role}/${clean}`);
    } catch (err) {
      setError(String(err));
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-neutral-100">
      <form onSubmit={submit} className="flex flex-col gap-4 w-80">
        <h1 className="text-2xl font-semibold text-center">Join a session</h1>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Code"
          maxLength={8}
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          className="bg-neutral-800 rounded-md px-4 py-3 text-center text-2xl tracking-[0.5em] font-mono"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 rounded-md py-2 ${role === "student" ? "bg-neutral-100 text-neutral-900" : "border border-neutral-600"}`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole("teacher")}
            className={`flex-1 rounded-md py-2 ${role === "teacher" ? "bg-neutral-100 text-neutral-900" : "border border-neutral-600"}`}
          >
            Teacher
          </button>
        </div>
        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        <button
          type="submit"
          disabled={busy || code.length === 0}
          className="bg-neutral-100 text-neutral-900 rounded-md py-3 font-medium disabled:opacity-50"
        >
          Join
        </button>
      </form>
    </div>
  );
}
