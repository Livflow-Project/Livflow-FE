import { StoreRequestParams, StoreResponse } from '@/api/store/store.type';
import { mapIcon, storeIcon } from '@/assets/assets';
import { useRef, useState } from 'react';

import EditableInput from './EditableInput';
import UseChart from './UseChart';
import { showWarnToast } from '@/utils/toast';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';
import { useStoreQuery } from '@/api/store/store.hooks';

type MyStoreProps = {
  storeInfo: StoreResponse;
  isDeleteMode: boolean;
};

const MyStore = ({ storeInfo, isDeleteMode }: MyStoreProps) => {
  const [name, setName] = useState(storeInfo.name);
  const [address, setAddress] = useState(storeInfo.address || '');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const navigate = useNavigate();

  // React Query 훅 사용
  const { useUpdateStore, useDeleteStore } = useStoreQuery();
  const updateStoreMutation = useUpdateStore();
  const deleteStoreMutation = useDeleteStore();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  const handleEditButtonClick = (type: 'name' | 'address') => {
    if (type === 'name') {
      setIsEditingName(true);
      requestAnimationFrame(() => nameInputRef.current?.focus());
    } else if (type === 'address') {
      setIsEditingAddress(true);
      requestAnimationFrame(() => addressInputRef.current?.focus());
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

  const handleUpdate = (type: 'name' | 'address') => {
    if (type === 'name' && !name.trim()) {
      showWarnToast('스토어 이름은 필수 입력 요소입니다.');
      return;
    }

    const updates: StoreRequestParams = {
      name: type === 'name' ? name : storeInfo.name,
      address: type === 'address' ? address : storeInfo.address,
    };

    updateStoreMutation.mutate(
      { id: storeInfo.store_id, storeInfo: updates },
      {
        onSuccess: () => {
          if (type === 'name') setIsEditingName(false);
          if (type === 'address') setIsEditingAddress(false);

          toast.dismiss();
        },
      }
    );
  };

  const handleDelete = () => {
    deleteStoreMutation.mutate(storeInfo.store_id, {
      onSuccess: () => {
        // 삭제 후 필요한 처리
      },
    });
  };

  const handleSelect = () => {
    navigate(`/store/${storeInfo.store_id}`);
  };

  return (
    <div className='store_box'>
      <div className='border-b border-underline border-opacity-20 p-[20px]'>
        <ul className='flex flex-col gap-6'>
          <li className='flex items-center justify-between'>
            <EditableInput
              isEditing={isEditingName}
              value={name}
              onChange={setName}
              onKeyDown={(e) => handleKeyDown(e, 'name')}
              onEditClick={() => handleEditButtonClick('name')}
              onUpdate={() => handleUpdate('name')}
              inputRef={nameInputRef}
              isDeleteMode={isDeleteMode}
              icon={storeIcon}
              iconAlt='상점 아이콘'
              isRequired={true}
            />
          </li>

          <li className='flex items-center justify-between'>
            <EditableInput
              isEditing={isEditingAddress}
              value={address}
              onChange={setAddress}
              onKeyDown={(e) => handleKeyDown(e, 'address')}
              onEditClick={() => handleEditButtonClick('address')}
              onUpdate={() => handleUpdate('address')}
              inputRef={addressInputRef}
              isDeleteMode={isDeleteMode}
              icon={mapIcon}
              iconAlt='주소 아이콘'
            />
          </li>
        </ul>
      </div>

      <div className='flex h-[calc(100%-128px)] flex-col items-center justify-between p-[20px]'>
        <UseChart isDeleteMode={isDeleteMode} chartInfo={storeInfo.chart} />

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
