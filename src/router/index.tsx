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

  const router = createBrowserRouter([
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
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
