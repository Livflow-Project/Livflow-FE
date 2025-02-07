import { Link, useParams } from 'react-router-dom';

import LoadingPage from './status/loadindPage';
import MainCalender from '@/components/storeId/ledger/calendar/MainCalender';
import MainIngredient from '@/components/storeId/ingredient/MainIngredient';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import { useStoreQuery } from '@/api/store/store.hooks';

const NAV_ITEMS = [
  { id: 1, title: '가계부', component: MainCalender },
  { id: 2, title: '재료', component: MainIngredient },
  { id: 3, title: '원가계산', component: null },
];

const StoreId = () => {
  const [activeTab, setActiveTab] = useState(1);

  const { id } = useParams<{ id: string }>();
  const { useGetStore } = useStoreQuery();

  const { data, isLoading, isError } = useGetStore(id || '0');

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || !id || !data) {
    return (
      <div className='flex h-[calc(100vh-75px)] items-center justify-center text-2xl font-semibold text-main'>
        상점의 가계부 정보를 찾을 수 없습니다. 이전 페이지로 이동해주세요.
      </div>
    );
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
      <Link to='/store'>
        <ul className='flex flex-col items-end gap-4'>
          <li className='text-2xl font-semibold text-main'>
            {data.name || '이름 정보 없음'}
          </li>

          <li className='text-[15px] font-medium text-main'>
            {data?.address || '주소 정보 없음'}
          </li>
        </ul>
      </Link>

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
