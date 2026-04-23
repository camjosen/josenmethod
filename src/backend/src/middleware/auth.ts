import { WorkOS } from '@workos-inc/node';
import { eq } from 'drizzle-orm';
import { createMiddleware } from 'hono/factory';
import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey } from 'jose';
import { db } from '../db';
import { accounts, profiles } from '../db/schema';

let _jwks: JWTVerifyGetKey | null = null;
function getJwks(): JWTVerifyGetKey {
  if (!_jwks) {
    _jwks = createRemoteJWKSet(
      new URL(`https://api.workos.com/sso/jwks/${process.env.WORKOS_CLIENT_ID!}`)
    );
  }
  return _jwks;
}

let _workos: WorkOS | null = null;
function getWorkOS(): WorkOS {
  if (!_workos) _workos = new WorkOS(process.env.WORKOS_API_KEY!);
  return _workos;
}

export const authMiddleware = createMiddleware<{
  Variables: { accountId: number; workosUserId: string };
}>(async (c, next) => {
  const authHeader = c.req.header('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  let workosUserId: string;
  try {
    const { payload } = await jwtVerify(authHeader.slice(7), getJwks(), {
      issuer: 'https://api.workos.com',
    });
    if (typeof payload.sub !== 'string') {
      return c.json({ message: 'Unauthorized' }, 401);
    }
    workosUserId = payload.sub;
  } catch {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  const accountId = await ensureAccount(workosUserId);
  c.set('accountId', accountId);
  c.set('workosUserId', workosUserId);
  await next();
});

async function ensureAccount(workosUserId: string): Promise<number> {
  const existing = await db
    .select({ id: accounts.id })
    .from(accounts)
    .where(eq(accounts.workosUserId, workosUserId))
    .limit(1);
  if (existing[0]) return existing[0].id;

  const user = await getWorkOS().userManagement.getUser(workosUserId);
  const [created] = await db
    .insert(accounts)
    .values({ email: user.email, workosUserId: user.id })
    .returning({ id: accounts.id });

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(' ') || null;
  await db.insert(profiles).values({ accountId: created.id, displayName });

  return created.id;
}
