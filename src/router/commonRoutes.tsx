import { Suspense, lazy } from 'react';

import Header from '@/layout/header';
import LoadingPage from '@/pages/status/loadindPage';
import PrivacyPolicy from '@/pages/policies/privacyPolicy';
import Terms from '@/pages/policies/terms';

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
      {
        path: '/privacy',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: '/terms',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Terms />
          </Suspense>
        ),
      },
    ],
  },
];
