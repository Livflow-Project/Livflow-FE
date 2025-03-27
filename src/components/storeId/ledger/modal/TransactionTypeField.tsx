import { TransactionRequest } from '@/api/storeId/ledger/transactions/transactions.type';
import { UseFormRegister } from 'react-hook-form';

type TransactionTypeFieldProps = {
  register: UseFormRegister<TransactionRequest>;
};

const TransactionTypeField = ({ register }: TransactionTypeFieldProps) => {
  return (
    <li className='flex items-center justify-between'>
      <div className='relative flex items-center gap-2'>
        <label className='input_label'>지출 / 수입</label>
        <span className='absolute -right-1.5 -top-2 text-red'>*</span>
      </div>

      <div className='flex h-[42px] w-[60%] items-center justify-around'>
        {['expense', 'income'].map((type) => (
          <label key={type} className='flex items-center'>
            <input
              type='radio'
              value={type}
              {...register('type')}
              className='h-5 w-5'
            />
            <span className='ml-2 text-lg text-main'>
              {type === 'expense' ? '지출' : '수입'}
            </span>
          </label>
        ))}
      </div>
    </li>
  );
};

export default TransactionTypeField;
