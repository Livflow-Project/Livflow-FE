import { useCallback, useRef } from 'react';

import FullCalendar from '@fullcalendar/react';
import { formatDateString } from '@/utils/dateUtils';

export const useCalendarNavigation = (
  setCurrentYear: (year: number) => void,
  setCurrentMonth: (month: number) => void,
  setSelectedDate: (date: string | null) => void
) => {
  const calendarRef = useRef<FullCalendar | null>(null);

  const handleDateChange = useCallback(
    (newDate: Date) => {
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;

      setCurrentYear(year);
      setCurrentMonth(month);
      setSelectedDate(null);
    },
    [setCurrentYear, setCurrentMonth, setSelectedDate]
  );

  const handlePrevMonth = useCallback(() => {
    if (calendarRef.current) {
      const api = calendarRef.current.getApi();
      api.prev();
      handleDateChange(api.getDate());
    }
  }, [handleDateChange]);

  const handleNextMonth = useCallback(() => {
    if (calendarRef.current) {
      const api = calendarRef.current.getApi();
      api.next();
      handleDateChange(api.getDate());
    }
  }, [handleDateChange]);

  const goToDate = useCallback((year: number, month: number, day: number) => {
    if (calendarRef.current) {
      const api = calendarRef.current.getApi();
      api.gotoDate(formatDateString(year, month, day));
    }
  }, []);

  return {
    calendarRef,
    handlePrevMonth,
    handleNextMonth,
    handleDateChange,
    goToDate,
  };
};
