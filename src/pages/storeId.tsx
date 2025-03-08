import { NavLink, Outlet, useParams } from 'react-router-dom';
import { Suspense, useEffect } from 'react';

import ContentLoadingIndicator from '@/components/common/ContentLoadingIndicator';
import ErrorPage from './status/errorPage';
import StoreInfo from '@/components/storeId/storeIdInfo/StoreInfo';
import { twMerge } from 'tailwind-merge';
import { useStore } from '@/contexts/StoreContext';
import { useStoreQuery } from '@/api/store/store.hooks';

// 네비게이션 아이템 정의
const NAV_ITEMS = [
  { title: '가계부', path: 'ledger' },
  { title: '재료', path: 'ingredient' },
  { title: '원가계산', path: 'recipe' },
];

const StoreId = () => {
  const { id } = useParams<{ id: string }>();

  // 스토어 관련 훅
  const { storeInfo, setStoreInfo } = useStore();
  const { useGetStore } = useStoreQuery();

  const { data, isError, error, refetch } = useGetStore(id || '0');

  // 스토어 정보 설정
  useEffect(() => {
    if (data) {
      // 현재 ID와 새 데이터의 ID가 다를 때만 업데이트
      if (!storeInfo || storeInfo.id !== id) {
        setStoreInfo({
          id: id,
          name: data.name,
          address: data.address,
        });
      }
    }
  }, [data, storeInfo, setStoreInfo, id]);

  if (isError) {
    return <ErrorPage error={error as Error} resetError={() => refetch()} />;
  }

  return (
    <div className='flex h-[calc(100vh-75px)] flex-col justify-between p-[45px]'>
      <StoreInfo />

      <div className='h-[calc(100%-70px)]'>
        <div className='flex items-center justify-start gap-3'>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={`/store/${id}/${item.path}`}
              className={({ isActive }) =>
                twMerge(
                  'group flex h-[55px] w-[135px] cursor-pointer items-center justify-center rounded-tl-[10px] rounded-tr-[10px]',
                  isActive
                    ? 'bg-background'
                    : 'bg-background/50 hover:bg-background'
                )
              }
            >
              {({ isActive }) => (
                <span
                  className={twMerge(
                    'text-[22px] font-normal group-hover:font-semibold',
                    isActive ? 'font-semibold text-main' : 'text-main/50'
                  )}
                >
                  {item.title}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className='h-[calc(100%-55px)] w-full rounded-bl-lg rounded-br-lg rounded-tr-lg bg-background'>
          <Suspense fallback={<ContentLoadingIndicator />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default StoreId;
