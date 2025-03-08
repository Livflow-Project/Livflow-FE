/**
 * Swiper 관련 CSS 스타일을 생성하는 함수
 * @returns CSS 스타일 문자열
 */
export const getSwiperStyles = () => `
  .swiper {
    width: 100%;
    height: 100%;
    margin: 0 !important;
    padding: 0 50px 40px 50px !important;
  }
  .swiper-wrapper {
    margin-top: 10px !important; /* 상단 여백 추가 */
  }
  .swiper-slide {
    height: 250px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-pagination {
    position: absolute !important;
    bottom: 0px !important;
  }
  /* Grid 설정 */
  .swiper-grid .swiper-wrapper {
    flex-wrap: wrap;
  }
  
  /* 화면 높이에 따른 반응형 조정 */
  @media (max-height: 998px) {
    .swiper-wrapper {
      align-items: center !important;
    }
  }
  @media (min-height: 999px) {
    .swiper-wrapper {
      align-items: start !important;
    }
  }
`;
