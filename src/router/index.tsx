import { HeaderlessRoutes } from './HeaderlessRoutes';
import ProtectedRoute from './components/ProtectedRoute';
import { RouterProvider } from 'react-router';
import UserHeader from '@/layout/userHeader';
import { commonRoutes } from './commonRoutes';
import { createBrowserRouter } from 'react-router-dom';
import { loggedRoutes } from './loggedRoutes';
import { useAuth } from '@/contexts/AuthContextProvider';

const Router = () => {
  const { isLoggedIn } = useAuth();

  const router = createBrowserRouter(
    [
      // 비로그인 상태의 라우트
      ...(isLoggedIn ? [] : commonRoutes),

      // 헤더가 없는 라우트
      ...HeaderlessRoutes,

      // 로그인 필요한 라우트
      {
        element: (
          <ProtectedRoute>
            <UserHeader />
          </ProtectedRoute>
        ),
        children: loggedRoutes[0].children,
      },
    ],
    {
      // React Router v7 future 플래그 추가
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );

  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
};

export default Router;
