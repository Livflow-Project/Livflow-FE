import CalendarView from './components/CalendarView/CalendarView';
import LedgerModal from './modal/LedgerModal';
import MainTransaction from './components/transaction/MainTransaction';
import MonthlyOverview from './components/monthlyOverview/index';
import { motion } from 'framer-motion';
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
    return (
      <div className='flex h-full w-full items-center justify-between px-[30px] py-[25px]'>
        <div className='relative h-full w-[49%] overflow-hidden rounded-xl bg-white p-5' />
        <div className='flex h-full w-[49%] flex-col items-center justify-between overflow-hidden rounded-xl bg-white/50' />
      </div>
    );
  }

  return (
    <div className='animate-in animate-out flex h-full items-center justify-between px-[30px] py-[25px]'>
      <CalendarView
        currentYear={currentYear}
        currentMonth={currentMonth}
        setCurrentYear={setCurrentYear}
        setCurrentMonth={setCurrentMonth}
        calendarData={calendarData}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className='flex h-full w-[49%] flex-col items-center justify-between overflow-hidden rounded-xl bg-white/50'>
        {!selectedDate ? (
          <motion.div
            key={`${currentYear}-${currentMonth}-overview`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='h-full w-full'
          >
            <MonthlyOverview calendarData={calendarData} />
          </motion.div>
        ) : (
          <motion.div
            key={`${selectedDate}-transaction`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='h-full w-full'
          >
            <MainTransaction
              selectedDate={selectedDate}
              storeId={storeId}
              onModalOpen={handleModalOpen}
            />
          </motion.div>
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
