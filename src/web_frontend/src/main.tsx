import { AuthKitProvider } from '@workos-inc/authkit-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const clientId = import.meta.env.VITE_WORKOS_CLIENT_ID;

if (!clientId) {
  throw new Error('VITE_WORKOS_CLIENT_ID is required');
}

function Root() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  }));

  return (
    <AuthKitProvider clientId={clientId}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthKitProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
