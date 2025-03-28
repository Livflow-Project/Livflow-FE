import { IngredientRequest } from '@/api/storeId/ingredients/ingredients.type';
import { UseFormRegister } from 'react-hook-form';

type UnitRadioGroupProps = {
  register: UseFormRegister<IngredientRequest>;
};

const UnitRadioGroup = ({ register }: UnitRadioGroupProps) => (
  <li className='flex items-center justify-between'>
    <div className='relative flex items-center gap-2'>
      <span className='input_label'>단위</span>
      <span className='absolute -right-1.5 -top-2 text-red'>*</span>
    </div>
    <div className='flex h-[42px] w-[60%] items-center justify-around'>
      {['ml', 'g', 'ea'].map((unit) => (
        <label key={unit} className='flex items-center'>
          <input
            type='radio'
            value={unit}
            {...register('unit')}
            className='h-5 w-5'
          />
          <span className='ml-2 text-lg text-main'>{unit}</span>
        </label>
      ))}
    </div>
  </li>
);

export default UnitRadioGroup;
