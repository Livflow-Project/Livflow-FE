import './css/calendar.css';

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

  const handleDateClick = (info: DateClickArg) => {
    // 이전에 선택된 날짜의 스타일 제거
    if (selectedDateElement) {
      selectedDateElement
        .querySelector('.fc-daygrid-day-top')
        ?.classList.remove('selected-date');
    }

    // 같은 날짜를 다시 클릭하면 선택 해제
    if (selectedDateElement === info.dayEl) {
      setSelectedDateElement(null);
      setSelectedDate(null);
      return;
    }

    // 새 날짜 선택
    const dayTopElement = info.dayEl.querySelector('.fc-daygrid-day-top');
    if (dayTopElement) {
      dayTopElement.classList.add('selected-date');
      setSelectedDateElement(info.dayEl);
      setSelectedDate(info.dateStr);
    }
  };

  // 이전/다음 월 이동 핸들러
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

  // 지출 / 수입 여부 렌더링 함수
  const renderEventContent = (arg: any) => {
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
  };

  return (
    <div className='relative h-full w-[49%] overflow-hidden rounded-xl bg-white p-5'>
      <div className='absolute right-5 top-[25px] flex items-center justify-end gap-6'>
        <LegendItem color='red' label='지출' />
        <LegendItem color='green' label='수입' />
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
        eventContent={renderEventContent}
        dateClick={handleDateClick}
      />
    </div>
  );
};

// 범례 아이템 컴포넌트
const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div className='flex items-center gap-2'>
    <span className={`text-${color}`}>●</span>
    <span className='text-lg font-medium text-main'>{label}</span>
  </div>
);

export default CalendarView;
