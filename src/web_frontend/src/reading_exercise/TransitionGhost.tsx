import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export interface TransitionRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Props {
  from: TransitionRect;
  to: TransitionRect;
  glyph: ReactNode;
  onDone: () => void;
}

export function TransitionGhost({ from, to, glyph, onDone }: Props) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setStage(1));
    const done = setTimeout(() => onDone(), 820);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
    };
  }, [onDone]);

  const cur = stage === 0 ? from : to;
  return (
    <div
      style={{
        position: "absolute",
        left: cur.x,
        top: cur.y,
        width: cur.w,
        height: cur.h,
        transform: "translate(-50%,-50%)",
        borderRadius: "50%",
        background: "var(--re-paper)",
        border: "1px solid var(--re-rule-strong)",
        transition: "all 780ms cubic-bezier(0.6,0.05,0.2,0.95)",
        zIndex: 500,
        display: "grid",
        placeItems: "center",
        color: "var(--re-ink)",
        boxShadow: stage === 0 ? "var(--re-shadow-lift)" : "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          opacity: stage === 0 ? 1 : 0,
          transform: stage === 0 ? "scale(1)" : "scale(2.5)",
          transition: "all 520ms cubic-bezier(0.32,0.72,0.24,1)",
        }}
      >
        {glyph}
      </div>
    </div>
  );
}
