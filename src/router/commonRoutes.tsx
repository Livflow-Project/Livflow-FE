import Header from '@/layout/header';
import Home from '@/pages/home';
import Store from '@/pages/store';
import StoreId from '@/pages/storeId';

export const commonRoutes = [
  {
    element: <Header />,
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
