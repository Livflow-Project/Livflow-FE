import { useEffect, useState } from 'react';

/**
 * 화면 높이에 따라 그리드 행 수를 결정하는 커스텀 훅
 * @returns 현재 화면 높이에 적합한 그리드 행 수
 */
export const useGridRows = (): number => {
  const [gridRows, setGridRows] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 1000) {
        setGridRows(1); // 화면 높이가 작을 때 1줄만 표시
      } else {
        setGridRows(2); // 큰 화면에서 2줄 표시
      }
    };

    handleResize(); // 초기 로드 시 실행
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return gridRows;
};
