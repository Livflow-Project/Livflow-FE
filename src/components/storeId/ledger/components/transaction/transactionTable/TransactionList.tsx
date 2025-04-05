import TransactionItem from './TransactionItem';
import { TransactionResponse } from '@/api/storeId/ledger/transactions/transactions.type';

type TransactionListProps = {
  transactions: TransactionResponse[] | null;
  isEditMode: boolean;
  onEdit: (transaction: TransactionResponse) => void;
  onDelete: (transaction: TransactionResponse) => void;
};

const TransactionList = ({
  transactions,
  isEditMode,
  onEdit,
  onDelete,
}: TransactionListProps) => (
  <div className='flex h-[calc(100%-125px)] w-full flex-col overflow-y-auto'>
    {transactions && transactions.length > 0 ? (
      transactions.map((transaction, index) => (
        <TransactionItem
          key={transaction.transaction_id}
          transaction={transaction}
          isLastItem={index === transactions.length - 1}
          isEditMode={isEditMode}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))
    ) : (
      <div className='my-auto w-full pt-[35px] text-center text-lg text-caption'>
        추가된 지출 / 수입이 없습니다.
      </div>
    )}
  </div>
);

export default TransactionList;
