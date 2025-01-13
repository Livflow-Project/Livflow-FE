import { DayDetailTransaction } from '@/api/storeId/storeId.type';

export type Transaction = {
  transaction_id: string;
  category: string;
  detail: string;
  type: 'expense' | 'income';
  cost: number;
};

export type CalendarEvent = {
  start: string;
  transactions: DayDetailTransaction[];
};
