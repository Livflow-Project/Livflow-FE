import { DayParams } from './calendar.type';
import axiosInstance from '@/api/axiosInstance';

export const CalendarAPI = {
  // 월별 총 달력 데이터 조회
  getLedgerCalendarAPI: async (storeId: string, params: DayParams) => {
    const response = await axiosInstance.get(
      `/ledger/${storeId}/calendar/?year=${params.year}&month=${params.month}`
    );
    return response.data;
  },
};
