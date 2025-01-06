import './css/calendar.css';

import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useRef, useState } from 'react';

import { CalendarEvent } from '@/types/calendarType';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import listPlugin from '@fullcalendar/list';

type CalendarViewProps = {
  currentYear: number;
  currentMonth: number;
  setCurrentYear: (year: number) => void;
  setCurrentMonth: (month: number) => void;
  calendarData: any;
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

  const events: CalendarEvent[] =
    calendarData?.date_info.map(
      (dateInfo: {
        day: { toString: () => string };
        day_info: { expense: any; income: any };
      }) => ({
        start: `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${dateInfo.day.toString().padStart(2, '0')}`,
        expense: dateInfo.day_info.expense,
        income: dateInfo.day_info.income,
      })
    ) || [];

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

  const handlePrev = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev();
      const newDate = calendarRef.current.getApi().getDate();
      setCurrentYear(newDate.getFullYear());
      setCurrentMonth(newDate.getMonth() + 1);
    }
  };

  const handleNext = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next();
      const newDate = calendarRef.current.getApi().getDate();
      setCurrentYear(newDate.getFullYear());
      setCurrentMonth(newDate.getMonth() + 1);
    }
  };

  return (
    <div className='relative h-full w-[58%] overflow-hidden rounded-xl bg-white p-5'>
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
        eventContent={(eventInfo) => {
          const date = eventInfo.event.startStr;
          const eventData = events.find((e) => e.start === date);

          if (!eventData) return null;

          return (
            <div
              className='flex items-center gap-1'
              style={{ pointerEvents: 'none' }}
            >
              {eventData.expense && eventData.expense.length > 0 && (
                <span className='text-red'>●</span>
              )}
              {eventData.income && eventData.income.length > 0 && (
                <span className='text-green'>●</span>
              )}
            </div>
          );
        }}
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default CalendarView;
