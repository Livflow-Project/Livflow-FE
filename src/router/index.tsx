import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { HeaderlessRoutes } from './HeaderlessRoutes';
import ProtectedRoute from './components/ProtectedRoute';
import UserHeader from '@/layout/userHeader';
import { commonRoutes } from './commonRoutes';
import { loggedRoutes } from './loggedRoutes';
import { useAuth } from '@/contexts/AuthContextProvider';

const Router = () => {
  const { isLoggedIn } = useAuth();

  const router = createBrowserRouter([
    ...(isLoggedIn ? [] : commonRoutes),

    ...HeaderlessRoutes,

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
