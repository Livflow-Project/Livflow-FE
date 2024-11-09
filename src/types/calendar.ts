export type Transaction = {
  item: string;
  details: string;
  type: 'expense' | 'income';
  amount: number;
};

export type CalendarEvent = {
  start: string;
};
