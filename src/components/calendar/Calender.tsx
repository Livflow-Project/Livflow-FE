import './Calendar.css';

import { CalendarEvent, Transaction } from '../../types/calendar';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useRef, useState } from 'react';

import CalendarModal from '../modal/CalendarModal';
import FullCalendar from '@fullcalendar/react';
import PieChart from '../userStore/PieChart';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import listPlugin from '@fullcalendar/list';
import { twMerge } from 'tailwind-merge';
import useCalendarStore from '../../Store/useCalendarStore';
import { toast } from 'react-toastify';

interface CalendarProps {
  storeId: number;
}

const Calender: React.FC<CalendarProps> = ({ storeId }) => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDateElement, setSelectedDateElement] =
    useState<HTMLElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { transactions, addTransaction } = useCalendarStore();
  const { monthlyTotals } = useCalendarStore();

  const storeTransactions = transactions[storeId] || {};

  const monthKey = new Date().toISOString().slice(0, 7);
  const totalsForMonth = monthlyTotals[storeId]?.[monthKey];

  const events: CalendarEvent[] = Object.keys(storeTransactions).map(
    (date) => ({
      start: date,
    })
  );

  const handleAddTransaction = (transaction: Transaction) => {
    if (selectedDate) {
      addTransaction(storeId, selectedDate, transaction);
    }
  };

  const handleDateClick = (info: DateClickArg) => {
    // 이전에 선택된 날짜가 있으면 클래스 제거
    if (selectedDateElement) {
      selectedDateElement
        .querySelector('.fc-daygrid-day-top')
        ?.classList.remove('selected-date');
    }

    // 현재 클릭한 날짜가 이전에 선택된 날짜와 같으면 선택 해제
    if (selectedDateElement === info.dayEl) {
      setSelectedDateElement(null);
      setSelectedDate(null);
    } else {
      // 새로운 날짜 선택 시 자식 요소에 클래스 추가
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

      <div className='flex h-full w-[40%] flex-col items-center rounded-xl bg-white/50'>
        {/* 선택된 날짜가 없고 트랜잭션도 없을 때 */}
        {!selectedDate && Object.keys(storeTransactions).length === 0 ? (
          <div className='my-auto w-full text-center text-2xl text-main'>
            <span>입력된 지출 / 수입이 없습니다.</span>
          </div>
        ) : !selectedDate && Object.keys(storeTransactions).length > 0 ? (
          // 선택된 날짜는 없지만 트랜잭션이 있을 때
          <>
            <div className='flex h-full w-full items-center justify-evenly'>
              <div className='flex w-[40%] flex-col items-center justify-center gap-[50px]'>
                {Object.keys(totalsForMonth.categories.expense).length === 0 ? (
                  <p className='text-sx text-caption'>
                    입력된 지출이 없습니다.
                  </p>
                ) : (
                  <>
                    <span className='text-2xl font-semibold'>총 지출</span>
                    <PieChart
                      selectedType='expense'
                      categories={totalsForMonth.categories.expense}
                    />
                    {/* 수입 카테고리들 중 가장큰 수입 최대 5순위까지 카테고리 */}
                    <ul className='flex w-full flex-col items-center text-xl font-medium text-caption'>
                      <li className='flex w-full justify-between'>
                        <span>생활용품</span>
                        <span>- 1000원</span>
                      </li>
                      <li className='flex w-full justify-between'>
                        <span>생활용품</span>
                        <span>- 1000원</span>
                      </li>
                      <li className='flex w-full justify-between'>
                        <span>생활용품</span>
                        <span>- 1000원</span>
                      </li>
                      <li className='flex w-full justify-between'>
                        <span>생활용품</span>
                        <span>- 1000원</span>
                      </li>
                      <li className='flex w-full justify-between'>
                        <span>생활용품</span>
                        <span>- 1000원</span>
                      </li>
                      <li className='mt-10 flex w-full justify-between'>
                        <span>합계</span>
                        <span>
                          - {totalsForMonth.expense.toLocaleString()}원
                        </span>
                      </li>
                    </ul>
                  </>
                )}
              </div>

              <div className='h-[90%] w-[1px] bg-underline/50'></div>

              <div className='flex w-[40%] flex-col items-center justify-center gap-[50px]'>
                {Object.keys(totalsForMonth.categories.income).length === 0 ? (
                  <p className='text-sx text-caption'>
                    입력된 수입이 없습니다.
                  </p>
                ) : (
                  <>
                    <span className='text-2xl font-semibold'>총 수입</span>
                    <PieChart
                      selectedType='expense'
                      categories={totalsForMonth.categories.income}
                    />
                    {/* 수입 카테고리들 중 가장큰 수입 최대 5순위까지 카테고리 */}
                    <ul className='flex w-full flex-col items-center text-xl font-medium text-caption'>
                      <li className='flex w-full justify-between'>
                        <span>생활용품</span>
                        <span>- 1000원</span>
                      </li>
                      <li className='flex w-full justify-between'>
                        <span>생활용품</span>
                        <span>- 1000원</span>
                      </li>
                      <li className='flex w-full justify-between'>
                        <span>생활용품</span>
                        <span>- 1000원</span>
                      </li>
                      <li className='flex w-full justify-between'>
                        <span>생활용품</span>
                        <span>- 1000원</span>
                      </li>
                      <li className='flex w-full justify-between'>
                        <span>생활용품</span>
                        <span>- 1000원</span>
                      </li>
                      <li className='mt-10 flex w-full justify-between'>
                        <span>합계</span>
                        <span>
                          + {totalsForMonth.income.toLocaleString()}원
                        </span>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* 총 합계 표시 */}
            <div className='flex h-[100px] items-center justify-center'>
              <p className='text-2xl font-semibold'>
                총 합계 :{' '}
                {(
                  totalsForMonth.income - totalsForMonth.expense
                ).toLocaleString()}
                원
              </p>
            </div>
          </>
        ) : (
          <>
            {/* 선택된 날짜가 있거나 트랜잭션이 있을 때 */}
            <div className='flex h-[65px] w-full items-center border-b border-underline'>
              <span className='w-[30%] text-center text-xl font-semibold text-main'>
                항목
              </span>
              <span className='w-[40%] text-center text-xl font-semibold text-main'>
                상세 정보
              </span>
              <span className='w-[30%] text-center text-xl font-semibold text-main'>
                지출 / 수입
              </span>
            </div>

            <div className='h- flex h-[calc(100%-130px)] w-full flex-col gap-2'>
              {selectedDate && storeTransactions[selectedDate]?.length > 0 ? (
                storeTransactions[selectedDate].map((transaction, index) => (
                  <div
                    key={index}
                    className='flex h-[45px] w-full items-center border-b border-underline/30 text-center'
                  >
                    <span className='w-[30%] text-lg font-normal'>
                      {transaction.item}
                    </span>
                    <span className='w-[40%] text-lg font-normal'>
                      {transaction.details}
                    </span>
                    <span
                      className={twMerge(
                        'w-[30%] text-lg font-normal',
                        transaction.type === 'expense'
                          ? 'text-red'
                          : 'text-green'
                      )}
                    >
                      {transaction.type === 'expense'
                        ? `- ${transaction.amount}`
                        : `+ ${transaction.amount}`}
                    </span>
                  </div>
                ))
              ) : (
                // 날짜는 선택했으나 트랜잭션이 없을 때 메시지 표시
                <div className='my-auto w-full text-center text-2xl text-main'>
                  입력된 지출 / 수입이 없습니다.
                </div>
              )}
            </div>

            <div className='flex w-full items-center justify-between px-[25px] pb-[20px]'>
              <button
                onClick={() => setIsModalOpen(true)}
                className='soft_BcolorSet w-[40%]'
              >
                지출 / 수입 추가하기
              </button>
              <div className='flex w-[40%] gap-4'>
                <button className='soft_BcolorSet w-[50%]'>수정 하기</button>
                <button className='soft_BcolorSet w-[50%]'>삭제 하기</button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <CalendarModal
          onClose={() => {
            setIsModalOpen(false);
            toast.dismiss();
          }}
          onSubmit={handleAddTransaction}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default Calender;
