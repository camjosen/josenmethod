import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

function Root() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
