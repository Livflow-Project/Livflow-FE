import { Transaction } from '../types/calendar';
import { create } from 'zustand';

interface useCalendarStoreState {
  transactions: Record<number, Record<string, Transaction[]>>;
  addTransaction: (
    storeId: number,
    date: string,
    transaction: Transaction
  ) => void;
  removeTransaction: (storeId: number, date: string, index: number) => void;
}

const useCalendarStore = create<useCalendarStoreState>((set) => ({
  transactions: {},

  addTransaction: (storeId, date, transaction) =>
    set((state) => {
      const storeTransactions = state.transactions[storeId] || {};
      const currentDateTransactions = storeTransactions[date] || [];
      return {
        transactions: {
          ...state.transactions,
          [storeId]: {
            ...storeTransactions,
            [date]: [...currentDateTransactions, transaction],
          },
        },
      };
    }),

  removeTransaction: (storeId, date, index) =>
    set((state) => {
      const storeTransactions = state.transactions[storeId] || {};
      const updatedDateTransactions =
        storeTransactions[date]?.filter((_, i) => i !== index) || [];
      return {
        transactions: {
          ...state.transactions,
          [storeId]: {
            ...storeTransactions,
            [date]: updatedDateTransactions,
          },
        },
      };
    }),
}));

export default useCalendarStore;
