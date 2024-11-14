import 'swiper/swiper-bundle.css';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import AddStore from '../components/userStore/AddStore';
import AddStoreModal from '../components/modal/AddStoreModal';
import MyStore from '../components/userStore/MyStore';
import { useState } from 'react';
import useUsers_Store from '../store/useUsersStore';
import { toast } from 'react-toastify';

const Store = () => {
  const { stores, isDeleteMode, toggleDeleteMode } = useUsers_Store();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
    toast.dismiss();
  };

  const handleDeleteModeToggle = () => {
    toggleDeleteMode();
  };

  return (
    <div className='flex h-[calc(100vh-75px)] flex-col items-center justify-center bg-white'>
      <div className='w-full max-w-[1200px]'>
        <div className='mb-10 flex w-[400px] items-end justify-between pl-[60px]'>
          <span className='text-3xl font-semibold text-caption'>
            전체 스토어 ({stores.length})
          </span>
          {stores.length !== 0 && (
            <button
              className='text-lg text-red hover:font-semibold'
              onClick={handleDeleteModeToggle}
            >
              {isDeleteMode ? '취소하기' : '삭제하기'}
            </button>
          )}
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className='h-[650px]'
        >
          <SwiperSlide className='h-full px-[60px]'>
            <div className='flex items-start justify-start gap-[30px]'>
              <AddStore onOpenModal={handleToggleModal} />
              {stores.slice(0, 2).map((store) => (
                <MyStore
                  key={store.id}
                  id={store.id}
                  name={store.name}
                  address={store.address}
                  isDeleteMode={isDeleteMode}
                />
              ))}
            </div>
          </SwiperSlide>

          {/* stores.length가 3 이상일 때 나머지 스토어들을 3개씩 묶어서 슬라이드로 표시 */}
          {stores.length >= 3 &&
            Array.from(
              { length: Math.ceil((stores.length - 2) / 3) },
              (_, index) => {
                const startIdx = 2 + index * 3;
                return (
                  <SwiperSlide key={index} className='h-full px-[60px]'>
                    <div className='flex items-start justify-start gap-[30px]'>
                      {stores.slice(startIdx, startIdx + 3).map((store) => (
                        <MyStore
                          key={store.id}
                          id={store.id}
                          name={store.name}
                          address={store.address}
                          isDeleteMode={isDeleteMode}
                        />
                      ))}
                    </div>
                  </SwiperSlide>
                );
              }
            )}
        </Swiper>
      </div>

      {isModalOpen && <AddStoreModal onClose={handleToggleModal} />}
    </div>
  );
};

export default Store;
