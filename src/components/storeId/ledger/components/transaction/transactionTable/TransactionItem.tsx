import DeleteButton from '@/components/common/DeleteButton';
import EditButton from '@/components/common//EditButton';
import { TransactionResponse } from '@/api/storeId/ledger/transactions/transactions.type';
import { twMerge } from 'tailwind-merge';

type TransactionItemProps = {
  transaction: TransactionResponse;
  isEditMode: boolean;
  onEdit: (transaction: TransactionResponse) => void;
  onDelete: (transaction: TransactionResponse) => void;
};

const TransactionItem = ({
  transaction,
  isEditMode,
  onEdit,
  onDelete,
}: TransactionItemProps) => (
  <ul className='relative flex h-[45px] w-full flex-shrink-0 items-center border-b border-underline/30 text-center'>
    <li className='w-[30%] text-lg font-normal'>{transaction.category}</li>

    <li className='w-[40%] text-lg font-normal'>{transaction.detail}</li>

    <li
      className={twMerge(
        'w-[30%] text-lg font-normal',
        transaction.type === 'expense' ? 'text-red' : 'text-green'
      )}
    >
      {transaction.type === 'expense' ? '- ' : '+ '}
      {transaction.cost.toLocaleString()}원
    </li>

    {isEditMode && (
      <li className='absolute inset-0 flex items-center justify-center gap-4 bg-white/50'>
        <EditButton onClick={() => onEdit(transaction)} />
        <DeleteButton onClick={() => onDelete(transaction)} />
      </li>
    )}
  </ul>
);

export default TransactionItem;
