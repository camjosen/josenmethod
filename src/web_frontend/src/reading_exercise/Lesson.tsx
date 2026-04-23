import { Fragment, useMemo } from "react";
import type { Lesson as LessonData } from "./data";
import { Fleuron, LogoMark } from "./glyphs";
import { Medallion } from "./Medallion";
import { activityStatus, type LessonState } from "./state";

interface Props {
  lesson: LessonData;
  state: LessonState;
  onEnter: (idx: number) => void;
  registerRef: (idx: number, node: HTMLDivElement | null) => void;
  variant: "safe" | "bold";
}

const BOLD_POSITIONS = [
  { x: 200, y: 720 },
  { x: 430, y: 380 },
  { x: 683, y: 640 },
  { x: 936, y: 340 },
  { x: 1166, y: 620 },
];

export function LessonHeader({ state, lesson }: { state: LessonState; lesson: LessonData }) {
  return (
    <div className="re-lesson-header">
      <div className="re-mark">
        <LogoMark />
      </div>
      <div className="re-lesson-dots">
        {lesson.activities.map((a, i) => {
          const s = activityStatus(i, state);
          const cls = ["re-seg"];
          if (s === "done") cls.push("done");
          if (s === "current") cls.push("current");
          return <div key={a.id} className={cls.join(" ")} />;
        })}
      </div>
    </div>
  );
}

function LessonSafe({ lesson, state, onEnter, registerRef }: Props) {
  return (
    <div className="re-lesson-view">
      <div className="re-lesson-safe">
        <div className="re-connector" />
        {lesson.activities.map((a, i) => (
          <Fragment key={a.id}>
            <Medallion
              activity={a}
              idx={i}
              state={state}
              onEnter={onEnter}
              registerRef={registerRef}
            />
            {i < lesson.activities.length - 1 && (
              <div className="re-ornament">
                <Fleuron />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function LessonBold({ lesson, state, onEnter, registerRef }: Props) {
  const d = useMemo(() => {
    const pts = BOLD_POSITIONS;
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const cur = pts[i];
      const mx = (prev.x + cur.x) / 2;
      path += ` C ${mx} ${prev.y}, ${mx} ${cur.y}, ${cur.x} ${cur.y}`;
    }
    return path;
  }, []);

  return (
    <div className="re-lesson-view">
      <div className="re-lesson-bold">
        <svg className="re-path" viewBox="0 0 1366 1024" preserveAspectRatio="none">
          <path
            d={d}
            stroke="var(--re-rule-strong)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="2 10"
            strokeLinecap="round"
          />
          {BOLD_POSITIONS.slice(0, -1).map((p, i) => {
            const next = BOLD_POSITIONS[i + 1];
            const mx = (p.x + next.x) / 2;
            const my = (p.y + next.y) / 2;
            return (
              <g key={i} transform={`translate(${mx} ${my})`} opacity="0.5">
                <path d="M -5 0 Q 0 -5, 5 0 Q 0 5, -5 0 Z" fill="var(--re-oxblood)" />
              </g>
            );
          })}
        </svg>

        {lesson.activities.map((a, i) => (
          <div
            key={a.id}
            className="re-activity-pos"
            style={{ left: BOLD_POSITIONS[i].x, top: BOLD_POSITIONS[i].y }}
          >
            <Medallion
              activity={a}
              idx={i}
              state={state}
              onEnter={onEnter}
              registerRef={registerRef}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Lesson(props: Props) {
  return props.variant === "safe" ? <LessonSafe {...props} /> : <LessonBold {...props} />;
}
