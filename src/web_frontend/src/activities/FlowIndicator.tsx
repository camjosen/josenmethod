import { flowCopyFor, type ToolName } from "./flowCopy";

interface Props {
  toolName: ToolName;
  flow: string[];
  flowIdx: number;
}

export function FlowIndicator({ toolName, flow, flowIdx }: Props) {
  if (flow.length === 0) return null;
  return (
    <div className="jm-flow-indicator">
      {flow.map((step, i) => {
        const isCurrent = i === flowIdx;
        const isDone = i < flowIdx;
        const cls = ["jm-flow-seg"];
        if (isCurrent) cls.push("current");
        if (isDone) cls.push("done");
        return (
          <div key={`${i}:${step}`} className={cls.join(" ")}>
            <span className="jm-flow-seg-label">
              {flowCopyFor(toolName, step).label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
