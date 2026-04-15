import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { db } from '../db';
import { accounts, profiles } from '../db/schema';
import { authMiddleware } from '../middleware/auth';

export const accountsRouter = new Hono()
  .get('/profile', authMiddleware, async (c) => {
    const accountId = c.get('accountId');

    const [row] = await db
      .select({
        id: accounts.id,
        email: accounts.email,
        displayName: profiles.displayName,
        avatarUrl: profiles.avatarUrl,
        createdAt: accounts.createdAt,
      })
      .from(accounts)
      .leftJoin(profiles, eq(profiles.accountId, accounts.id))
      .where(eq(accounts.id, accountId))
      .limit(1);

    if (!row) {
      return c.json({ message: 'Account not found' }, 404);
    }

    return c.json(row);
  });
