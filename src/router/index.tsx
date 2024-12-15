import { HeaderlessRoutes } from './HeaderlessRoutes';
// import { AuthProvider } from '@/context/AuthContextProvider';
import { RouterProvider } from 'react-router';
import { commonRoutes } from './commonRoutes';
import { createBrowserRouter } from 'react-router-dom';

const Router = () => {
  const router = createBrowserRouter([
    ...commonRoutes, // 기본 헤더 라우트
    ...HeaderlessRoutes, // 헤더 없는 라우드
  ]);

  return (
    // <AuthProvider>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
    // </AuthProvider>
  );
};
export default Router;
