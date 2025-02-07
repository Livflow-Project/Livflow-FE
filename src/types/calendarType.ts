import { Transaction } from '@/api/storeId/ledger/transactions/transactions.type';

export type CalendarEvent = {
  start: string;
  transactions: Transaction[];
};
