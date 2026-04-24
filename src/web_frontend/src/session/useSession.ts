import { useEffect, useRef, useState } from "react";
import type { ClientMsg, ServerMsg, SessionState } from "@backend/sessions/types";
import { backendWsHost } from "../backendUrl";

export type ConnectionStatus = "connecting" | "open" | "closed";

export interface UseSessionResult {
  state: SessionState | null;
  status: ConnectionStatus;
  error: string | null;
  send: (msg: ClientMsg) => void;
}

export function useSession(code: string | undefined, role: "teacher" | "student"): UseSessionResult {
  const [state, setState] = useState<SessionState | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!code) {
      setStatus("closed");
      return;
    }

    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    const connect = () => {
      if (cancelled) return;
      setStatus("connecting");
      const ws = new WebSocket(`ws://${backendWsHost()}/sessions/${code}/ws?role=${role}`);
      wsRef.current = ws;

      ws.onopen = () => {
        if (cancelled) return;
        setStatus("open");
        setError(null);
      };

      ws.onmessage = (ev) => {
        try {
          const msg = JSON.parse(ev.data) as ServerMsg;
          if (msg.type === "state") setState(msg.session);
          else if (msg.type === "error") setError(msg.message);
        } catch {
          // ignore
        }
      };

      ws.onclose = () => {
        if (cancelled) return;
        setStatus("closed");
        retryTimer = setTimeout(connect, 1000);
      };

      ws.onerror = () => {
        // onclose will follow; let it handle retry.
      };
    };

    connect();

    return () => {
      cancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [code, role]);

  const send = (msg: ClientMsg) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify(msg));
  };

  return { state, status, error, send };
}
