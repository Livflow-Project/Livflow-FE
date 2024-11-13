import { Transaction } from '../types/calendar';
import { create } from 'zustand';

interface useCalendarStoreState {
  transactions: Record<number, Record<string, Transaction[]>>;
  monthlyTotals: Record<
    number,
    Record<string, { income: number; expense: number; categories: any }>
  >;
  addTransaction: (
    storeId: number,
    date: string,
    transaction: Transaction
  ) => void;
}

const useCalendarStore = create<useCalendarStoreState>((set) => ({
  transactions: {},
  monthlyTotals: {},

  addTransaction: (storeId, date, transaction) =>
    set((state) => {
      const storeTransactions = state.transactions[storeId] || {};
      const currentDateTransactions = storeTransactions[date] || [];

      // 새로운 트랜잭션 목록
      const updatedTransactions = [...currentDateTransactions, transaction];

      // 월별 총 수입/지출 계산
      const month = date.slice(0, 7); // YYYY-MM 형식으로 추출
      const currentMonthTotals = state.monthlyTotals[storeId]?.[month] || {
        income: 0,
        expense: 0,
        categories: { income: {}, expense: {} }, // 카테고리별 수입/지출 초기화
      };

      // 카테고리별로 금액을 추가
      if (transaction.type === 'income') {
        currentMonthTotals.income += transaction.amount;
        currentMonthTotals.categories.income[transaction.item] =
          (currentMonthTotals.categories.income[transaction.item] || 0) +
          transaction.amount;
      } else if (transaction.type === 'expense') {
        currentMonthTotals.expense += transaction.amount;
        currentMonthTotals.categories.expense[transaction.item] =
          (currentMonthTotals.categories.expense[transaction.item] || 0) +
          transaction.amount;
      }

      return {
        transactions: {
          ...state.transactions,
          [storeId]: {
            ...storeTransactions,
            [date]: updatedTransactions,
          },
        },
        monthlyTotals: {
          ...state.monthlyTotals,
          [storeId]: {
            ...state.monthlyTotals[storeId],
            [month]: currentMonthTotals,
          },
        },
      };
    }),
}));

export default useCalendarStore;
