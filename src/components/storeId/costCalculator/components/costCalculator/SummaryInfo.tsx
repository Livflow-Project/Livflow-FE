import { useState } from 'react';

type SummaryInfoProps = {
  totalIngredientCost: number;
};

const SummaryInfo = ({ totalIngredientCost }: SummaryInfoProps) => {
  const [productionQuantity, setProductionQuantity] = useState<number | null>(
    null
  );

  // 생산 단가 계산
  const productionUnitCost =
    productionQuantity && productionQuantity > 0
      ? totalIngredientCost / productionQuantity
      : 0;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? null : parseInt(e.target.value);

    // 값이 null이거나 양수인 경우에만 상태 업데이트
    if (value === null || value > 0) {
      setProductionQuantity(value);
    }
  };

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
            {productionUnitCost.toLocaleString()} 원
          </span>
        </li>
      </ul>
    </article>
  );
};

export default SummaryInfo;
