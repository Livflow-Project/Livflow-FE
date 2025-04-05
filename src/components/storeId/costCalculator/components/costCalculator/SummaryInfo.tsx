import { useFormContext } from 'react-hook-form';

const SummaryInfo = () => {
  const { watch, setValue } = useFormContext();

  const totalIngredientCost = watch('total_ingredient_cost') || 0;
  const productionQuantity = watch('production_quantity');

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setValue('production_quantity', null);
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setValue('production_quantity', numValue);
      }
    }
  };

  const unitCost =
    productionQuantity && productionQuantity > 0
      ? Math.round(totalIngredientCost / productionQuantity)
      : 0;

  return (
    <article className='h-[30%] w-full rounded-xl bg-white/50'>
      <ul className='flex h-full flex-col items-start justify-evenly px-5'>
        <li className='flex w-full items-center'>
          <span className='costCalculator_label'>총 재료 원가 :</span>
          <span className='mr-2 flex-1 text-center font-normal text-main'>
            {Math.round(totalIngredientCost * 10) / 10} 원
          </span>
        </li>

        <li className='flex w-full items-center'>
          <label htmlFor='production_quantity' className='costCalculator_label'>
            생산 수량 :
          </label>
          <input
            id='production_quantity'
            type='number'
            value={productionQuantity === null ? '' : productionQuantity}
            onChange={handleQuantityChange}
            min='1'
            className='input_underlined number_input flex-1'
          />
        </li>

        <li className='flex w-full items-center'>
          <span className='costCalculator_label'>생산 단가 :</span>
          <span className='mr-2 flex-1 text-center font-normal text-main'>
            {Math.round(unitCost * 10) / 10} 원
          </span>
        </li>
      </ul>
    </article>
  );
};

export default SummaryInfo;
