import './Calendar.css';

import { CalendarEvent, Transaction } from '../../types/calendar';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useRef, useState } from 'react';

import CalendarModal from '../modal/CalendarModal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import listPlugin from '@fullcalendar/list';
import useCalendarStore from '../../store/useCalendarStore';

interface CalendarProps {
  storeId: number;
}

const Calender: React.FC<CalendarProps> = ({ storeId }) => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { transactions, addTransaction } = useCalendarStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const storeTransactions = transactions[storeId] || {};

  const events: CalendarEvent[] = Object.keys(storeTransactions).map(
    (date) => ({
      start: date,
    })
  );

  const handleDateClick = (info: DateClickArg) => {
    setSelectedDate(info.dateStr);
  };

  const handleAddTransaction = (transaction: Transaction) => {
    if (selectedDate) {
      addTransaction(storeId, selectedDate, transaction);
    }
  };

  const handlePrev = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
    }
  };

  const handleNext = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
    }
  };

  return (
    <div className='flex h-full items-center justify-between px-[35px] py-[30px]'>
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

        {/* 달력 */}
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
          eventContent={(eventInfo) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {storeTransactions[eventInfo.event.startStr]?.some(
                (t) => t.type === 'expense'
              ) && <span className='text-red'>●</span>}
              {storeTransactions[eventInfo.event.startStr]?.some(
                (t) => t.type === 'income'
              ) && <span className='text-green'>●</span>}
            </div>
          )}
          dateClick={handleDateClick}
        />
      </div>

      <div className='flex h-full w-[40%] flex-col items-center justify-between rounded-xl bg-white/50'>
        {/* <div className='flex items-center justify-center h-full text-2xl text-main'>
          <span>입력된 지출 / 수입이 없습니다.</span>
        </div> */}
        <div className='flex h-[55px] w-full items-center justify-around border-b border-underline'>
          <span className='text-xl font-semibold text-main'>항목</span>
          <span className='text-xl font-semibold text-main'>상세 정보</span>
          <span className='text-xl font-semibold text-main'>지출 / 수입</span>
        </div>

        {/* 선택된 날짜의 트랜잭션 목록 표시 */}
        <div className='flex flex-col'>
          {selectedDate && storeTransactions[selectedDate]?.length > 0 ? (
            storeTransactions[selectedDate].map((transaction, index) => (
              <div key={index} className='flex justify-center py-2 w-fulls'>
                <span>{transaction.item}</span>
                <span>{transaction.details}</span>
                <span
                  className={
                    transaction.type === 'expense' ? 'text-red' : 'text-green'
                  }
                >
                  {transaction.type === 'expense'
                    ? `-${transaction.amount}`
                    : `+${transaction.amount}`}
                </span>
              </div>
            ))
          ) : (
            <div className='text-2xl text-main'>
              입력된 지출 / 수입이 없습니다.
            </div>
          )}
        </div>

        <div className='flex w-full items-center justify-between px-[25px] pb-[25px]'>
          <button
            onClick={() => setIsModalOpen(true)}
            className='soft_BcolorSet w-[230px]'
          >
            지출 / 수입 추가하기
          </button>
          <div className='flex gap-4'>
            <button className='soft_BcolorSet w-[120px]'>수정 하기</button>
            <button className='soft_BcolorSet w-[120px]'>삭제 하기</button>
          </div>
        </div>
      </div>

      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <CalendarModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTransaction}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default Calender;
