import CalendarView from './components/CalendarView/CalendarView';
import ContentLoadingIndicator from '@/components/common/ContentLoadingIndicator';
import LedgerModal from './modal/LedgerModal';
import MainTransaction from './components/transaction/MainTransaction';
import MonthlyOverview from './components/monthlyOverview/index';
import { toast } from 'react-toastify';
import { useGetLedgerCalendar } from '@/api/storeId/ledger/calendar/calendar.hooks';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

const MainLedger = () => {
  const { storeId } = useOutletContext<{ storeId: string }>();

  const today = new Date();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: calendarData, isLoading } = useGetLedgerCalendar(storeId, {
    year: currentYear,
    month: currentMonth,
  });

  const handleModalOpen = () => {
    toast.dismiss();
    setIsModalOpen(true);
  };

  if (isLoading || !calendarData) {
    return <ContentLoadingIndicator />;
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
            storeId={storeId}
            onModalOpen={handleModalOpen}
          />
        )}
      </div>

      {isModalOpen && (
        <LedgerModal
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

export default MainLedger;
