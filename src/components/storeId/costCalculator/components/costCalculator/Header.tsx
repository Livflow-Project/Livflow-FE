import { twMerge } from 'tailwind-merge';
import { useFormContext } from 'react-hook-form';

type FormValues = {
  recipe_name: string;
  recipe_cost: number | null;
  is_favorites: boolean;
};

const Header = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();

  const nameError = errors.recipe_name;

  const isFavorite = watch('is_favorites');
  const recipeCost = watch('recipe_cost');

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? null : parseInt(e.target.value);
    setValue('recipe_cost', value);
  };

  return (
    <header className='flex h-[60px] w-full items-center justify-evenly rounded-lg bg-white'>
      <div className='flex w-[40%] items-center justify-center'>
        <label
          htmlFor='menu_name '
          className='costCalculator_label min-w-[28px] shrink-0'
        >
          메뉴 이름 :
        </label>
        <input
          id='menu_name'
          type='text'
          className={twMerge(
            'input_underlined w-[60%] min-w-0',
            nameError ? 'animate-blinkingBorder border-b-2' : ''
          )}
          {...register('recipe_name')}
        />
      </div>

      <div className='h-[40px] w-[1px] bg-caption'></div>

      <div className='flex w-[40%] items-center justify-center'>
        <label
          htmlFor='menu_cost'
          className='costCalculator_label min-w-[28px] shrink-0'
        >
          판매 가격 :
        </label>
        <input
          id='menu_cost'
          type='number'
          className='input_underlined number_input h-full'
          value={recipeCost === null ? '' : recipeCost}
          onChange={handleCostChange}
        />
        <span className='text-lg font-medium text-main'>원</span>
      </div>

      <div className='h-[40px] w-[1px] bg-caption'></div>

      <div className='flex w-[15%] items-center justify-center'>
        <label
          htmlFor='favorites_checkbox'
          className='costCalculator_label min-w-[28px] shrink-0 cursor-pointer'
        >
          즐겨찾기
        </label>
        <input
          id='favorites_checkbox'
          type='checkbox'
          className='h-5 w-5 cursor-pointer rounded border-gray-300 text-green shadow-sm focus:ring-0 focus:ring-offset-0'
          checked={isFavorite}
          onChange={(e) => setValue('is_favorites', e.target.checked)}
        />
      </div>
    </header>
  );
};

export default Header;
