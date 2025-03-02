import { Suspense, lazy } from 'react';

import LoadingPage from '@/pages/status/loadindPage';
import UserHeader from '@/layout/userHeader';

const Home = lazy(() => import('@/pages/home'));
const Store = lazy(() => import('@/pages/store'));
const StoreId = lazy(() => import('@/pages/storeId'));

const MainCalender = lazy(
  () => import('@/components/storeId/ledger/calendar/MainCalender')
);
const MainIngredient = lazy(
  () => import('@/components/storeId/ingredient/MainIngredient')
);
const MainRecipe = lazy(
  () => import('@/components/storeId/costCalculator/MainRecipe')
);

export const loggedRoutes = [
  {
    element: <UserHeader />,
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
        path: '/store',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Store />
          </Suspense>
        ),
      },
      {
        path: '/store/:id',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <StoreId />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: <MainCalender />,
          },
          {
            path: 'ledger',
            element: <MainCalender />,
          },
          {
            path: 'ingredient',
            element: <MainIngredient />,
          },
          {
            path: 'recipe',
            element: <MainRecipe />,
          },
        ],
      },
    ],
  },
];
