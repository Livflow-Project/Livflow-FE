import { useStore } from '@/contexts/StoreContext';

const StoreInfo = () => {
  const { storeInfo } = useStore();

  if (!storeInfo) return null;

  return (
    <ul className='flex h-[70px] flex-col items-end justify-between'>
      <li className='text-2xl font-semibold text-main'>{storeInfo.name}</li>
      <li className='text-[15px] font-medium text-main'>
        {storeInfo.address || '주소 정보 없음'}
      </li>
    </ul>
  );
};

StoreInfo.displayName = 'StoreInfo';

export default StoreInfo;
