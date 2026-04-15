import { hc } from 'hono/client';
import type { AppType } from '@backend/app';

// Create a base client without dynamic auth headers
// For authenticated requests, pass headers explicitly with the access token
export const client = hc<AppType>('http://localhost:3001');

// Helper to create headers with access token
export function authHeaders(accessToken: string): Record<string, string> {
  return { Authorization: `Bearer ${accessToken}` };
}
