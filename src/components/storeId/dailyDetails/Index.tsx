import {
  DayDetailTransaction,
  StoreIdDetailResponse,
} from '@/api/storeId/storeId.type';

import ActionButtons from './buttons/ActionButtons';
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
  const transactions = getSelectedDateTransactions(selectedDate, calendarData);
  const { useUpdateTransaction, useDeleteTransaction } = useStoreIdQuery();
  const updateMutation = useUpdateTransaction();
  const deleteMutation = useDeleteTransaction();

  const handleEdit = (transaction: DayDetailTransaction) => {
    updateMutation.mutate({
      id: storeId,
      transaction_id: transaction.transaction_id,
      data: transaction,
    });
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
    </>
  );
};

export default DailyDetails;
