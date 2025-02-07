import { Suspense, lazy } from 'react';

import Header from '@/layout/header';
import LoadingPage from '@/pages/status/loadindPage';

const Home = lazy(() => import('@/pages/home'));

export const commonRoutes = [
  {
    element: <Header />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Home />
          </Suspense>
        ),
      },
    ],
  },
];
