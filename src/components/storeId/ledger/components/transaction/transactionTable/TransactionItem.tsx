import DeleteButton from '@/components/common/DeleteButton';
import EditButton from '@/components/common//EditButton';
import { TransactionResponse } from '@/api/storeId/ledger/transactions/transactions.type';
import { twMerge } from 'tailwind-merge';

type TransactionItemProps = {
  transaction: TransactionResponse;
  isLastItem: boolean;
  isEditMode: boolean;
  onEdit: (transaction: TransactionResponse) => void;
  onDelete: (transaction: TransactionResponse) => void;
};

const TransactionItem = ({
  transaction,
  isLastItem,
  isEditMode,
  onEdit,
  onDelete,
}: TransactionItemProps) => (
  <ul
    className={twMerge(
      'table_list',
      !isLastItem && 'border-b border-underline/30'
    )}
  >
    <li className='w-[30%]'>{transaction.category}</li>

    <li className='w-[40%]'>{transaction.detail}</li>

    <li
      className={twMerge(
        'w-[30%]',
        transaction.type === 'expense' ? 'text-red' : 'text-green'
      )}
    >
      {transaction.type === 'expense' ? '- ' : '+ '}
      {transaction.cost.toLocaleString()}원
    </li>

    {isEditMode && (
      <li className='table_list_action'>
        <EditButton onClick={() => onEdit(transaction)} />
        <DeleteButton onClick={() => onDelete(transaction)} />
      </li>
    )}
  </ul>
);

export default TransactionItem;
