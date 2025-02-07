import {
  ChartOverview,
  LedgerCalendarResponse,
} from '@/api/storeId/ledger/calendar/calendar.type';

import { Transaction } from '@/api/storeId/ledger/transactions/transactions.type';

type CategoryTotal = ChartOverview['categories'][0];

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
  calendarData: LedgerCalendarResponse | null | undefined
): CalculateTotalsResult => {
  const defaultResult: CalculateTotalsResult = {
    expense: 0,
    income: 0,
    categories: [],
  };

  if (!calendarData || !calendarData.chart) return defaultResult;

  return {
    expense: calendarData.chart.totalExpense,
    income: calendarData.chart.totalIncome,
    categories: calendarData.chart.categories,
  };
};

/**
 * 선택된 날짜의 거래 내역을 조회하는 함수
 *
 * @param selectedDate - 'YYYY-MM-DD' 형식의 날짜 문자열
 * @param calendarData - 월별 거래 데이터
 * @returns {Transaction[] | null} 해당 날짜의 거래 내역 목록 또는 null
 */

export const getSelectedDateTransactions = (
  selectedDate: string | null | undefined,
  calendarData: LedgerCalendarResponse | null | undefined
): Transaction[] | null => {
  if (!selectedDate || !calendarData || !calendarData.days) return null;

  const [, , dayStr] = selectedDate.split('-');
  const day = parseInt(dayStr, 10);

  if (isNaN(day)) return null;

  const dayInfo = calendarData.days.find((info) => info.day === day);
  return dayInfo ? [] : null; // 실제 트랜잭션 데이터는 별도의 API 호출로 가져와야 함
};
