import { TransactionResponse } from '@/api/storeId/ledger/transactions/transactions.type';
import { twMerge } from 'tailwind-merge';
import IconButton from '@/components/common/IconButton';

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
        <IconButton type='edit' onClick={() => onEdit(transaction)} />
        <IconButton type='delete' onClick={() => onDelete(transaction)} />
      </li>
    )}
  </ul>
);

export default TransactionItem;
