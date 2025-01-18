import {
  DayDetailTransaction,
  DayInfo,
  StoreIdDetailResponse,
} from '@/api/storeId/storeId.type';

type CategoryTotal = {
  type: 'expense' | 'income';
  category: string;
  cost: number;
};

type CalculateTotalsResult = {
  expense: number;
  income: number;
  categories: CategoryTotal[];
};

/**
 * 월별 거래 데이터의 총계를 계산하는 함수
 *
 * @param calendarData - 월별 거래 데이터
 * @returns {CalculateTotalsResult} 카테고리별 총 지출/수입 및 전체 합계
 *
 * 계산 결과:
 * - expense: 총 지출 금액
 * - income: 총 수입 금액
 * - categories: 카테고리별 금액 목록
 */

export const calculateTotals = (
  calendarData: StoreIdDetailResponse | null | undefined
): CalculateTotalsResult => {
  const defaultResult: CalculateTotalsResult = {
    expense: 0,
    income: 0,
    categories: [],
  };

  if (!calendarData) return defaultResult;

  const categoryTotals = new Map<string, CategoryTotal>();

  calendarData.date_info.forEach((dateInfo: DayInfo) => {
    dateInfo.day_info.forEach((transaction: DayDetailTransaction) => {
      const key = `${transaction.type}-${transaction.category}`;
      const existingTotal = categoryTotals.get(key) ?? {
        type: transaction.type,
        category: transaction.category,
        cost: 0,
      };

      categoryTotals.set(key, {
        ...existingTotal,
        cost: existingTotal.cost + transaction.cost,
      });
    });
  });

  const categories = Array.from(categoryTotals.values());

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

/**
 * 선택된 날짜의 거래 내역을 조회하는 함수
 *
 * @param selectedDate - 'YYYY-MM-DD' 형식의 날짜 문자열
 * @param calendarData - 월별 거래 데이터
 * @returns {DayDetailTransaction[] | null} 해당 날짜의 거래 내역 목록 또는 null
 */

export const getSelectedDateTransactions = (
  selectedDate: string | null | undefined,
  calendarData: StoreIdDetailResponse | null | undefined
): DayDetailTransaction[] | null => {
  if (!selectedDate || !calendarData) return null;

  const [, , dayStr] = selectedDate.split('-');
  const day = parseInt(dayStr, 10);

  if (isNaN(day)) return null;

  return (
    calendarData.date_info.find((info) => info.day === day)?.day_info ?? null
  );
};
