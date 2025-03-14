import 'swiper/swiper-bundle.css';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import AddStore from './components/AddStore';
import MyStore from './components/MyStore';
import { StoreDetailResponse } from '@/api/store/store.type';

type StoreListProps = {
  stores: StoreDetailResponse[];
  onToggleModal: () => void;
  isDeleteMode: boolean;
};

const StoreList = ({
  stores = [],
  onToggleModal,
  isDeleteMode,
}: StoreListProps) => {
  const swiperConfig = {
    modules: [Navigation, Pagination],
    navigation: true,
    pagination: { clickable: true },
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    className: 'h-[650px]',
  };

  const renderStores = () => {
    const slides = [];
    // 페이지당 2개의 스토어로 변경
    for (let i = 0; i < stores.length; i += 2) {
      slides.push(
        <SwiperSlide
          key={i}
          className='flex items-start justify-start gap-[30px]'
        >
          <div className='flex w-full items-start justify-start gap-[30px]'>
            {stores.slice(i, i + 2).map((store) => (
              <MyStore
                key={store.store_id}
                storeInfo={store}
                isDeleteMode={isDeleteMode}
              />
            ))}
          </div>
        </SwiperSlide>
      );
    }
    return slides;
  };

  return (
    <div className='relative flex max-w-[1200px]'>
      <AddStore onOpenModal={onToggleModal} />

      <style>
        {`
            .swiper-container {
              position: relative;
              z-index: 1;
            }
            .swiper {
              width: 100% !important;
              max-width: 860px !important;
              overflow: hidden !important;
              position: relative;
            }
            .swiper-slide {
              height: auto !important;
              width: 100% !important;
              max-width: 860px !important;
              padding: 0 0 0 75px;
            }
            .swiper-button-prev,
            .swiper-button-next {
              color: #000;
              opacity: 1;
              z-index: 20;
            }
            .swiper-button-prev {
              left: 30px !important;
            }
            .swiper-button-next {
              right: 30px;
            }
            .swiper-wrapper {
              align-items: flex-start;
            }
          `}
      </style>
      <Swiper {...swiperConfig}>{stores.length > 0 && renderStores()}</Swiper>
    </div>
  );
};

export default StoreList;
