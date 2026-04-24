import { useEffect, useRef, type ReactNode } from "react";
import { activityStatus, itemStatus, type LessonState } from "./state";

interface Props {
  itemCount: number;
  glyph: ReactNode;
  idx: number;
  state: LessonState;
  onEnter: (idx: number) => void;
  registerRef: (idx: number, node: HTMLDivElement | null) => void;
}

function orbitPosition(i: number, n: number, radius = 86) {
  const arcSpan = n <= 6 ? Math.PI * 1.2 : Math.PI * 2;
  const startAngle = n <= 6 ? -Math.PI / 2 - arcSpan / 2 : -Math.PI / 2;
  const step = n <= 1 ? 0 : arcSpan / (n - (n <= 6 ? 1 : 0));
  const angle = startAngle + step * i;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

export function Medallion({ itemCount, glyph, idx, state, onEnter, registerRef }: Props) {
  const status = activityStatus(idx, state);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerRef(idx, ref.current);
    return () => registerRef(idx, null);
  }, [idx, registerRef]);

  return (
    <div
      ref={ref}
      className={`re-activity ${status}`}
      data-activity-idx={idx}
      onClick={() => status !== "locked" && onEnter(idx)}
    >
      <div className="re-items-ring">
        {Array.from({ length: itemCount }, (_, i) => {
          const pos = orbitPosition(i, itemCount, 86);
          const st = itemStatus(idx, i, state);
          const cls = ["re-item-dot"];
          if (st === "done") cls.push("done");
          if (st === "failed") cls.push("failed");
          if (st === "current") cls.push("current");
          return (
            <div
              key={i}
              className={cls.join(" ")}
              style={{ transform: `translate(${pos.x - 5}px, ${pos.y - 5}px)` }}
            />
          );
        })}
      </div>
      <div className="re-medallion">{glyph}</div>
    </div>
  );
}
