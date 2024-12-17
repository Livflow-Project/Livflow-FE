import 'swiper/swiper-bundle.css';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import AddStore from '@/components/store/AddStore';
import AddStoreModal from '@/components/store/modal/AddStoreModal';
import MyStore from '@/components/store/MyStore';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useStoreQuery } from '@/api/store/store.hooks';

const Store = () => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // React Query 훅 사용
  const { useGetAllStores } = useStoreQuery();
  const { data, isLoading } = useGetAllStores();

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

  // data가 없거나 배열이 아닌 경우를 처리
  if (!data) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className='flex h-[calc(100vh-75px)] flex-col items-center justify-center bg-white'>
      <div className='w-full max-w-[1200px]'>
        <div className='mb-10 flex w-[400px] items-end justify-between pl-[60px]'>
          <span className='text-3xl font-semibold text-caption'>
            전체 스토어 ({data.length})
          </span>
          {data.length !== 0 && (
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
              {data.slice(0, 2).map((store: StoreResponse) => (
                <MyStore
                  key={store.store_id}
                  storeInfo={store}
                  isDeleteMode={isDeleteMode}
                />
              ))}
            </div>
          </SwiperSlide>

          {/* data.length가 3 이상일 때 나머지 스토어들을 3개씩 묶어서 슬라이드로 표시 */}
          {data.length >= 3 &&
            Array.from(
              { length: Math.ceil((data.length - 2) / 3) },
              (_, index) => {
                const startIdx = 2 + index * 3;
                return (
                  <SwiperSlide key={index} className='h-full px-[60px]'>
                    <div className='flex items-start justify-start gap-[30px]'>
                      {data.slice(startIdx, startIdx + 3).map((store: any) => (
                        <MyStore
                          storeInfo={store}
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
