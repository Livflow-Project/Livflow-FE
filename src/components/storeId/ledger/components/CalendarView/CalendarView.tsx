import './css/calendar.css';

import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import { LedgerCalendarResponse } from '@/api/storeId/ledger/calendar/calendar.type';
import LegendItem from './LegendItem';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import listPlugin from '@fullcalendar/list';
import { useCalendarEvents } from './hooks/useCalendarEvents';
import { useCalendarNavigation } from './hooks/useCalendarNavigation';

type EventContentArg = {
  event: {
    extendedProps: {
      hasIncome: boolean;
      hasExpense: boolean;
    };
  };
};

type CalendarViewProps = {
  currentYear: number;
  currentMonth: number;
  setCurrentYear: (year: number) => void;
  setCurrentMonth: (month: number) => void;
  calendarData: LedgerCalendarResponse;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
};

const CALENDAR_LOCALE = koLocale;
const CALENDAR_VIEWS = {
  MONTH: 'dayGridMonth',
};
const CALENDAR_PLUGINS = [dayGridPlugin, listPlugin, interactionPlugin];

const CalendarView = ({
  currentYear,
  currentMonth,
  setCurrentYear,
  setCurrentMonth,
  calendarData,
  setSelectedDate,
}: CalendarViewProps) => {
  const [selectedDateElement, setSelectedDateElement] =
    useState<HTMLElement | null>(null);

  const events = useCalendarEvents(calendarData, currentYear, currentMonth);
  const { calendarRef, handlePrevMonth, handleNextMonth, goToDate } =
    useCalendarNavigation(setCurrentYear, setCurrentMonth, setSelectedDate);

  const handleDateClick = (info: DateClickArg) => {
    if (selectedDateElement) {
      selectedDateElement
        .querySelector('.fc-daygrid-day-top')
        ?.classList.remove('selected-date');
    }

    if (selectedDateElement === info.dayEl) {
      setSelectedDateElement(null);
      setSelectedDate(null);
      return;
    }

    const dayTopElement = info.dayEl.querySelector('.fc-daygrid-day-top');
    if (dayTopElement) {
      dayTopElement.classList.add('selected-date');
      setSelectedDateElement(info.dayEl);
      setSelectedDate(info.dateStr);
    }
  };

  useEffect(() => {
    goToDate(currentYear, currentMonth, 1);
  }, [currentYear, currentMonth, goToDate]);

  const renderEventContent = (arg: EventContentArg) => {
    const { hasIncome, hasExpense } = arg.event.extendedProps;

    return (
      <div className='pointer-events-none flex items-center gap-1'>
        {hasExpense && <span className='text-sm text-red'>●</span>}
        {hasIncome && <span className='text-sm text-green'>●</span>}
      </div>
    );
  };

  return (
    <div className='relative h-full w-[49%] overflow-hidden rounded-xl bg-white p-5'>
      <div className='absolute right-5 top-[25px] z-10 flex items-center justify-end gap-6'>
        <LegendItem color='red' label='지출' />
        <LegendItem color='green' label='수입' />
      </div>

      <FullCalendar
        ref={calendarRef}
        initialView={CALENDAR_VIEWS.MONTH}
        plugins={CALENDAR_PLUGINS}
        events={events}
        locale={CALENDAR_LOCALE}
        customButtons={{
          prevMonth: {
            text: '<',
            click: handlePrevMonth,
          },
          nextMonth: {
            text: '>',
            click: handleNextMonth,
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

export default CalendarView;
