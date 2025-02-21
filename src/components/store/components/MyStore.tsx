import {
  StoreDetailResponse,
  StoreRequestParams,
} from '@/api/store/store.type';
import { mapIcon, storeIcon } from '@/assets/assets';
import { useRef, useState } from 'react';

import ChartView from './chart/ChartView';
import EditableInput from './EditableInput';
import { showWarnToast } from '@/utils/toast';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';
import { useStoreQuery } from '@/api/store/store.hooks';

type MyStoreProps = {
  storeInfo: StoreDetailResponse;
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
      { storeId: storeInfo.store_id, storeInfo: updates },
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
        toast.success('스토어가 삭제되었습니다');
      },
      onError: () => {
        toast.error('삭제 중 오류가 발생했습니다');
      },
    });
  };

  const handleSelect = () => {
    navigate(`/store/${storeInfo.store_id}`);
  };

  return (
    <div className='store_box'>
      <div className='border-b border-underline border-opacity-20 p-[20px]'>
        <ul
          className={twMerge(
            'flex flex-col gap-6',
            isDeleteMode && 'pointer-events-none'
          )}
        >
          <li className='flex items-center justify-between'>
            <EditableInput
              isEditing={isEditingName}
              value={name}
              onChange={setName}
              onKeyDown={(e) => handleKeyDown(e, 'name')}
              onEditClick={() => handleEditButtonClick('name')}
              onUpdate={() => handleUpdate('name')}
              inputRef={nameInputRef}
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
              icon={mapIcon}
              iconAlt='주소 아이콘'
            />
          </li>
        </ul>
      </div>

      <div className='flex h-[calc(100%-128px)] flex-col items-center justify-between p-[20px]'>
        <ChartView isDeleteMode={isDeleteMode} chartInfo={storeInfo.chart} />

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
