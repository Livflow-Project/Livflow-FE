/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /bg-category-.+/,
    },
  ],
  theme: {
    extend: {
      colors: {
        main: '#121212',
        caption: '#333333',
        primary: '#004aad',
        primary_hover: '#003e92',
        button: '#336ebd',
        button_hover: '#004aad',
        m_background: '#d9d9d9',
        underline: '#333333',
        input_line: '#666666',
        input_line_focus: '#4D4D4D',
        white: '#F8F8F8',
        red: '#D10000',
        green: '#00C016',
        background: '#E4F0FF',

        category: {
          // 수입 관련
          매출: '#2E8BC0',
          수입: '#5B9BD5',
          부수입: '#8FAADC',
          '투자-수익': '#4472C4',
          '정부-지원금': '#70C1CE',
        
          // 지출 관련
          '직원-급여': '#5DADE2',
          배송비: '#85C1E9',
          '사무-용품': '#F7DC6F',
          '포장-용품': '#F5CBA7',
        
          // 주거 관련
          주거비: '#C5A3BD',
          임대료: '#C39BD3',
          월세: '#9B59B6',
          관리비: '#D7BDE2',
          '수도-광열비': '#F1948A',
          '인터넷-통신비': '#FFBDC5',
          수리비: '#A98BC7',
          인테리어비: '#D2B4DE',
          난방비: '#E8ADAD',
          냉방비: '#9590C7',
        
          // 재료 관련
          재료비: '#F5B041',
          식료품: '#F8B88B',
        
          // 교통 관련
          '자동차-유지비': '#BDD7EE',
          '자동차-보험': '#D0D3DD',
          주유비: '#F4A582',
        
          // 생활 필수품
          '생활-용품': '#FFE699',
          '가전-제품': '#7BC5AE',
          가구: '#B3CC92',
          '계절-재고-구매': '#F9D27D',
        
          // 의료/건강
          의료비: '#66B2B2',
          약품비: '#9CCCCC',
          '건강-관리': '#A3D1B2',
        
          // 세금 관련
          소득세: '#E57373',
          '부가-가치세': '#EF5350',
          재산세: '#FFABA5',
          '사업자-보험': '#E57373',
        
          // 보험/금융
          보험료: '#F4A460',
          저축: '#D4B96A',
          투자: '#C68B59',
          '대출-상환': '#A47A7C',
          '금융-수수료': '#C9A66B',
        
          // 교육/자기계발
          '전문-교육비': '#9370DB',
          '세미나-컨퍼런스': '#BFA58A',
        
          // 사업비
          마케팅비: '#F1948A',
          '설비-유지비': '#7DCEA0',
          소프트웨어: '#7FB3D5',
          '전문-서비스': '#AED6F1',
        
          // 온라인 사업
          '웹호스팅-서버': '#5DADE2',
          '온라인-광고비': '#D6EAF8',
          '플랫폼-수수료': '#D6EFF1',
        
          // 기타
          기타: '#A9A9A9',
        },
      },
      animation: {
        smoothWaveAndSlide: 'smoothWaveAndSlide 4s ease-in-out forwards', // 더 부드러운 이동을 위해 ease-in-out 사용
        blinkingBorder: 'blinkingBorder 1s ease-in-out infinite',
      },
      keyframes: {
        smoothWaveAndSlide: {
          '0%': { transform: 'translateX(-300%) translateY(0) rotate(0deg)' }, // 시작 위치
          '33%': { transform: 'translateX(-160%) translateY(6px) rotate(3deg)' }, // 중간
          '66%': { transform: 'translateX(-60%) translateY(-4px) rotate(-3deg)' }, // 끝에 가까운 위치
          '100%': { transform: 'translateX(0) translateY(0) rotate(0deg)' }, // 최종 위치
        },
        blinkingBorder: {
          '0%, 100%': { borderColor: '#D10000' },
          '50%': { borderColor: '#333333' },
        },
      },
      fontFamily: {
        sans: ['Pretendard Variable', 'Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [  
    require('@tailwindcss/forms'),
  ],
}


