import { WorkOS } from '@workos-inc/node';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { SignJWT } from 'jose';
import { db } from '../db';
import { users } from '../db/schema';

const workos = new WorkOS(process.env.WORKOS_API_KEY!);
const clientId = process.env.WORKOS_CLIENT_ID!;
const redirectUri = process.env.WORKOS_REDIRECT_URI ?? 'http://localhost:3001/auth/callback';
const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'dev-secret-change-me'
);

async function signToken(userId: number): Promise<string> {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export const authRouter = new Hono()
  .get('/workos', (c) => {
    const authorizationUrl = workos.userManagement.getAuthorizationUrl({
      clientId,
      redirectUri,
      provider: 'authkit',
    });
    return c.redirect(authorizationUrl);
  })
  .get('/callback', async (c) => {
    const code = c.req.query('code');
    if (!code) {
      return c.redirect(`${frontendUrl}/login?error=auth_failed`);
    }

    try {
      const { user: workosUser } = await workos.userManagement.authenticateWithCode({
        clientId,
        code,
      });

      const existing = await db
        .select()
        .from(users)
        .where(eq(users.workosUserId, workosUser.id))
        .limit(1);

      let localUser = existing[0];

      if (!localUser) {
        const [created] = await db
          .insert(users)
          .values({
            email: workosUser.email,
            workosUserId: workosUser.id,
            name:
              [workosUser.firstName, workosUser.lastName].filter(Boolean).join(' ') || null,
          })
          .returning();
        localUser = created;
      }

      const token = await signToken(localUser.id);
      return c.redirect(`${frontendUrl}/auth/callback?token=${token}`);
    } catch {
      return c.redirect(`${frontendUrl}/login?error=auth_failed`);
    }
  })
  .post('/logout', async (c) => {
    return c.json({ success: true });
  });
