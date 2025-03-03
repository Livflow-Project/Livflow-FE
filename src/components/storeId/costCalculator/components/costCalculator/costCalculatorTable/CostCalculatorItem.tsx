import { useEffect, useState } from 'react';

import { InventoryItem } from '@/api/storeId/inventory/inventory.type';

type CostCalculatorItemProps = {
  inventoryItem: InventoryItem;
  totalCost: number;
  onCostChange: (cost: number) => void;
};

const CostCalculatorItem = ({
  inventoryItem,
  totalCost,
  onCostChange,
}: CostCalculatorItemProps) => {
  // 사용량을 저장할 상태 추가
  const [usedAmount, setUsedAmount] = useState<number>(0);

  // 재료 원가 계산
  const calculatedCost = usedAmount * (inventoryItem.unit_cost || 0);

  // 원가 비율 계산
  const costRatio =
    totalCost > 0 ? Math.round((calculatedCost / totalCost) * 100) : 0;

  // 사용량 변경 핸들러
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;

    // 음수 및 재고보다 많은 수량 방지
    if (value >= 0 && value <= inventoryItem.remaining_stock) {
      setUsedAmount(value);
    }
  };

  // 원가가 변경될 때마다 상위 컴포넌트에 알림
  useEffect(() => {
    onCostChange(calculatedCost);
  }, [calculatedCost]);

  return (
    <ul className='relative flex h-[45px] w-full items-center border-b border-underline/30 text-center text-lg font-normal'>
      <li className='text-x w-[20%] min-w-20'>
        {inventoryItem.ingredient_name}
      </li>

      <li className='w-[15%]'>{inventoryItem.remaining_stock}</li>

      <li className='w-[20%]'>
        <input
          type='number'
          value={usedAmount || ''}
          onChange={handleAmountChange}
          min='0'
          max={inventoryItem.remaining_stock}
          className='number_input h-full w-[70%] rounded-full border-none bg-background text-center'
        />
      </li>

      <li className='w-[10%]'>{inventoryItem.unit}</li>

      <li className='w-[20%]'>{calculatedCost.toLocaleString()} 원</li>

      <li className='w-[15%]'>{costRatio}%</li>
    </ul>
  );
};

export default CostCalculatorItem;
