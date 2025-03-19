/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        background: '#E4F0FF'
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
        sans: ['Pretendard','Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [ require('@tailwindcss/forms')],
}


