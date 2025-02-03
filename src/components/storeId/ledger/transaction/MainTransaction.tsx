import {
  DayDetailTransaction,
  StoreIdDetailResponse,
} from '@/api/storeId/storeId.type';

import ActionButtons from './components/button/ActionButtons';
import CalendarModal from '../modal/CalendarModal';
import TransactionHeader from './components/TransactionHeader';
import TransactionList from './components/TransactionList';
import { getSelectedDateTransactions } from '@/utils/calendarUtils';
import { useState } from 'react';
import { useStoreIdQuery } from '@/api/storeId/storeId.hooks';

type MainTransactionProps = {
  selectedDate: string;
  calendarData: StoreIdDetailResponse;
  storeId: string;
  onModalOpen: () => void;
};

const MainTransaction = ({
  selectedDate,
  calendarData,
  storeId,
  onModalOpen,
}: MainTransactionProps) => {
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
      storeId: storeId,
      transactionId: transaction.transaction_id,
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

export default MainTransaction;
