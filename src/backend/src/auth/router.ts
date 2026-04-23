import { WorkOS } from '@workos-inc/node';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { SignJWT } from 'jose';
import { db } from '../db';
import { accounts, profiles } from '../db/schema';

let _workos: WorkOS | null = null;
function getWorkOS(): WorkOS {
  if (!_workos) _workos = new WorkOS(process.env.WORKOS_API_KEY!);
  return _workos;
}
const clientId = () => process.env.WORKOS_CLIENT_ID!;
const redirectUri = () => process.env.WORKOS_REDIRECT_URI ?? 'http://localhost:3001/auth/callback';
const frontendUrl = () => process.env.FRONTEND_URL ?? 'http://localhost:5173';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'dev-secret-change-me'
);

async function signToken(accountId: number): Promise<string> {
  return new SignJWT({ accountId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export const authRouter = new Hono()
  .get('/workos', (c) => {
    const authorizationUrl = getWorkOS().userManagement.getAuthorizationUrl({
      clientId: clientId(),
      redirectUri: redirectUri(),
      provider: 'authkit',
    });
    return c.redirect(authorizationUrl);
  })
  .get('/callback', async (c) => {
    const code = c.req.query('code');
    if (!code) {
      return c.redirect(`${frontendUrl()}/login?error=auth_failed`);
    }

    try {
      const { user: workosUser } = await getWorkOS().userManagement.authenticateWithCode({
        clientId: clientId(),
        code,
      });

      const existing = await db
        .select()
        .from(accounts)
        .where(eq(accounts.workosUserId, workosUser.id))
        .limit(1);

      let account = existing[0];

      if (!account) {
        const [created] = await db
          .insert(accounts)
          .values({
            email: workosUser.email,
            workosUserId: workosUser.id,
          })
          .returning();
        account = created;

        const displayName =
          [workosUser.firstName, workosUser.lastName].filter(Boolean).join(' ') || null;

        await db.insert(profiles).values({
          accountId: account.id,
          displayName,
        });
      }

      const token = await signToken(account.id);
      return c.redirect(`${frontendUrl()}/auth/callback?token=${token}`);
    } catch {
      return c.redirect(`${frontendUrl()}/login?error=auth_failed`);
    }
  })
  .post('/logout', async (c) => {
    return c.json({ success: true });
  });
