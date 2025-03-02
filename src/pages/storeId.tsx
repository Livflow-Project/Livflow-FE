import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Suspense, useEffect, useRef } from 'react';

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
  const location = useLocation();
  const navigate = useNavigate();

  // 스토어 관련 훅
  const { setStoreInfo } = useStore();
  const { useGetStore } = useStoreQuery();
  const { data, isError, error, refetch } = useGetStore(id || '0');
  const isInitialized = useRef(false);

  // 현재 활성화된 탭 확인
  const currentPath = location.pathname.split('/').pop() || 'ledger';

  // 스토어 정보 설정
  useEffect(() => {
    if (data && !isInitialized.current) {
      setStoreInfo({
        id: id,
        name: data.name,
        address: data.address,
      });
      isInitialized.current = true;
    }
  }, [data, setStoreInfo, id]);

  if (isError || !id) {
    return <ErrorPage error={error as Error} resetError={() => refetch()} />;
  }

  return (
    <div className='flex h-[calc(100vh-75px)] flex-col justify-between p-[45px]'>
      <StoreInfo />

      <div className='h-[calc(100%-70px)]'>
        <div className='flex items-center justify-start gap-3'>
          {NAV_ITEMS.map((item) => (
            <nav
              key={item.path}
              onClick={() => navigate(`/store/${id}/${item.path}`)}
              className={twMerge(
                'flex h-[55px] w-[135px] cursor-pointer items-center justify-center rounded-tl-[10px] rounded-tr-[10px]',
                currentPath === item.path
                  ? 'bg-background'
                  : 'bg-background/50 hover:bg-background'
              )}
            >
              <span
                className={twMerge(
                  'text-[22px] font-normal',
                  currentPath === item.path
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
          <Suspense fallback={<ContentLoadingIndicator />}>
            <Outlet context={{ storeId: id }} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default StoreId;
