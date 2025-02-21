import { CHART_LABELS, ChartType } from './chart.type';

import { twMerge } from 'tailwind-merge';

type ChartTypeButtonProps = {
  type: ChartType;
  selectedType: ChartType;
  isDeleteMode: boolean;
  onClick: () => void;
};

const ChartTypeButton = ({
  type,
  selectedType,
  isDeleteMode,
  onClick,
}: ChartTypeButtonProps) => (
  <button
    className={twMerge(
      'text-xl font-semibold',
      isDeleteMode
        ? 'no_hover'
        : type === selectedType
          ? 'text-primary'
          : 'soft_TcolorSet'
    )}
    onClick={onClick}
    disabled={isDeleteMode}
    type='button'
    aria-pressed={type === selectedType}
  >
    {CHART_LABELS[type]}
  </button>
);

export default ChartTypeButton;
