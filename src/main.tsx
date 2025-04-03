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

// 폰트 로딩 처리
document.addEventListener('DOMContentLoaded', function () {
  const fontLink = document.getElementById(
    'pretendard-font'
  ) as HTMLLinkElement;
  if (fontLink) {
    fontLink.rel = 'stylesheet';
  }
});
