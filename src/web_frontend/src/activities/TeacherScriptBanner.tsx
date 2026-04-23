import type { ReactNode } from "react";
import { flowCopyFor, modificationCopy, type ToolName } from "./flowCopy";

interface Props {
  toolName: ToolName;
  flowStep?: string;
  modifications?: string[];
  /** Optional extra content unique to this tool (e.g. rhyme fullWord). */
  extra?: ReactNode;
}

export function TeacherScriptBanner({ toolName, flowStep, modifications, extra }: Props) {
  const step = flowStep ? flowCopyFor(toolName, flowStep) : null;
  const mods = (modifications ?? [])
    .map(modificationCopy)
    .filter((m) => m.teacher.length > 0);

  if (!step && mods.length === 0 && !extra) return null;

  return (
    <div className="jm-teacher-banner">
      {step?.teacher && <div className="jm-teacher-script">{step.teacher}</div>}
      {extra && <div className="jm-teacher-extra">{extra}</div>}
      {mods.length > 0 && (
        <div className="jm-teacher-mods">
          {mods.map((m, i) => (
            <span key={i} className="jm-teacher-mod">
              {m.short}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
