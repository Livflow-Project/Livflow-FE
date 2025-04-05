import { Controller, useFormContext } from 'react-hook-form';

import { InventoryItem } from '@/api/storeId/inventory/inventory.type';
import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';

type CostCalculatorItemProps = {
  inventoryItem: InventoryItem;
  totalCost: number;
  isLastItem: boolean;
  initialAmount?: number;
  onCostChange: (cost: number, amount: number) => void;
};

type FormValues = {
  ingredients_usage: {
    [key: string]: number;
  };
};

const CostCalculatorItem = ({
  inventoryItem,
  totalCost,
  isLastItem,
  initialAmount = 0,
  onCostChange,
}: CostCalculatorItemProps) => {
  // 폼 컨텍스트 사용
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();

  // 현재 필드의 오류 확인 (타입 단언 사용)
  const fieldError = errors?.ingredients_usage?.[inventoryItem.ingredient_id];

  // 현재 입력값 감시 (전체 폼 컨텍스트에서)
  const usedAmount =
    watch(`ingredients_usage.${inventoryItem.ingredient_id}`) || 0;

  // 재료 원가 계산
  const calculatedCost = usedAmount * (inventoryItem.unit_cost || 0);

  // 원가 비율 계산
  const costRatio =
    totalCost > 0 ? Math.round((calculatedCost / totalCost) * 100) : 0;

  // 원가가 변경될 때마다 상위 컴포넌트에 알림
  useEffect(() => {
    onCostChange(calculatedCost, usedAmount);
  }, [calculatedCost, usedAmount]);

  return (
    <ul
      className={twMerge(
        'table_list h-10',
        !isLastItem && 'border-b border-underline/30'
      )}
    >
      <li className='text-x w-[20%] min-w-20'>
        {inventoryItem.ingredient_name}
      </li>

      <li className='w-[15%]'>{inventoryItem.remaining_stock}</li>

      <li className='w-[20%]'>
        <Controller
          name={`ingredients_usage.${inventoryItem.ingredient_id}`}
          control={control}
          defaultValue={initialAmount}
          render={({ field }) => (
            <input
              type='number'
              value={field.value || ''}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                if (value >= 0) {
                  field.onChange(value);
                  onCostChange(calculatedCost, value);
                }
              }}
              min='0'
              placeholder='사용량 입력'
              className={twMerge(
                'number_input h-[30px] w-[70%] rounded-full bg-blue-300/50 text-center shadow-sm outline-none focus:outline-none focus:ring-0',
                fieldError
                  ? 'border-red-500 animate-blinkingBorder border-2'
                  : 'border-none focus:border-none'
              )}
            />
          )}
        />
      </li>

      <li className='w-[10%]'>{inventoryItem.unit}</li>

      <li className='w-[20%]'>{Math.round(calculatedCost * 10) / 10} 원</li>

      <li className='w-[15%]'>{costRatio}%</li>
    </ul>
  );
};

export default CostCalculatorItem;
