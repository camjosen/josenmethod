import { useLayoutEffect, useRef } from "react";
import "../reading_exercise/reading-exercise.css";

interface Props {
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function Stage({ children, containerRef: externalRef }: Props) {
  const internalWrapRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = externalRef ?? internalWrapRef;

  useLayoutEffect(() => {
    const fit = () => {
      const wrap = wrapRef.current;
      const stage = stageRef.current;
      if (!wrap || !stage) return;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const s = Math.min(w / 1366, h / 1024);
      stage.style.transform = `translate(-50%, -50%) scale(${s})`;
    };
    fit();
    window.addEventListener("resize", fit);
    const ro = new ResizeObserver(fit);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => {
      window.removeEventListener("resize", fit);
      ro.disconnect();
    };
  }, [wrapRef]);

  return (
    <div
      className="re-root"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: "#1a1613",
      }}
    >
      <div
        ref={wrapRef}
        style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      >
        <div
          className="re-stage"
          ref={stageRef}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
