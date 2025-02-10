import { HeaderlessRoutes } from './HeaderlessRoutes';
import ProtectedRoute from './components/ProtectedRoute';
import { RouterProvider } from 'react-router';
import UserHeader from '@/layout/userHeader';
import { commonRoutes } from './commonRoutes';
import { createBrowserRouter } from 'react-router-dom';
import { loggedRoutes } from './loggedRoutes';

const Router = () => {
  const router = createBrowserRouter([
    // 기본 라우트
    ...commonRoutes,

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
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
