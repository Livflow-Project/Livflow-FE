import ErrorPage from '@/pages/status/errorPage';
import { useStore } from '@/contexts/StoreContext';

const StoreInfo = () => {
  const { storeInfo } = useStore();

  if (!storeInfo) return <ErrorPage />;

  return (
    <>
      <li className='text-2xl font-semibold text-main'>{storeInfo.name}</li>
      <li className='text-[15px] font-medium text-main'>
        {storeInfo.address || '주소 정보 없음'}
      </li>
    </>
  );
};

StoreInfo.displayName = 'StoreInfo';

export default StoreInfo;
