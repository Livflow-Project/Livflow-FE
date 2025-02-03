import 'swiper/swiper-bundle.css';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import AddStore from './stores/AddStore';
import MyStore from './stores/MyStore';
import { StoreDetailResponse } from '@/api/store/store.type';

type StoreListProps = {
  stores: StoreDetailResponse[];
  onToggleModal: () => void;
  isDeleteMode: boolean;
};

type StoreSlide = {
  stores: StoreDetailResponse[];
  isDeleteMode: boolean;
  showAddStore?: boolean;
  onOpenModal: () => void;
};

const STORES_PER_PAGE = {
  FIRST_PAGE: 2,
  OTHER_PAGES: 3,
};

const swiperConfig = {
  modules: [Navigation, Pagination],
  navigation: true,
  pagination: { clickable: true },
  className: 'h-[650px]',
};

// 슬라이드 컴포넌트 분리
const StoreSlide = ({
  stores,
  isDeleteMode,
  showAddStore = false,
  onOpenModal,
}: StoreSlide) => (
  <div className='flex items-start justify-start gap-[30px]'>
    {showAddStore && <AddStore onOpenModal={onOpenModal} />}
    {stores.map((store) => (
      <MyStore
        key={store.store_id}
        storeInfo={store}
        isDeleteMode={isDeleteMode}
      />
    ))}
  </div>
);

const StoreList = ({
  stores = [],
  onToggleModal,
  isDeleteMode,
}: StoreListProps) => {
  if (!stores || !Array.isArray(stores) || stores.length === 0) {
    return (
      <Swiper {...swiperConfig}>
        <SwiperSlide className='h-full px-[60px]'>
          <StoreSlide
            stores={[]}
            isDeleteMode={isDeleteMode}
            showAddStore={true}
            onOpenModal={onToggleModal}
          />
        </SwiperSlide>
      </Swiper>
    );
  }

  // 첫 페이지 스토어 계산
  const firstPageStores = stores.slice(0, STORES_PER_PAGE.FIRST_PAGE);

  // 나머지 페이지 스토어 계산
  const calculateRemainingPages = () => {
    const remainingStores = stores.slice(STORES_PER_PAGE.FIRST_PAGE);
    const pages = [];

    for (
      let i = 0;
      i < remainingStores.length;
      i += STORES_PER_PAGE.OTHER_PAGES
    ) {
      pages.push(remainingStores.slice(i, i + STORES_PER_PAGE.OTHER_PAGES));
    }

    return pages;
  };

  const hasRemainingPages = stores.length > STORES_PER_PAGE.FIRST_PAGE;

  return (
    <Swiper {...swiperConfig}>
      <SwiperSlide className='h-full px-[60px]'>
        <StoreSlide
          stores={firstPageStores}
          isDeleteMode={isDeleteMode}
          showAddStore={true}
          onOpenModal={onToggleModal}
        />
      </SwiperSlide>

      {hasRemainingPages &&
        calculateRemainingPages().map((pageStores, index) => (
          <SwiperSlide key={`page-${index}`} className='h-full px-[60px]'>
            <StoreSlide
              stores={pageStores}
              isDeleteMode={isDeleteMode}
              onOpenModal={onToggleModal}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default StoreList;
