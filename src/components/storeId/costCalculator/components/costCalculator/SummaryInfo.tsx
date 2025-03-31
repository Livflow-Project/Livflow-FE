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
      <ul className='flex flex-col items-start h-full px-5 text-xl justify-evenly'>
        <li className='flex items-center w-full'>
          <span className='input_label'>총 재료 원가 :</span>
          <span className='flex-1 text-center'>
            {Math.round(totalIngredientCost * 10) / 10} 원
          </span>
        </li>

        <li className='flex items-center w-full'>
          <label htmlFor='production_quantity' className='mr-2 input_label'>
            생산 수량 :
          </label>
          <input
            id='production_quantity'
            type='number'
            value={productionQuantity === null ? '' : productionQuantity}
            onChange={handleQuantityChange}
            min='1'
            className='flex-1 text-xl text-center input_underlined number_input'
          />
        </li>

        <li className='flex items-center w-full'>
          <span className='input_label'>생산 단가 :</span>
          <span className='flex-1 text-center'>
            {Math.round(unitCost * 10) / 10} 원
          </span>
        </li>
      </ul>
    </article>
  );
};

export default SummaryInfo;
