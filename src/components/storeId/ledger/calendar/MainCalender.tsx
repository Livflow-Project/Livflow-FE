import CalendarModal from '../modal/CalendarModal';
import CalendarView from './components/CalendarView';
import MainTransaction from '../transaction/MainTransaction';
import MonthlyOverview from './components/MonthlyOverview';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useStoreIdQuery } from '@/api/storeId/storeId.hooks';

type CalendarProps = {
  storeId: string;
};

const MainCalendar = ({ storeId }: CalendarProps) => {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { useGetStoreCalendar } = useStoreIdQuery();
  const { data: calendarData, isLoading } = useGetStoreCalendar(storeId, {
    year: currentYear,
    month: currentMonth,
  });

  // 데이터 로딩 상태 처리
  if (isLoading || !calendarData) {
    return (
      <div className='flex h-full items-center justify-between px-[35px] py-[30px]'>
        <div className='relative h-full w-[49%] overflow-hidden rounded-xl bg-white p-5'></div>
        <div className='flex h-full w-[49%] flex-col items-center justify-between rounded-xl bg-white/50'></div>
      </div>
    );
  }

  return (
    <div className='flex h-full items-center justify-between px-[35px] py-[30px]'>
      <CalendarView
        currentYear={currentYear}
        currentMonth={currentMonth}
        setCurrentYear={setCurrentYear}
        setCurrentMonth={setCurrentMonth}
        calendarData={calendarData}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className='flex h-full w-[49%] flex-col items-center justify-between rounded-xl bg-white/50'>
        {!selectedDate ? (
          <MonthlyOverview calendarData={calendarData} />
        ) : (
          <MainTransaction
            selectedDate={selectedDate}
            calendarData={calendarData}
            storeId={storeId}
            onModalOpen={() => setIsModalOpen(true)}
          />
        )}
      </div>

      {isModalOpen && (
        <CalendarModal
          onClose={() => {
            setIsModalOpen(false);
            toast.dismiss();
          }}
          storeId={storeId}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default MainCalendar;
