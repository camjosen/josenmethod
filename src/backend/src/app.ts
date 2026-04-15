import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { authRouter } from './auth/router';
import { accountsRouter } from './users/router';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.get('/health', (c) => c.json({ ok: true }));

const routes = app.route('/auth', authRouter).route('/accounts', accountsRouter);

export type AppType = typeof routes;

export { app };
