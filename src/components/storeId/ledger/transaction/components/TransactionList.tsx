import { DayDetailTransaction } from '@/api/storeId/storeId.type';
import TransactionItem from './TransactionItem';

type TransactionListProps = {
  transactions: DayDetailTransaction[] | null;
  isEditMode: boolean;
  onEdit: (transaction: DayDetailTransaction) => void;
  onDelete: (transaction: DayDetailTransaction) => void;
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
