import { useCallback, useEffect, useState } from 'react';

import ContentLoadingIndicator from '@/components/common/ContentLoadingIndicator';
import CostCalculatorItem from './CostCalculatorItem';
import { InventoryItem } from '@/api/storeId/inventory/inventory.type';
import { useFormContext } from 'react-hook-form';

type CostCalculatorListProps = {
  inventoryItems: InventoryItem[];
  isLoading?: boolean;
  onTotalCostChange: (totalCost: number) => void;
  onItemUsageChange: (itemId: string, amount: number) => void;
};

const CostCalculatorList = ({
  inventoryItems,
  isLoading,
  onTotalCostChange,
  onItemUsageChange,
}: CostCalculatorListProps) => {
  // React Hook Form 컨텍스트 사용
  const { watch } = useFormContext();

  // 각 아이템의 사용량과 계산된 원가를 저장할 상태
  const [itemCosts, setItemCosts] = useState<{ [key: string]: number }>({});

  // 재료 사용량 가져오기
  const ingredientsUsage = watch('ingredients_usage');

  // 총 원가 계산
  const totalCost = Object.values(itemCosts).reduce(
    (sum, cost) => sum + cost,
    0
  );

  // 아이템 원가 업데이트 핸들러 - useCallback으로 메모이제이션
  const handleItemCostChange = useCallback(
    (itemId: string, cost: number, amount: number) => {
      setItemCosts((prev) => ({
        ...prev,
        [itemId]: cost,
      }));

      // 상위 컴포넌트에 사용량 전달
      onItemUsageChange(itemId, amount);
    },
    [onItemUsageChange]
  );

  // 총 원가가 변경될 때 상위 컴포넌트에 알림
  useEffect(() => {
    onTotalCostChange(totalCost);
  }, [totalCost, onTotalCostChange]);

  if (isLoading) {
    return <ContentLoadingIndicator />;
  }

  return (
    <>
      {Array.isArray(inventoryItems) && inventoryItems.length > 0 ? (
        inventoryItems.map((item, index) => (
          <CostCalculatorItem
            key={item.ingredient_id}
            inventoryItem={item}
            totalCost={totalCost}
            isLastItem={index === inventoryItems.length - 1}
            onCostChange={(cost, amount) =>
              handleItemCostChange(item.ingredient_id, cost, amount)
            }
            initialAmount={ingredientsUsage[item.ingredient_id] || 0}
          />
        ))
      ) : (
        <div className='flex h-[calc(100%-65px)] w-full items-center justify-center'>
          <p className='text-lg text-caption'>저장된 재료가 없습니다.</p>
        </div>
      )}
    </>
  );
};

export default CostCalculatorList;
