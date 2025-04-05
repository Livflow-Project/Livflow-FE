import ChartView from './chart/ChartView';
import EditableInput from './EditableInput';
import { StoreDetailResponse } from '@/api/store/store.type';
import { storeIcons } from '@/assets/assets';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';
import { useStoreForm } from '@/hooks/useStoreForm';
import { useStoreQuery } from '@/api/store/store.hooks';

type MyStoreProps = {
  storeInfo: StoreDetailResponse;
  isDeleteMode: boolean;
};

const MyStore = ({ storeInfo, isDeleteMode }: MyStoreProps) => {
  const navigate = useNavigate();

  const {
    name,
    address,
    isEditingName,
    isEditingAddress,
    nameInputRef,
    addressInputRef,
    nameError,
    handleEditButtonClick,
    handleChange,
    handleUpdate,
    handleKeyDown,
  } = useStoreForm(storeInfo);

  const { useDeleteStore } = useStoreQuery();
  const deleteStoreMutation = useDeleteStore();

  const handleDeleteStore = () => {
    deleteStoreMutation.mutate(storeInfo.store_id);
  };

  const handleSelectStore = () => {
    toast.dismiss();
    navigate(`/store/${storeInfo.store_id}/ledger`);
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
          <EditableInput
            isEditing={isEditingName}
            value={name}
            onChange={(value) => handleChange(value, 'name')}
            onKeyDown={(e) => handleKeyDown(e, 'name')}
            onEditClick={() => handleEditButtonClick('name')}
            onUpdate={() => handleUpdate('name')}
            inputRef={nameInputRef}
            icon={storeIcons.storeIcon}
            iconAlt='상점 아이콘'
            isRequired={true}
            error={nameError}
          />

          <EditableInput
            isEditing={isEditingAddress}
            value={address}
            onChange={(value) => handleChange(value, 'address')}
            onKeyDown={(e) => handleKeyDown(e, 'address')}
            onEditClick={() => handleEditButtonClick('address')}
            onUpdate={() => handleUpdate('address')}
            inputRef={addressInputRef}
            icon={storeIcons.mapIcon}
            iconAlt='주소 아이콘'
          />
        </ul>
      </div>

      <div className='flex h-[calc(100%-115px)] flex-col items-center justify-between p-[20px]'>
        <ChartView isDeleteMode={isDeleteMode} chartInfo={storeInfo.chart} />

        <button
          className={twMerge(isDeleteMode ? 'delete_button' : 'choice_button')}
          onClick={isDeleteMode ? handleDeleteStore : handleSelectStore}
        >
          {isDeleteMode ? '삭제' : '선택'}
        </button>
      </div>
    </div>
  );
};

export default MyStore;
