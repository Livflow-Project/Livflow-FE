import {
  DayDetailTransaction,
  StoreIdDetailResponse,
} from '@/api/storeId/storeId.type';

import ActionButtons from './buttons/ActionButtons';
import CalendarModal from '../modal/CalendarModal';
import TransactionHeader from './TransactionHeader';
import TransactionList from './TransactionList';
import { getSelectedDateTransactions } from '@/utils/calendarUtils';
import { useState } from 'react';
import { useStoreIdQuery } from '@/api/storeId/storeId.hooks';

type DailyDetailsProps = {
  selectedDate: string;
  calendarData: StoreIdDetailResponse;
  storeId: string;
  onModalOpen: () => void;
};

const DailyDetails = ({
  selectedDate,
  calendarData,
  storeId,
  onModalOpen,
}: DailyDetailsProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<DayDetailTransaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transactions = getSelectedDateTransactions(selectedDate, calendarData);

  const { useDeleteTransaction } = useStoreIdQuery();
  const deleteMutation = useDeleteTransaction();

  const handleEdit = (transaction: DayDetailTransaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = (transaction: DayDetailTransaction) => {
    deleteMutation.mutate({
      id: storeId,
      transaction_id: transaction.transaction_id,
    });
  };

  return (
    <>
      <TransactionHeader />

      <TransactionList
        transactions={transactions}
        isEditMode={isEditMode}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ActionButtons
        isEditMode={isEditMode}
        onEditModeToggle={() => setIsEditMode(!isEditMode)}
        onModalOpen={onModalOpen}
      />

      {isModalOpen && editingTransaction && (
        <CalendarModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingTransaction(null);
          }}
          storeId={storeId}
          selectedDate={selectedDate}
          isEditMode={true}
          initialData={editingTransaction}
        />
      )}
    </>
  );
};

export default DailyDetails;
