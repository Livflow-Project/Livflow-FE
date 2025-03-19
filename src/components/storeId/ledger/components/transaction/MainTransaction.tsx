import ActionButtons from './transactionTable/button/ActionButtons';
import LedgerModal from '../../modal/LedgerModal';
import TransactionHeader from './transactionTable/TransactionHeader';
import TransactionList from './transactionTable/TransactionList';
import { TransactionResponse } from '@/api/storeId/ledger/transactions/transactions.type';
import { toast } from 'react-toastify';
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
    useState<TransactionResponse | null>(null);
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

  const handleEdit = (transaction: TransactionResponse) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = (transaction: TransactionResponse) => {
    deleteMutation.mutate(
      {
        storeId: storeId,
        transactionId: transaction.transaction_id,
      },
      {
        onSuccess: () => {
          if (transactions && transactions.length === 1) {
            setIsEditMode(false);
          }
        },
      }
    );
  };

  const handleEditModeToggle = () => {
    toast.dismiss();
    setIsEditMode(!isEditMode);
  };

  const hasTransactions = transactions && transactions.length > 0;

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
        isEditMode={isEditMode && hasTransactions}
        onEditModeToggle={handleEditModeToggle}
        onModalOpen={onModalOpen}
        hasTransactions={hasTransactions}
      />

      {isModalOpen && editingTransaction && (
        <LedgerModal
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
