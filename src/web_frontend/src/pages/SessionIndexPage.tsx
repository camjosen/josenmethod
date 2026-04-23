import { Link } from "react-router-dom";

export default function SessionIndexPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-neutral-100">
      <div className="flex flex-col gap-4 w-80">
        <h1 className="text-2xl font-semibold text-center">Reading Session</h1>
        <Link
          to="/host"
          className="bg-neutral-100 text-neutral-900 rounded-md py-3 text-center font-medium hover:bg-white"
        >
          Host a session
        </Link>
        <Link
          to="/join"
          className="border border-neutral-600 rounded-md py-3 text-center font-medium hover:bg-neutral-800"
        >
          Join a session
        </Link>
      </div>
    </div>
  );
}
