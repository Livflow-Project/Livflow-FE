import Home from '@/pages/home';
import Store from '@/pages/store';
import StoreId from '@/pages/storeId';
import UserHeader from '@/layout/userHeader';

export const loggedRoutes = [
  {
    element: <UserHeader />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/store',
        element: <Store />,
      },
      {
        path: '/store/:id',
        element: <StoreId />,
      },
    ],
  },
];
