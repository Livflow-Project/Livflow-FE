export const storeListSwiperStyles = `
  .swiper-container {
    position: relative;
    z-index: 1;
  }
  .swiper {
    width: 100% !important;
    overflow: hidden !important;
    position: relative;
  }
  .swiper-slide {
    height: auto !important;
    padding-left: 75px;
    
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: #000;
    opacity: 1;
    z-index: 20;
  }
  .swiper-button-prev {
    left: 20px !important;
  }
  .swiper-button-next {
    right: 20px !important;
  }
  .swiper-wrapper {
    align-items: flex-start;
  }
`;
