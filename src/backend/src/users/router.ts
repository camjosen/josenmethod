import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { db } from '../db';
import { users } from '../db/schema';
import { authMiddleware } from '../middleware/auth';

export const usersRouter = new Hono()
  .get('/profile', authMiddleware, async (c) => {
    const userId = c.get('userId');

    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      return c.json({ message: 'User not found' }, 404);
    }

    return c.json(user);
  });
