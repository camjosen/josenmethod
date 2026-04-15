import { hc } from 'hono/client';
import type { AppType } from '@backend/app';
import { auth } from './auth';

export const client = hc<AppType>('http://localhost:3001', {
  headers(): Record<string, string> {
    const token = auth.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
});
