import { useEffect, useState } from 'react';

import ErrorPage from './status/errorPage';
import LoadingPage from './status/loadindPage';
import MainCalender from '@/components/storeId/ledger/calendar/MainCalender';
import MainIngredient from '@/components/storeId/ingredient/MainIngredient';
import StoreInfo from '@/components/storeId/storeIdInfo/StoreInfo';
import { twMerge } from 'tailwind-merge';
import { useParams } from 'react-router-dom';
import { useStore } from '@/contexts/StoreContext';
import { useStoreQuery } from '@/api/store/store.hooks';

const NAV_ITEMS = [
  { id: 1, title: '가계부', component: MainCalender },
  { id: 2, title: '재료', component: MainIngredient },
  { id: 3, title: '원가계산', component: null },
];

const StoreId = () => {
  const [activeTab, setActiveTab] = useState(1);

  const { id } = useParams<{ id: string }>();

  const { setStoreInfo } = useStore();

  const { useGetStore } = useStoreQuery();
  const { data, isLoading, isError, error, refetch } = useGetStore(id || '0');

  // 최초 마운트 시에만 실행
  useEffect(() => {
    // 초기 데이터 설정을 한 번만 수행
    const initializeStoreInfo = () => {
      if (data) {
        setStoreInfo({
          name: data.name,
          address: data.address,
        });
      }
    };

    initializeStoreInfo();
  }, []);

  if (isLoading && !data) {
    return <LoadingPage />;
  }

  if (isError || !id || !data) {
    return <ErrorPage error={error as Error} resetError={() => refetch()} />;
  }

  const renderComponent = () => {
    const activeItem = NAV_ITEMS.find((item) => item.id === activeTab);
    if (activeItem?.component) {
      const Component = activeItem.component;
      return <Component storeId={id} />;
    }
    return null;
  };

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
