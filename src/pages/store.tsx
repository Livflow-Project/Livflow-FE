import AddStoreModal from '@/components/store/modal/AddStoreModal';
import StoreHeader from '@/components/store/StoreHeader';
import StoreList from '@/components/store/StoreList';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useStoreQuery } from '@/api/store/store.hooks';

const Store = () => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { useGetAllStores } = useStoreQuery();
  const { data, isLoading, error } = useGetAllStores();

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
    toast.dismiss();
  };

  const handleDeleteModeToggle = () => {
    setIsDeleteMode((prev) => !prev);
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  if (!data) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className='flex h-[calc(100vh-75px)] flex-col items-center justify-center bg-white'>
      <div className='w-full max-w-[1200px]'>
        <StoreHeader
          storeCount={data.length}
          isDeleteMode={isDeleteMode}
          onDeleteModeToggle={handleDeleteModeToggle}
        />

        <StoreList
          stores={data}
          onToggleModal={handleToggleModal}
          isDeleteMode={isDeleteMode}
        />
      </div>

      {isModalOpen && <AddStoreModal onClose={handleToggleModal} />}
    </div>
  );
};

export default Store;
