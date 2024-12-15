// import Header from '@/layout/header';
import Login from '@/pages/login/login';
import LoginHandlerPage from '@/pages/login/loginHandlerPage';

export const HeaderlessRoutes = [
  {
    children: [
      // {
      //   path: '*',
      //   element: <NotfoundPage />,
      // },
      // {
      //   path: '/error',
      //   element: <ErrorPage />,
      // },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/auth/login/callback/kakao',
        element: (
          // <Suspense fallback={<LoadingPage />}>
          <LoginHandlerPage />
          // </Suspense>
        ),
      },
      {
        path: '/auth/login/callback/google',
        element: (
          // <Suspense fallback={<LoadingPage />}>
          <LoginHandlerPage />
          // </Suspense>
        ),
      },
      {
        path: '/auth/login/callback/naver',
        element: (
          // <Suspense fallback={<LoadingPage />}>
          <LoginHandlerPage />
          // </Suspense>
        ),
      },
    ],
  },
];
