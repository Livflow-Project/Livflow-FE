import ActionButtons from './components/button/ActionButtons';
import CalendarModal from '../modal/CalendarModal';
import { Transaction } from '@/api/storeId/ledger/transactions/transactions.type';
import TransactionHeader from './components/TransactionHeader';
import TransactionList from './components/TransactionList';
import { useState } from 'react';
import { useTransactionsQuery } from '@/api/storeId/ledger/transactions/transactions.hooks';

type MainTransactionProps = {
  selectedDate: string;
  storeId: string;
  onModalOpen: () => void;
};

const MainTransaction = ({
  selectedDate,
  storeId,
  onModalOpen,
}: MainTransactionProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // selectedDate에서 년,월,일 추출
  const [year, month, day] = selectedDate.split('-').map(Number);

  const { useGetAllTransactions } = useTransactionsQuery();
  const { data: transactions } = useGetAllTransactions(storeId, {
    year,
    month,
    day,
  });

  const { useDeleteTransaction } = useTransactionsQuery();
  const deleteMutation = useDeleteTransaction();

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = (transaction: Transaction) => {
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
