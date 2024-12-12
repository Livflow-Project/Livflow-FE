import { mapIcon, storeIcon } from '@/assets/assets';
import { useRef, useState } from 'react';

import UseChart from './UseChart';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';
import useUsersStore from '@/stores/useUsersStore';

interface MyStoreProps {
  id: number;
  name: string;
  address?: string;
  isDeleteMode: boolean;
}

const MyStore = ({
  id,
  name: initialName,
  address: initialAddress,
  isDeleteMode,
}: MyStoreProps) => {
  const [name, setName] = useState(initialName);
  const [address, setAddress] = useState(initialAddress);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const updateStore = useUsersStore((state: any) => state.updateStore);
  const deleteStore = useUsersStore((state: any) => state.deleteStore);

  const navigate = useNavigate();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  const handleUpdate = (type: 'name' | 'address') => {
    const updatedData = { id, name, address };

    if (type === 'name' && name !== initialName) {
      updateStore({ ...updatedData, address: initialAddress });
    } else if (type === 'address' && address !== initialAddress) {
      updateStore({ ...updatedData, name: initialName });
    }

    if (type === 'name') {
      setIsEditingName(false);
    } else if (type === 'address') {
      setIsEditingAddress(false);
    }
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
      requestAnimationFrame(() => nameInputRef.current?.focus());
    } else if (type === 'address') {
      setIsEditingAddress(true);
      requestAnimationFrame(() => addressInputRef.current?.focus());
    }
  };

  const handleDelete = () => {
    deleteStore(id);
  };

  const handleSelect = () => {
    navigate(`/store/${id}`);
  };

  return (
    <div className='store_box'>
      <div className='border-b border-underline border-opacity-20 p-[20px]'>
        <ul className='flex flex-col gap-6'>
          <li className='flex items-center justify-between'>
            <img src={storeIcon} alt='상점 아이콘' className='w-[30px]' />
            {isEditingName ? (
              <input
                ref={nameInputRef}
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'name')}
                className='border-b border-gray-300 text-center text-[17px] font-semibold text-main outline-none'
              />
            ) : (
              <span className='w-[200px] truncate text-center text-[17px] font-semibold text-main'>
                {name}
              </span>
            )}
            <button
              className={twMerge(
                'text-[13px] outline-none hover:font-bold',
                isDeleteMode ? 'no_hover' : 'soft_TcolorSet'
              )}
              onClick={() => {
                if (isEditingName) handleUpdate('name');
                else handleEditButtonClick('name');
              }}
              disabled={isDeleteMode}
            >
              {isEditingName ? '완료' : '수정'}
            </button>
          </li>
          <li className='flex items-center justify-between'>
            <img src={mapIcon} alt='주소 아이콘' className='w-[30px]' />
            {isEditingAddress ? (
              <input
                ref={addressInputRef}
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'address')}
                className='border-b border-gray-300 text-center text-[17px] font-semibold text-main outline-none'
              />
            ) : (
              <span className='w-[200px] truncate text-center text-[17px] font-semibold text-main'>
                {address}
              </span>
            )}
            <button
              className={twMerge(
                'text-[13px] outline-none hover:font-bold',
                isDeleteMode ? 'no_hover' : 'soft_TcolorSet'
              )}
              onClick={() => {
                if (isEditingAddress) handleUpdate('address');
                else handleEditButtonClick('address');
              }}
              disabled={isDeleteMode}
            >
              {isEditingAddress ? '완료' : '수정'}
            </button>
          </li>
        </ul>
      </div>
      <div className='flex h-[calc(100%-128px)] flex-col items-center justify-between p-[20px]'>
        <UseChart isDeleteMode={isDeleteMode} id={id} />
        <button
          className={twMerge(isDeleteMode ? 'delete_button' : 'choice_button')}
          onClick={isDeleteMode ? handleDelete : handleSelect}
        >
          {isDeleteMode ? '삭제' : '선택'}
        </button>
      </div>
    </div>
  );
};

export default MyStore;
