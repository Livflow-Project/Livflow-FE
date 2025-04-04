import { Control, Controller, FieldErrors } from 'react-hook-form';

import CustomSelect from './CustomSelect';
import { TRANSACTION_CATEGORIES } from './categories';
import { TransactionRequest } from '@/api/storeId/ledger/transactions/transactions.type';

type CategoryFieldProps = {
  control: Control<TransactionRequest>;
  errors: FieldErrors<TransactionRequest>;
};

const CategoryField = ({ control, errors }: CategoryFieldProps) => {
  return (
    <li className='flex items-center justify-between'>
      <div className='relative flex items-center gap-2'>
        <label className='input_label'>카테고리</label>
        <span className='absolute -right-1.5 -top-2 text-red'>*</span>
      </div>

      <Controller
        name='category'
        control={control}
        render={({ field }) => (
          <CustomSelect
            value={TRANSACTION_CATEGORIES.find(
              (cat) => cat.value === field.value
            )}
            onChange={(option) => field.onChange(option.value)}
            hasError={!!errors.category}
          />
        )}
      />
    </li>
  );
};

export default CategoryField;
