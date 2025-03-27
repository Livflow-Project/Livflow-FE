import { Control, Controller, FieldErrors } from 'react-hook-form';
import {
  TRANSACTION_CATEGORIES,
  TRANSACTION_CATEGORIES_GROUPED,
} from './categories';

import Select from 'react-select';
import { TransactionRequest } from '@/api/storeId/ledger/transactions/transactions.type';
import { selectStyles } from './selectStyles';

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
          <Select
            {...field}
            options={TRANSACTION_CATEGORIES_GROUPED.map((group) => ({
              label: group.group,
              options: group.items,
            }))}
            placeholder='카테고리 입력 또는 선택'
            styles={selectStyles(!!errors.category)}
            classNamePrefix='select'
            isSearchable={true}
            onChange={(option) => field.onChange(option?.value)}
            value={TRANSACTION_CATEGORIES.find(
              (cat) => cat.value === field.value
            )}
          />
        )}
      />
    </li>
  );
};

export default CategoryField;
