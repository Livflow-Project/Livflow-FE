import { memo } from 'react';

type StoreInfoProps = {
  name: string;
  address?: string;
};

const StoreInfo = memo(({ name, address }: StoreInfoProps) => {
  return (
    <ul className='flex flex-col items-end gap-4'>
      <li className='text-2xl font-semibold text-main'>
        {name || '이름 정보 없음'}
      </li>
      <li className='text-[15px] font-medium text-main'>
        {address || '주소 정보 없음'}
      </li>
    </ul>
  );
});

StoreInfo.displayName = 'StoreInfo';

export default StoreInfo;
