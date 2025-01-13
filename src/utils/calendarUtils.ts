import {
  DayDetailTransaction,
  DayInfo,
  StoreIdDetailResponse,
} from '@/api/storeId/storeId.type';

export const calculateTotals = (calendarData: StoreIdDetailResponse) => {
  if (!calendarData)
    return {
      expense: 0,
      income: 0,
      categories: [],
    };

  const categoryTotals: {
    [key: string]: {
      type: 'expense' | 'income';
      category: string;
      cost: number;
    };
  } = {};

  calendarData.date_info.forEach((dateInfo: DayInfo) => {
    dateInfo.day_info.forEach((transaction: DayDetailTransaction) => {
      const key = `${transaction.type}-${transaction.category}`;
      if (!categoryTotals[key]) {
        categoryTotals[key] = {
          type: transaction.type,
          category: transaction.category,
          cost: 0,
        };
      }
      categoryTotals[key].cost += transaction.cost;
    });
  });

  const categories = Object.values(categoryTotals);

  const totalExpense = categories
    .filter((cat) => cat.type === 'expense')
    .reduce((sum, item) => sum + item.cost, 0);

  const totalIncome = categories
    .filter((cat) => cat.type === 'income')
    .reduce((sum, item) => sum + item.cost, 0);

  return {
    expense: totalExpense,
    income: totalIncome,
    categories,
  };
};

export const getSelectedDateTransactions = (
  selectedDate: string,
  calendarData: StoreIdDetailResponse
) => {
  if (!selectedDate || !calendarData) return null;
  const day = parseInt(selectedDate.split('-')[2]);
  return calendarData.date_info.find((info) => info.day === day)?.day_info;
};
