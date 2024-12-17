import 'swiper/swiper-bundle.css';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import AddStore from '@/components/store/AddStore';
import MyStore from '@/components/store/MyStore';

type StoreListProps = {
  stores: StoreResponse[];
  onToggleModal: () => void;
  isDeleteMode: boolean;
};

const STORES_PER_PAGE = {
  FIRST_PAGE: 2,
  OTHER_PAGES: 3,
};

const StoreList = ({ stores, onToggleModal, isDeleteMode }: StoreListProps) => {
  const renderFirstSlide = () => (
    <SwiperSlide className='h-full px-[60px]'>
      <div className='flex items-start justify-start gap-[30px]'>
        <AddStore onOpenModal={onToggleModal} />

        {stores.slice(0, STORES_PER_PAGE.FIRST_PAGE).map((store) => (
          <MyStore
            key={store.store_id}
            storeInfo={store}
            isDeleteMode={isDeleteMode}
          />
        ))}
      </div>
    </SwiperSlide>
  );

  const renderRemainingSlides = () => {
    const remainingStoresCount = stores.length - STORES_PER_PAGE.FIRST_PAGE;
    const slidesCount = Math.ceil(
      remainingStoresCount / STORES_PER_PAGE.OTHER_PAGES
    );

    return Array.from({ length: slidesCount }, (_, index) => {
      const startIdx =
        STORES_PER_PAGE.FIRST_PAGE + index * STORES_PER_PAGE.OTHER_PAGES;
      const currentSlideStores = stores.slice(
        startIdx,
        startIdx + STORES_PER_PAGE.OTHER_PAGES
      );

      return (
        <SwiperSlide key={`slide-${index}`} className='h-full px-[60px]'>
          <div className='flex items-start justify-start gap-[30px]'>
            {currentSlideStores.map((store) => (
              <MyStore
                key={store.store_id}
                storeInfo={store}
                isDeleteMode={isDeleteMode}
              />
            ))}
          </div>
        </SwiperSlide>
      );
    });
  };

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      className='h-[650px]'
    >
      {renderFirstSlide()}
      {stores.length >= STORES_PER_PAGE.FIRST_PAGE && renderRemainingSlides()}
    </Swiper>
  );
};

export default StoreList;
