import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { SignJWT } from 'jose';
import { z } from 'zod';
import { db } from '../db';
import { users } from '../db/schema';
import { publicProcedure, router } from '../trpc';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'dev-secret-change-me'
);

async function signToken(userId: number): Promise<string> {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        name: z.string().min(1).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const existing = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, input.email))
        .limit(1);

      if (existing[0]) {
        throw new TRPCError({ code: 'CONFLICT', message: 'Email already in use' });
      }

      const passwordHash = await Bun.password.hash(input.password);
      const [user] = await db
        .insert(users)
        .values({ email: input.email, passwordHash, name: input.name ?? null })
        .returning({ id: users.id, email: users.email, name: users.name });

      const token = await signToken(user.id);
      return { token, user };
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email))
        .limit(1);

      if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentials' });
      }

      const valid = await Bun.password.verify(input.password, user.passwordHash);
      if (!valid) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentials' });
      }

      const token = await signToken(user.id);
      return { token, user: { id: user.id, email: user.email, name: user.name } };
    }),

  logout: publicProcedure.mutation(() => {
    // Token invalidation is handled client-side (clear from localStorage).
    // Add a token denylist here if you need server-side invalidation.
    return { success: true };
  }),
});
