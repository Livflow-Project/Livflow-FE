import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App.tsx';
import { createRoot } from 'react-dom/client';

const queryClient = new QueryClient();

// async function enableMocking() {
//   if (process.env.NODE_ENV === 'development') {
//     const { worker } = await import('./mocks/browser');
//     return worker.start({
//       onUnhandledRequest: 'bypass', // 처리되지 않은 요청 무시
//     });
//   }
// }

// MSW 초기화 후 앱 렌더링
// enableMocking().then(() => {
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
// });
