import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../db/schema';
import { protectedProcedure, router } from '../trpc';

export const usersRouter = router({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, ctx.user.userId))
      .limit(1);

    if (!user) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
    }

    return user;
  }),
});
