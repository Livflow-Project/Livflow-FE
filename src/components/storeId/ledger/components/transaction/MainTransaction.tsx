import { useCallback, useMemo, useState } from 'react';

import ActionButtons from './transactionTable/button/ActionButtons';
import LedgerModal from '../../modal/LedgerModal';
import TransactionHeader from './transactionTable/TransactionHeader';
import TransactionList from './transactionTable/TransactionList';
import { TransactionResponse } from '@/api/storeId/ledger/transactions/transactions.type';
import { toast } from 'react-toastify';
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

  // 날짜 파싱
  const dateParts = useMemo(() => {
    return selectedDate.split('-').map(Number) as [number, number, number];
  }, [selectedDate]);

  const [year, month, day] = dateParts;

  const { useGetAllTransactions, useDeleteTransaction } =
    useTransactionsQuery();
  const { data: transactions } = useGetAllTransactions(storeId, {
    year,
    month,
    day,
  });
  const deleteMutation = useDeleteTransaction();

  // 트랜잭션 존재 여부
  const hasTransactions = Boolean(transactions?.length);

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
          // 마지막 트랜잭션이 삭제되면 편집 모드 종료
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

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  }, []);

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
          onClose={handleModalClose}
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
