import { useFormContext } from 'react-hook-form';

const SummaryInfo = () => {
  // React Hook Form 컨텍스트 사용
  const { watch, setValue } = useFormContext();

  // 총 원가와 생산량 감시
  const totalIngredientCost = watch('total_ingredient_cost') || 0;
  const productionQuantity = watch('production_quantity');

  // 생산량 변경 핸들러
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

  // 개당 원가 계산
  const unitCost =
    productionQuantity && productionQuantity > 0
      ? Math.round(totalIngredientCost / productionQuantity)
      : 0;

  return (
    <article className='h-[30%] w-full rounded-xl bg-white/50'>
      <ul className='flex h-full flex-col items-start justify-evenly px-5 text-xl'>
        <li className='flex w-full items-center'>
          <span className='input_label'>총 재료 원가 :</span>
          <span className='flex-1 text-center'>
            {totalIngredientCost.toLocaleString()} 원
          </span>
        </li>

        <li className='flex w-full items-center'>
          <label htmlFor='production_quantity' className='input_label mr-2'>
            생산 수량 :
          </label>
          <input
            id='production_quantity'
            type='number'
            value={productionQuantity === null ? '' : productionQuantity}
            onChange={handleQuantityChange}
            min='1'
            className='input_underlined number_input flex-1 text-center text-xl'
          />
        </li>

        <li className='flex w-full items-center'>
          <span className='input_label'>생산 단가 :</span>
          <span className='flex-1 text-center'>
            {unitCost.toLocaleString()} 원
          </span>
        </li>
      </ul>
    </article>
  );
};

export default SummaryInfo;
