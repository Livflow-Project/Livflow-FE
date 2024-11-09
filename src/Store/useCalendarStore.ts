import { Transaction } from '../types/calendar';
import { create } from 'zustand';

// 상태 인터페이스 정의
interface useCalendarStoreState {
  transactions: Record<string, Transaction[]>; // 날짜별 지출/수입 저장할 객체
  addTransaction: (date: string, transaction: Transaction) => void;
  removeTransaction: (date: string, index: number) => void;
}

const useCalendarStore = create<useCalendarStoreState>((set) => ({
  transactions: {},

  addTransaction: (date, transaction) =>
    set((state) => {
      const currentDateTransactions = state.transactions[date] || [];
      return {
        transactions: {
          ...state.transactions,
          [date]: [...currentDateTransactions, transaction],
        },
      };
    }),

  removeTransaction: (date, index) =>
    set((state) => {
      const updatedDateTransactions =
        state.transactions[date]?.filter((_, i) => i !== index) || [];
      return {
        transactions: {
          ...state.transactions,
          [date]: updatedDateTransactions,
        },
      };
    }),
}));

export default useCalendarStore;
