import { CHART_LABELS, CHART_TYPES, ChartType } from './chart.type';
import { memo, useMemo, useState } from 'react';

import { Category } from '@/api/store/store.type';
import ChartTypeButton from './ChartTypeButton';
import PieChart from '@/components/common/PieChart';

type ChartViewProps = {
  chartInfo: Category[];
  isDeleteMode: boolean;
};

const ChartView = ({ isDeleteMode, chartInfo }: ChartViewProps) => {
  const [selectedType, setSelectedType] = useState<ChartType>(
    CHART_TYPES.EXPENSE
  );

  const filteredCategories = useMemo(
    () => chartInfo?.filter((item) => item.type === selectedType),
    [chartInfo, selectedType]
  );

  const handleTypeChange = (type: ChartType) => {
    setSelectedType(type);
  };

  const chartContent = useMemo(
    () =>
      filteredCategories && filteredCategories.length > 0 ? (
        <PieChart categories={filteredCategories} />
      ) : (
        <div className='text-center'>
          {`추가된 ${CHART_LABELS[selectedType]}이 없습니다.`}
        </div>
      ),
    [filteredCategories, selectedType]
  );

  return (
    <>
      <div className='flex w-[100%] justify-between'>
        <ChartTypeButton
          type={CHART_TYPES.EXPENSE}
          selectedType={selectedType}
          isDeleteMode={isDeleteMode}
          onClick={() => handleTypeChange(CHART_TYPES.EXPENSE)}
        />

        <ChartTypeButton
          type={CHART_TYPES.INCOME}
          selectedType={selectedType}
          isDeleteMode={isDeleteMode}
          onClick={() => handleTypeChange(CHART_TYPES.INCOME)}
        />
      </div>

      <div className={isDeleteMode ? 'opacity-50' : ''}>{chartContent}</div>
    </>
  );
};

export default memo(ChartView, (prevProps, nextProps) => {
  return (
    prevProps.isDeleteMode === nextProps.isDeleteMode &&
    JSON.stringify(prevProps.chartInfo) === JSON.stringify(nextProps.chartInfo)
  );
});
