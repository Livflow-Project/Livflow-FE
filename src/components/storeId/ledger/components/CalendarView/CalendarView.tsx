import '../css/calendar.css';

import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import { LedgerCalendarResponse } from '@/api/storeId/ledger/calendar/calendar.type';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import listPlugin from '@fullcalendar/list';

type CalendarViewProps = {
  currentYear: number;
  currentMonth: number;
  setCurrentYear: (year: number) => void;
  setCurrentMonth: (month: number) => void;
  calendarData: LedgerCalendarResponse;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
};

const CalendarView = ({
  currentYear,
  currentMonth,
  setCurrentYear,
  setCurrentMonth,
  calendarData,
  setSelectedDate,
}: CalendarViewProps) => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [selectedDateElement, setSelectedDateElement] =
    useState<HTMLElement | null>(null);

  const events = useMemo(() => {
    if (!calendarData?.days) return [];

    return calendarData.days.map((dayInfo: any) => ({
      start: `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${dayInfo.day?.toString().padStart(2, '0')}`,
      extendedProps: {
        hasIncome: dayInfo.hasIncome,
        hasExpense: dayInfo.hasExpense,
      },
      allDay: true,
    }));
  }, [calendarData, currentYear, currentMonth]);

  const handleDateClick = (info: DateClickArg) => {
    if (selectedDateElement) {
      selectedDateElement
        .querySelector('.fc-daygrid-day-top')
        ?.classList.remove('selected-date');
    }

    if (selectedDateElement === info.dayEl) {
      setSelectedDateElement(null);
      setSelectedDate(null);
    } else {
      const dayTopElement = info.dayEl.querySelector('.fc-daygrid-day-top');
      if (dayTopElement) {
        dayTopElement.classList.add('selected-date');
        setSelectedDateElement(info.dayEl);
        setSelectedDate(info.dateStr);
      }
    }
  };

  // 날짜 변경 시 데이터 갱신을 위한 콜백 함수
  const onDateChange = useCallback(
    (newDate: Date) => {
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;

      setCurrentYear(year);
      setCurrentMonth(month);
      // 날짜가 변경될 때 선택된 날짜 초기화
      setSelectedDate(null);
      setSelectedDateElement(null);
    },
    [setCurrentYear, setCurrentMonth, setSelectedDate]
  );

  const handlePrev = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev();
      const newDate = calendarRef.current.getApi().getDate();
      onDateChange(newDate);
    }
  };

  const handleNext = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next();
      const newDate = calendarRef.current.getApi().getDate();
      onDateChange(newDate);
    }
  };

  // 캘린더 초기화 및 데이터 동기화
  useEffect(() => {
    if (calendarRef.current) {
      const api = calendarRef.current.getApi();
      api.gotoDate(
        `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`
      );
    }
  }, [currentYear, currentMonth]);

  return (
    <div className='relative h-full w-[49%] overflow-hidden rounded-xl bg-white p-5'>
      <div className='absolute right-5 top-[25px] flex items-center justify-end gap-6'>
        <div className='flex items-center gap-2'>
          <span className='text-red'>●</span>
          <span className='text-lg font-medium text-main'>지출</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-green'>●</span>
          <span className='text-lg font-medium text-main'>수입</span>
        </div>
      </div>

      <FullCalendar
        ref={calendarRef}
        initialView='dayGridMonth'
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
        events={events}
        locale={koLocale}
        customButtons={{
          prevMonth: {
            text: '<',
            click: handlePrev,
          },
          nextMonth: {
            text: '>',
            click: handleNext,
          },
        }}
        headerToolbar={{
          left: 'prevMonth',
          center: 'title',
          right: 'nextMonth',
        }}
        titleFormat={{ month: 'long' }}
        eventContent={(arg) => {
          const { hasIncome, hasExpense } = arg.event.extendedProps;

          return (
            <div
              className='flex items-center gap-1'
              style={{ pointerEvents: 'none' }}
            >
              {hasExpense && <span className='text-red'>●</span>}
              {hasIncome && <span className='text-green'>●</span>}
            </div>
          );
        }}
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default CalendarView;
