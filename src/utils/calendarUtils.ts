export const calculateTotals = (calendarData: any) => {
  if (!calendarData)
    return {
      expense: 0,
      income: 0,
      categories: {
        expense: [],
        income: [],
      },
    };

  const expenseByCategory: { [key: string]: number } = {};
  const incomeByCategory: { [key: string]: number } = {};

  calendarData.date_info.forEach(
    (dateInfo: { day_info: { expense: any[]; income: any[] } }) => {
      if (dateInfo.day_info.expense) {
        dateInfo.day_info.expense.forEach((expense) => {
          expenseByCategory[expense.category] =
            (expenseByCategory[expense.category] || 0) + expense.cost;
        });
      }

      if (dateInfo.day_info.income) {
        dateInfo.day_info.income?.forEach((income) => {
          incomeByCategory[income.category] =
            (incomeByCategory[income.category] || 0) + income.cost;
        });
      }
    }
  );

  const expenseCategories = Object.entries(expenseByCategory).map(
    ([category, cost]) => ({
      category,
      cost,
    })
  );

  const incomeCategories = Object.entries(incomeByCategory).map(
    ([category, cost]) => ({
      category,
      cost,
    })
  );

  const totalExpense = expenseCategories.reduce(
    (sum, item) => sum + item.cost,
    0
  );
  const totalIncome = incomeCategories.reduce(
    (sum, item) => sum + item.cost,
    0
  );

  return {
    expense: totalExpense,
    income: totalIncome,
    categories: {
      expense: expenseCategories,
      income: incomeCategories,
    },
  };
};

export const getSelectedDateTransactions = (
  selectedDate: string,
  calendarData: any
) => {
  if (!selectedDate || !calendarData) return null;
  const day = parseInt(selectedDate.split('-')[2]);
  return calendarData.date_info.find(
    (info: { day: number }) => info.day === day
  )?.day_info;
};
