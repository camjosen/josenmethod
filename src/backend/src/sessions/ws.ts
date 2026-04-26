import type { Server, ServerWebSocket, WebSocketHandler } from "bun";
import { normalizeCode } from "./codes.ts";
import type { WsData } from "./store.ts";
import { addSocket, applyCommand, getSessionState, removeSocket } from "./store.ts";
import type { ClientMsg } from "./types.ts";

const WS_PATH_RE = /^\/sessions\/([A-Z0-9]+)\/ws$/i;

export function isWsPath(pathname: string): boolean {
  return WS_PATH_RE.test(pathname);
}

export function handleUpgrade(req: Request, server: Server<WsData>): Response | undefined {
  const url = new URL(req.url);
  const match = WS_PATH_RE.exec(url.pathname);
  if (!match) return new Response("Not found", { status: 404 });

  const code = normalizeCode(match[1]);
  if (!getSessionState(code)) {
    return new Response("Session not found", { status: 404 });
  }

  const role = url.searchParams.get("role") === "teacher" ? "teacher" : "student";
  const data: WsData = { code, role };

  if (server.upgrade(req, { data })) {
    return undefined;
  }
  return new Response("Upgrade failed", { status: 500 });
}

export const websocketHandlers: WebSocketHandler<WsData> = {
  open(ws: ServerWebSocket<WsData>) {
    addSocket(ws.data.code, ws);
  },
  message(ws, raw) {
    let msg: ClientMsg;
    try {
      msg = JSON.parse(String(raw)) as ClientMsg;
    } catch {
      return;
    }
    if (!msg || typeof msg !== "object" || typeof msg.type !== "string") return;
    applyCommand(ws.data.code, msg);
  },
  close(ws) {
    removeSocket(ws.data.code, ws);
  },
};
