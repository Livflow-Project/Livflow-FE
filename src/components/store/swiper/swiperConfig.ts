import { Navigation, Pagination } from 'swiper/modules';

export const storeListSwiperConfig = {
  modules: [Navigation, Pagination],
  navigation: true,
  pagination: { clickable: true },
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 30,
  className: 'h-[630px]',
};
