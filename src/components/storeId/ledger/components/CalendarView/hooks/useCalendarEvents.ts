import { LedgerCalendarResponse } from '@/api/storeId/ledger/calendar/calendar.type';
import { formatDateString } from '@/utils/dateUtils';
import { useMemo } from 'react';

type DayOverview = {
  day?: number;
  hasIncome: boolean;
  hasExpense: boolean;
};

export const useCalendarEvents = (
  calendarData: LedgerCalendarResponse,
  currentYear: number,
  currentMonth: number
) => {
  return useMemo(() => {
    if (!calendarData?.days) return [];

    return calendarData.days
      .filter(
        (dayInfo): dayInfo is DayOverview & { day: number } =>
          dayInfo.day !== undefined
      )
      .map((dayInfo) => ({
        start: formatDateString(currentYear, currentMonth, dayInfo.day),
        extendedProps: {
          hasIncome: dayInfo.hasIncome,
          hasExpense: dayInfo.hasExpense,
        },
        allDay: true,
      }));
  }, [calendarData, currentYear, currentMonth]);
};
