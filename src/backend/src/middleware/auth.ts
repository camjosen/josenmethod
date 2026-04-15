import { createMiddleware } from 'hono/factory';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'dev-secret-change-me'
);

export const authMiddleware = createMiddleware<{
  Variables: { accountId: number };
}>(async (c, next) => {
  const authHeader = c.req.header('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ message: 'Unauthorized' }, 401);
  }
  try {
    const { payload } = await jwtVerify(authHeader.slice(7), JWT_SECRET);
    if (typeof payload.accountId !== 'number') {
      return c.json({ message: 'Unauthorized' }, 401);
    }
    c.set('accountId', payload.accountId);
    await next();
  } catch {
    return c.json({ message: 'Unauthorized' }, 401);
  }
});
