import 'swiper/swiper-bundle.css';

import { Swiper, SwiperSlide } from 'swiper/react';

import AddStore from './components/AddStore';
import MyStore from './components/MyStore';
import { StoreDetailResponse } from '@/api/store/store.type';
import { storeListSwiperConfig } from './swiper/swiperConfig';
import { storeListSwiperStyles } from './swiper/swiperStyles';

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
  const renderStores = () => {
    const slides = [];
    // 페이지당 2개의 스토어로 변경
    for (let i = 0; i < stores.length; i += 2) {
      slides.push(
        <SwiperSlide key={i} className='flex items-start justify-start'>
          <div className='flex items-start justify-start gap-[30px]'>
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
    <div className='flex items-start'>
      <AddStore onOpenModal={onToggleModal} />

      <style>{storeListSwiperStyles}</style>
      <Swiper {...storeListSwiperConfig}>
        {stores.length > 0 && renderStores()}
      </Swiper>
    </div>
  );
};

export default StoreList;
