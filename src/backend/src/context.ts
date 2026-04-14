import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'dev-secret-change-me'
);

export async function createContext({ req }: { req: Request }) {
  let user: { userId: number } | null = null;

  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      if (typeof payload.userId === 'number') {
        user = { userId: payload.userId };
      }
    } catch {
      // Invalid or expired token — leave user as null
    }
  }

  return { user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
