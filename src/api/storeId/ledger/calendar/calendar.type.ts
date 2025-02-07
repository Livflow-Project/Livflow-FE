export type StoreCalendarResponse = {
  days: DayOverview[];
  chart: ChartOverview;
};

export type DayOverview = {
  day?: number;
  hasIncome?: boolean;
  hasExpense?: boolean;
};

export type ChartOverview = {
  totalIncome: number;
  totalExpense: number;
  categories: {
    type: 'income' | 'expense';
    category: string;
    total: number;
  }[];
};

export type DayParams = {
  year: number;
  month: number;
};
