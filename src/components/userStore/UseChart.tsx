import PieChart from './PieChart';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

interface UseChartProps {
  isDeleteMode: boolean;
}

const UseChart: React.FC<UseChartProps> = ({ isDeleteMode }) => {
  const [isExpenseSelected, setIsExpenseSelected] = useState(true);

  const handleToggle = (type: 'expense' | 'income') => {
    setIsExpenseSelected(type === 'expense');
  };

  return (
    <>
      <div className='flex w-[100%] justify-between'>
        <button
          className={twMerge(
            'text-xl font-semibold',
            isDeleteMode
              ? 'no_hover'
              : isExpenseSelected
                ? 'text-primary'
                : 'soft_TcolorSet'
          )}
          onClick={() => handleToggle('expense')}
        >
          지출
        </button>
        <button
          className={twMerge(
            'text-xl font-semibold',
            isDeleteMode
              ? 'no_hover'
              : !isExpenseSelected
                ? 'text-primary'
                : 'soft_TcolorSet'
          )}
          onClick={() => handleToggle('income')}
        >
          수입
        </button>
      </div>
      <div
        className={twMerge(
          'max-h-[270px] text-xl font-medium text-caption',
          isDeleteMode ? 'opacity-50' : ''
        )}
      >
        <PieChart selectedType={isExpenseSelected ? 'expense' : 'income'} />
        {/* {isExpenseSelected
          ? '입력된 지출이 없습니다.'
          : '입력된 수입이 없습니다.'} */}
      </div>
    </>
  );
};

export default UseChart;
