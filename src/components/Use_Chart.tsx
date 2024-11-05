import PieChart from './PieChart';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import useUsers_Store from '../Store/useUsers_Store';

interface Use_ChartProps {
  id: number;
  isDeleteMode: boolean;
}

const Use_Chart: React.FC<Use_ChartProps> = ({ id, isDeleteMode }) => {
  const [isExpenseSelected, setIsExpenseSelected] = useState(true);

  const deleteStore = useUsers_Store((state) => state.deleteStore);

  const handleDelete = () => {
    deleteStore(id);
  };

  const handleToggle = (type: 'expense' | 'income') => {
    setIsExpenseSelected(type === 'expense');
  };

  return (
    <div
      className='flex flex-col items-center justify-between p-[20px]'
      style={{ height: 'calc(100% - 128px)' }}
    >
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
          'text-caption max-h-[270px] text-xl font-medium',
          isDeleteMode ? 'opacity-50' : ''
        )}
      >
        <PieChart selectedType={isExpenseSelected ? 'expense' : 'income'} />
        {/* {isExpenseSelected
          ? '입력된 지출이 없습니다.'
          : '입력된 수입이 없습니다.'} */}
      </div>
      <button
        className={twMerge(isDeleteMode ? 'delete_button' : 'choice_button')}
        onClick={isDeleteMode ? handleDelete : undefined}
      >
        {isDeleteMode ? '삭제' : '선택'}
      </button>
    </div>
  );
};

export default Use_Chart;
