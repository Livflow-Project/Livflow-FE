import './calendar.css';

import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useRef, useState } from 'react';

import { CalendarEvent } from '@/types/calendarType';
import CalendarModal from '../CalendarModal';
import { DayDetailTransaction } from '@/api/storeId/storeId.type';
import FullCalendar from '@fullcalendar/react';
import PieChart from '@/components/common/PieChart';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import listPlugin from '@fullcalendar/list';
import { toast } from 'react-toastify';
import { useStoreIdQuery } from '@/api/storeId/storeId.hooks';

type CalendarProps = {
  storeId: number;
};

const Calender = ({ storeId }: CalendarProps) => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDateElement, setSelectedDateElement] =
    useState<HTMLElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentYear, setCurrentYear] = useState(2024);
  const [currentMonth, setCurrentMonth] = useState(12);
  const { useGetStoreDetail } = useStoreIdQuery();

  // 달력 데이터 조회
  const { data: calendarData } = useGetStoreDetail(storeId, {
    year: currentYear,
    month: currentMonth,
  });

  // date_info 배열을 캘린더 이벤트로 변환할 때 기본값 설정
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

  // 차트 데이터 계산 로직 수정
  const calculateTotals = () => {
    if (!calendarData)
      return {
        expense: 0,
        income: 0,
        categories: {
          expense: [],
          income: [],
        },
      };

    // 카테고리별 총합을 계산하기 위한 객체
    const expenseByCategory: { [key: string]: number } = {};
    const incomeByCategory: { [key: string]: number } = {};

    // 모든 날짜의 거래 내역을 순회하며 카테고리별 합계 계산
    calendarData.date_info.forEach(
      (dateInfo: { day_info: { expense: any[]; income: any[] } }) => {
        // 지출 계산
        if (dateInfo.day_info.expense) {
          dateInfo.day_info.expense.forEach((expense) => {
            expenseByCategory[expense.category] =
              (expenseByCategory[expense.category] || 0) + expense.cost;
          });
        }

        // 수입 계산
        if (dateInfo.day_info.income) {
          dateInfo.day_info.income?.forEach((income) => {
            incomeByCategory[income.category] =
              (incomeByCategory[income.category] || 0) + income.cost;
          });
        }
      }
    );

    // 카테고리별 합계를 배열 형태로 변환
    const expenseCategories = Object.entries(expenseByCategory).map(
      ([category, cost]) => ({
        category,
        cost,
      })
    );

    const incomeCategories = Object.entries(incomeByCategory).map(
      ([category, cost]) => ({
        category,
        cost,
      })
    );

    // 총합 계산
    const totalExpense = expenseCategories.reduce(
      (sum, item) => sum + item.cost,
      0
    );
    const totalIncome = incomeCategories.reduce(
      (sum, item) => sum + item.cost,
      0
    );

    return {
      expense: totalExpense,
      income: totalIncome,
      categories: {
        expense: expenseCategories,
        income: incomeCategories,
      },
    };
  };

  // 계산된 데이터 사용
  const monthlyTotals = calculateTotals();

  // 선택된 날짜의 거래 내역 가져오기
  const getSelectedDateTransactions = () => {
    if (!selectedDate || !calendarData) return null;
    const day = parseInt(selectedDate.split('-')[2]);
    return calendarData.date_info.find(
      (info: { day: number }) => info.day === day
    )?.day_info;
  };

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

  const handleAddTransaction = () => {
    // API 호출 또는 상태 업데이트 로직
    toast.success('거래가 추가되었습니다.');
    setIsModalOpen(false);
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

      <div className='flex h-full w-[40%] flex-col items-center rounded-xl bg-white/50'>
        {!selectedDate ? (
          <>
            <div className='flex h-full w-full items-center justify-evenly py-14'>
              <div className='flex h-full w-[40%] flex-col items-center gap-[50px]'>
                {monthlyTotals.categories.expense.length === 0 ? (
                  <p className='text-sx text-caption'>
                    입력된 지출이 없습니다.
                  </p>
                ) : (
                  <>
                    <span className='text-2xl font-semibold'>총 지출</span>
                    <PieChart
                      selectedType='expense'
                      categories={monthlyTotals.categories.expense}
                    />
                    <ul className='flex h-full w-full flex-col items-center text-xl font-medium text-caption'>
                      {monthlyTotals.categories.expense
                        .sort((a, b) => b.cost - a.cost)
                        .slice(0, 5)
                        .map((category, index) => (
                          <li
                            key={index}
                            className='flex w-full justify-between'
                          >
                            <span>{category.category}</span>
                            <span>- {category.cost.toLocaleString()}원</span>
                          </li>
                        ))}
                      <div className='mt-auto w-full pt-[25px]'>
                        <li className='flex w-full justify-between'>
                          <span>합계</span>
                          <span>
                            - {monthlyTotals.expense.toLocaleString()}원
                          </span>
                        </li>
                      </div>
                    </ul>
                  </>
                )}
              </div>

              <div className='h-full w-[1px] bg-underline/30'></div>

              <div className='flex h-full w-[40%] flex-col items-center gap-[50px]'>
                {monthlyTotals.categories.income.length === 0 ? (
                  <p className='text-sx text-caption'>
                    입력된 수입이 없습니다.
                  </p>
                ) : (
                  <>
                    <span className='text-2xl font-semibold'>총 수입</span>
                    <PieChart
                      selectedType='income'
                      categories={monthlyTotals.categories.income}
                    />
                    <ul className='flex h-full w-full flex-col items-center text-xl font-medium text-caption'>
                      {monthlyTotals.categories.income
                        .sort((a, b) => b.cost - a.cost)
                        .slice(0, 5)
                        .map((category, index) => (
                          <li
                            key={index}
                            className='flex w-full justify-between'
                          >
                            <span>{category.category}</span>
                            <span>+ {category.cost.toLocaleString()}원</span>
                          </li>
                        ))}

                      <div className='mt-auto w-full pt-[20px]'>
                        <li className='mt-10 flex w-full justify-between'>
                          <span>합계</span>
                          <span>
                            + {monthlyTotals.income.toLocaleString()}원
                          </span>
                        </li>
                      </div>
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div className='flex h-[100px] w-full items-center justify-center border-t-2 border-underline/30'>
              <p className='text-2xl font-semibold'>
                총 합계 :{' '}
                {(
                  monthlyTotals.income - monthlyTotals.expense
                ).toLocaleString()}
                원
              </p>
            </div>
          </>
        ) : (
          <>
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

            <div className='flex h-[calc(100%-130px)] w-full flex-col gap-2'>
              {getSelectedDateTransactions() ? (
                <>
                  {getSelectedDateTransactions()?.expense?.map(
                    (transaction: DayDetailTransaction, index: number) => (
                      <div
                        key={`expense-${index}`}
                        className='flex h-[45px] w-full items-center border-b border-underline/30 text-center'
                      >
                        <span className='w-[30%] text-lg font-normal'>
                          {transaction.category}
                        </span>
                        <span className='w-[40%] text-lg font-normal'>
                          {transaction.detail}
                        </span>
                        <span className='w-[30%] text-lg font-normal text-red'>
                          - {transaction.cost.toLocaleString()}원
                        </span>
                      </div>
                    )
                  )}

                  {getSelectedDateTransactions()?.income?.map(
                    (transaction: DayDetailTransaction, index: number) => (
                      <div
                        key={`income-${index}`}
                        className='flex h-[45px] w-full items-center border-b border-underline/30 text-center'
                      >
                        <span className='w-[30%] text-lg font-normal'>
                          {transaction.category}
                        </span>
                        <span className='w-[40%] text-lg font-normal'>
                          {transaction.detail}
                        </span>
                        <span className='w-[30%] text-lg font-normal text-green'>
                          + {transaction.cost.toLocaleString()}원
                        </span>
                      </div>
                    )
                  )}
                </>
              ) : (
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

      {isModalOpen && (
        <CalendarModal
          onClose={() => {
            setIsModalOpen(false);
            toast.dismiss();
          }}
          onSubmit={handleAddTransaction}
          storeId={storeId}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default Calender;
