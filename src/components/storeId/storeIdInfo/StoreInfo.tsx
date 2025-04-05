import ErrorPage from '@/pages/status/errorPage';
import { useStore } from '@/contexts/StoreContext';

const StoreInfo = () => {
  const { storeInfo } = useStore();

  if (!storeInfo) return <ErrorPage />;

  return (
    <ul className='flex flex-col items-end justify-between gap-4'>
      <li className='text-xl font-semibold text-main'>{storeInfo.name}</li>
      <li className='font-medium text-caption'>
        {storeInfo.address || '주소 정보 없음'}
      </li>
    </ul>
  );
};

StoreInfo.displayName = 'StoreInfo';

export default StoreInfo;
