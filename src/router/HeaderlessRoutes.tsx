import { Suspense, lazy } from 'react';

import ErrorPage from '@/pages/status/errorPage';
import LoadingPage from '@/pages/status/loadindPage';
import NotfoundPage from '@/pages/status/notFoundIcon';

const Login = lazy(() => import('@/pages/login/login'));

const LoginHandlerPage = lazy(() => import('@/pages/login/loginHandlerPage'));

export const HeaderlessRoutes = [
  {
    children: [
      {
        path: '*',
        element: <NotfoundPage />,
      },
      {
        path: '/error',
        element: <ErrorPage />,
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/auth/login/callback/kakao',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <LoginHandlerPage />
          </Suspense>
        ),
      },
      {
        path: '/auth/login/callback/google',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <LoginHandlerPage />
          </Suspense>
        ),
      },
      {
        path: '/auth/login/callback/naver',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <LoginHandlerPage />
          </Suspense>
        ),
      },
    ],
  },
];
