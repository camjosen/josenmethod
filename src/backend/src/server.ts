import { app } from './app';

const PORT = Number(process.env.PORT ?? 3001);

const server = Bun.serve({
  port: PORT,
  fetch: app.fetch,
});

console.log(`Backend running at http://localhost:${server.port}`);
