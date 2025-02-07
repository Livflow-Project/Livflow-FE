import { Transaction } from '@/api/storeId/ledger/transactions/transactions.type';
import TransactionItem from './TransactionItem';

type TransactionListProps = {
  transactions: Transaction[] | null;
  isEditMode: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
};

const TransactionList = ({
  transactions,
  isEditMode,
  onEdit,
  onDelete,
}: TransactionListProps) => (
  <div className='flex h-[calc(100%-130px)] w-full flex-col'>
    {transactions && transactions.length > 0 ? (
      transactions.map((transaction) => (
        <TransactionItem
          key={transaction.transaction_id}
          transaction={transaction}
          isEditMode={isEditMode}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))
    ) : (
      <div className='my-auto w-full text-center text-2xl text-main'>
        입력된 지출 / 수입이 없습니다.
      </div>
    )}
  </div>
);

export default TransactionList;
