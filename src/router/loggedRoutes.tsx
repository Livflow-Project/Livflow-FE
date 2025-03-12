import { Suspense, lazy } from 'react';

import LoadingPage from '@/pages/status/loadindPage';
import PrivacyPolicy from '@/pages/policies/privacyPolicy';
import Terms from '@/pages/policies/terms';
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
const RecipeDetail = lazy(
  () =>
    import('@/components/storeId/costCalculator/components/recipe/RecipeDetail')
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
        path: '/privacy',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: '/terms',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Terms />
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
          {
            path: 'recipe/:recipeId',
            element: <RecipeDetail />,
          },
        ],
      },
    ],
  },
];
