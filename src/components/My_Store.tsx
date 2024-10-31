import { useRef, useState } from 'react';

import Map_Icon from '../assets/Map_Icon.svg';
import PieChart from './PieChart';
import Store_Icon from '../assets/Store_Icon.svg';
import useUsers_Store from '../Store/useUsers_Store';

interface MyStoreProps {
  id: number;
  name: string;
  address?: string;
}

const My_Store: React.FC<MyStoreProps> = ({
  id,
  name: initialName,
  address: initialAddress,
}) => {
  const [name, setName] = useState(initialName);
  const [address, setAddress] = useState(initialAddress);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const updateStore = useUsers_Store((state) => state.updateStore);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  const handleUpdate = (type: 'name' | 'address') => {
    const updatedData = { id, name, address };

    if (type === 'name' && name !== initialName) {
      updateStore(updatedData);
    } else if (type === 'address' && address !== initialAddress) {
      updateStore(updatedData);
    }

    // 편집 모드 종료
    setIsEditingName(false);
    setIsEditingAddress(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: 'name' | 'address'
  ) => {
    if (e.key === 'Enter') {
      handleUpdate(type);
    }
  };

  const handleEditButtonClick = (type: 'name' | 'address') => {
    if (type === 'name') {
      setIsEditingName(true);
      setTimeout(() => nameInputRef.current?.focus(), 0);
    } else if (type === 'address') {
      setIsEditingAddress(true);
      setTimeout(() => addressInputRef.current?.focus(), 0);
    }
  };

  return (
    <div className='store_box'>
      <div className='border-underline border-b border-opacity-20 p-[20px]'>
        <ul className='flex flex-col gap-6'>
          <li className='flex items-center justify-between'>
            <img src={Store_Icon} alt='상점 아이콘' className='w-[30px]' />
            {isEditingName ? (
              <input
                ref={nameInputRef}
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'name')}
                className='text-main border-b border-gray-300 text-center text-[17px] font-semibold outline-none'
              />
            ) : (
              <span className='text-main w-[200px] truncate text-center text-[17px] font-semibold'>
                {name}
              </span>
            )}
            <button
              className='text-button/50 hover:text-button_hover text-[13px] outline-none hover:font-bold'
              onClick={() => handleEditButtonClick('name')}
            >
              {isEditingName ? '완료' : '수정'}
            </button>
          </li>
          <li className='flex items-center justify-between'>
            <img src={Map_Icon} alt='주소 아이콘' className='w-[30px]' />
            {isEditingAddress ? (
              <input
                ref={addressInputRef}
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'address')}
                className='text-main border-b border-gray-300 text-center text-[17px] font-semibold outline-none'
              />
            ) : (
              <span className='text-main w-[200px] truncate text-center text-[17px] font-semibold'>
                {address}
              </span>
            )}
            <button
              className='text-button/50 hover:text-button_hover text-[13px] outline-none hover:font-bold'
              onClick={() => handleEditButtonClick('address')}
            >
              {isEditingAddress ? '완료' : '수정'}
            </button>
          </li>
        </ul>
      </div>
      <div
        className='flex flex-col items-center justify-between p-[20px]'
        style={{ height: 'calc(100% - 128px)' }}
      >
        <div className='flex w-[100%] justify-between'>
          <button className='text-primary/50 hover:text-primary text-xl font-semibold'>
            지출
          </button>
          <button className='text-primary/50 hover:text-primary text-xl font-semibold'>
            수입
          </button>
        </div>
        <div className='h-full max-h-[270px]'>
          <PieChart />
        </div>
        <button className='choice_button'>선택</button>
      </div>
    </div>
  );
};

export default My_Store;
