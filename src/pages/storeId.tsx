import { lazy, useCallback, useEffect, useRef, useState } from 'react';

import ErrorPage from './status/errorPage';
import LoadingPage from './status/loadindPage';
import StoreInfo from '@/components/storeId/storeIdInfo/StoreInfo';
import { twMerge } from 'tailwind-merge';
import { useParams } from 'react-router-dom';
import { useStore } from '@/contexts/StoreContext';
import { useStoreQuery } from '@/api/store/store.hooks';

const MainCalender = lazy(
  () => import('@/components/storeId/ledger/calendar/MainCalender')
);

const MainIngredient = lazy(
  () => import('@/components/storeId/ingredient/MainIngredient')
);

const MainCostCalculator = lazy(
  () => import('@/components/storeId/costCalculator/MainCostCalculator')
);

const NAV_ITEMS = [
  { id: 1, title: '가계부', component: MainCalender },
  { id: 2, title: '재료', component: MainIngredient },
  { id: 3, title: '원가계산', component: MainCostCalculator },
];

const StoreId = () => {
  const [activeTab, setActiveTab] = useState(1);

  const { id } = useParams<{ id: string }>();
  const { setStoreInfo } = useStore();
  const { useGetStore } = useStoreQuery();
  const { data, isLoading, isError, error, refetch } = useGetStore(id || '0');
  const isInitialized = useRef(false);

  const renderComponent = useCallback(() => {
    if (!id) return <LoadingPage />;

    const activeItem = NAV_ITEMS.find((item) => item.id === activeTab);
    if (activeItem?.component) {
      const Component = activeItem.component;
      return <Component storeId={id} />;
    }
    return null;
  }, [activeTab, id]);

  useEffect(() => {
    if (data && !isInitialized.current) {
      setStoreInfo({
        name: data.name,
        address: data.address,
      });
      isInitialized.current = true;
    }
  }, [data]);

  if (isLoading && !data) return <LoadingPage />;

  if (isError || !id || !data) {
    return <ErrorPage error={error as Error} resetError={() => refetch()} />;
  }

  return (
    <div className='flex h-[calc(100vh-75px)] flex-col justify-between p-[45px]'>
      <StoreInfo />

      <div className='h-[calc(100%-70px)]'>
        <div className='flex items-center justify-start gap-3'>
          {NAV_ITEMS.map((item) => (
            <nav
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={twMerge(
                'flex h-[55px] w-[135px] cursor-pointer items-center justify-center rounded-tl-[10px] rounded-tr-[10px]',
                activeTab === item.id
                  ? 'bg-background'
                  : 'bg-background/50 hover:bg-background'
              )}
            >
              <span
                className={twMerge(
                  'text-[22px] font-normal',
                  activeTab === item.id
                    ? 'font-semibold text-main'
                    : 'text-main/50'
                )}
              >
                {item.title}
              </span>
            </nav>
          ))}
        </div>

        <div className='h-[calc(100%-55px)] w-full bg-background'>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default StoreId;
