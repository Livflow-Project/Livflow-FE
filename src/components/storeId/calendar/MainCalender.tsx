import CalendarModal from '../modal/CalendarModal';
import CalendarView from './CalendarView';
import DailyDetails from '../dailyDetails/Index';
import MonthlyOverview from './MonthlyOverview';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useStoreIdQuery } from '@/api/storeId/storeId.hooks';

type CalendarProps = {
  storeId: string;
};

const MainCalendar = ({ storeId }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentYear, setCurrentYear] = useState(2024);
  const [currentMonth, setCurrentMonth] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { useGetStoreCalendar } = useStoreIdQuery();
  const { data: calendarData } = useGetStoreCalendar(storeId, {
    year: currentYear,
    month: currentMonth,
  });

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

      <div className='flex h-full w-[48%] flex-col items-center justify-between rounded-xl bg-white/50'>
        {!selectedDate ? (
          <MonthlyOverview calendarData={calendarData} />
        ) : (
          <DailyDetails
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
