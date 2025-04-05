import { useEffect, useState } from 'react';

export const useGridRows = (): number => {
  const [gridRows, setGridRows] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 845) {
        setGridRows(1);
      } else {
        setGridRows(2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return gridRows;
};
