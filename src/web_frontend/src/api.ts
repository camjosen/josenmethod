import { useAuth } from '@workos-inc/authkit-react';
import { hc } from 'hono/client';
import { useMemo } from 'react';
import type { AppType } from '@backend/app';

const BASE_URL = 'http://localhost:3001';

export function useApiClient() {
  const { getAccessToken } = useAuth();
  return useMemo(
    () =>
      hc<AppType>(BASE_URL, {
        fetch: async (input, init) => {
          const token = await getAccessToken();
          const headers = new Headers(init?.headers);
          if (token) headers.set('Authorization', `Bearer ${token}`);
          return fetch(input, { ...init, headers });
        },
      }),
    [getAccessToken]
  );
}

export type ApiClient = ReturnType<typeof useApiClient>;
