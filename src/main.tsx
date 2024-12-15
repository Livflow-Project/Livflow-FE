import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App.tsx';
import { createRoot } from 'react-dom/client';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
