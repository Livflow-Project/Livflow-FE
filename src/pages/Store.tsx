// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// import { Navigation, Pagination } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';

import Add_Store from '../components/Add_Store';
import My_Store from '../components/My_Store';
import useUsers_Store from '../Store/useUsers_Store';

const Store = () => {
  const { stores, isDeleteMode, toggleDeleteMode } = useUsers_Store();

  const handleDeleteModeToggle = () => {
    toggleDeleteMode();
  };

  return (
    <div className='flex h-[calc(100vh-75px)] flex-col items-center justify-center bg-white'>
      <div className='w-full max-w-[1116px]'>
        <div className='mb-10 flex w-full max-w-[340px] items-end justify-between'>
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
        <div className='flex items-start gap-12'>
          <Add_Store />
          {stores.map((store) => (
            <My_Store
              key={store.id}
              id={store.id}
              name={store.name}
              address={store.address}
              isDeleteMode={isDeleteMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
