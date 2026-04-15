import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { SignJWT } from 'jose';
import { z } from 'zod';
import { db } from '../db';
import { users } from '../db/schema';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'dev-secret-change-me'
);

async function signToken(userId: number): Promise<string> {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authRouter = new Hono()
  .post('/register', zValidator('json', registerSchema), async (c) => {
    const input = c.req.valid('json');

    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, input.email))
      .limit(1);

    if (existing[0]) {
      return c.json({ message: 'Email already in use' }, 409);
    }

    const passwordHash = await Bun.password.hash(input.password);
    const [user] = await db
      .insert(users)
      .values({ email: input.email, passwordHash, name: input.name ?? null })
      .returning({ id: users.id, email: users.email, name: users.name });

    const token = await signToken(user.id);
    return c.json({ token, user });
  })
  .post('/login', zValidator('json', loginSchema), async (c) => {
    const input = c.req.valid('json');

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, input.email))
      .limit(1);

    if (!user) {
      return c.json({ message: 'Invalid credentials' }, 401);
    }

    const valid = await Bun.password.verify(input.password, user.passwordHash);
    if (!valid) {
      return c.json({ message: 'Invalid credentials' }, 401);
    }

    const token = await signToken(user.id);
    return c.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  })
  .post('/logout', async (c) => {
    // Token invalidation is handled client-side (clear from localStorage).
    // Add a token denylist here if you need server-side invalidation.
    return c.json({ success: true });
  });
