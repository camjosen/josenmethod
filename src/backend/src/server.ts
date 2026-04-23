import { app } from './app';
import { handleUpgrade, isWsPath, websocketHandlers } from './sessions/ws';

const PORT = Number(process.env.PORT ?? 3001);

const server = Bun.serve({
  port: PORT,
  fetch(req, server): Response | Promise<Response> | undefined {
    const url = new URL(req.url);
    if (isWsPath(url.pathname)) {
      return handleUpgrade(req, server);
    }
    return app.fetch(req);
  },
  websocket: websocketHandlers,
});

console.log(`Backend running at http://localhost:${server.port}`);
