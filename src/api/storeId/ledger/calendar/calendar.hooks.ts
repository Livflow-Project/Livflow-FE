import { CalendarAPI } from './calendarAPI';
import { DayParams } from './calendar.type';
import { useQuery } from '@tanstack/react-query';

export const useGetLedgerCalendar = (storeId: string, params: DayParams) => {
  // 월별 총 달력 데이터 조회
  return useQuery({
    queryKey: ['store', storeId, 'detail', params.year, params.month],
    queryFn: () => CalendarAPI.getLedgerCalendarAPI(storeId, params),
  });
};
