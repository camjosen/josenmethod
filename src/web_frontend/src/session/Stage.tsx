import "../reading_exercise/reading-exercise.css";

interface Props {
  children: React.ReactNode;
}

export function Stage({ children }: Props) {
  return <div className="re-root re-stage">{children}</div>;
}
