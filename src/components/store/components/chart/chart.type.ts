export type ChartType = 'expense' | 'income';

export const CHART_TYPES = {
  EXPENSE: 'expense' as ChartType,
  INCOME: 'income' as ChartType,
};

export const CHART_LABELS = {
  [CHART_TYPES.EXPENSE]: '지출',
  [CHART_TYPES.INCOME]: '수입',
};
