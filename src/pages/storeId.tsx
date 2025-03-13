import { NavLink, Outlet, useParams } from 'react-router-dom';
import { Suspense, useEffect, useMemo, useState } from 'react';

import ContentLoadingIndicator from '@/components/common/ContentLoadingIndicator';
import ErrorPage from './status/errorPage';
import LoadingPage from './status/loadindPage';
import StoreInfo from '@/components/storeId/storeIdInfo/StoreInfo';
import { toast } from 'react-toastify';
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
  const [prevId, setPrevId] = useState(id);
  const { storeInfo, setStoreInfo } = useStore();
  const { useGetStore } = useStoreQuery();

  // 쿼리 실행 조건 계산
  const shouldFetch = useMemo(
    () => !storeInfo || storeInfo.id !== id || prevId !== id,
    [storeInfo, id, prevId]
  );

  const { data, isError, error, isLoading, refetch } = useGetStore(id || '0', {
    // shouldFetch가 true일 때만 쿼리 실행
    enabled: shouldFetch,
  });

  // ID 변경 감지
  useEffect(() => {
    if (id !== prevId) {
      setPrevId(id);
    }
  }, [id, prevId]);

  // 스토어 정보 설정
  useEffect(() => {
    if (data && shouldFetch) {
      const newStoreInfo = {
        id,
        name: data.name,
        address: data.address,
      };
      setStoreInfo(newStoreInfo);
    }
  }, [data, id, setStoreInfo, shouldFetch]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage error={error as Error} resetError={() => refetch()} />;
  }

  return (
    <div className='flex h-[calc(100vh-75px)] flex-col justify-between p-[45px]'>
      <ul className='flex h-[70px] flex-col items-end justify-between'>
        <StoreInfo />
      </ul>

      <div className='h-[calc(100%-70px)]'>
        <div className='flex items-center justify-start gap-3'>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={`/store/${id}/${item.path}`}
              onClick={() => toast.dismiss()}
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
            <Outlet context={{ storeId: id }} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default StoreId;
