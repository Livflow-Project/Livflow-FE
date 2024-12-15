import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App.tsx';
import { createRoot } from 'react-dom/client';

const queryClient = new QueryClient();

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser');
  worker.start();
}

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
