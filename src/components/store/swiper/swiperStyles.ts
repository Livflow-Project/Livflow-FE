export const storeListSwiperStyles = `
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
`;
