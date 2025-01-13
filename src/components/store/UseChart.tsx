import { Category } from '@/api/store/store.type';
import PieChart from '../common/PieChart';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

type UseChartProps = {
  chartInfo?: Category[];
  isDeleteMode: boolean;
};

const UseChart = ({ chartInfo, isDeleteMode }: UseChartProps) => {
  const [selectedType, setSelectedType] = useState<'expense' | 'income'>(
    'expense'
  );

  const filteredCategories = chartInfo?.filter(
    (item) => item.type === selectedType
  );

  return (
    <>
      <div className='flex w-[100%] justify-between'>
        <button
          className={twMerge(
            'text-xl font-semibold',
            isDeleteMode
              ? 'no_hover'
              : selectedType === 'expense'
                ? 'text-primary'
                : 'soft_TcolorSet'
          )}
          onClick={() => setSelectedType('expense')}
        >
          지출
        </button>

        <button
          className={twMerge(
            'text-xl font-semibold',
            isDeleteMode
              ? 'no_hover'
              : selectedType === 'income'
                ? 'text-primary'
                : 'soft_TcolorSet'
          )}
          onClick={() => setSelectedType('income')}
        >
          수입
        </button>
      </div>

      <div className={isDeleteMode ? 'opacity-50' : ''}>
        {filteredCategories && filteredCategories.length > 0 ? (
          <PieChart
            selectedType={selectedType}
            categories={filteredCategories}
          />
        ) : (
          <div className='text-center'>
            {`입력된 ${selectedType === 'expense' ? '지출' : '수입'}이 없습니다.`}
          </div>
        )}
      </div>
    </>
  );
};

export default UseChart;
