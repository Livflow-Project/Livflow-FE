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
  const { watch } = useFormContext();

  const [itemCosts, setItemCosts] = useState<{ [key: string]: number }>({});

  const ingredientsUsage = watch('ingredients_usage');

  const totalCost = Object.values(itemCosts).reduce(
    (sum, cost) => sum + cost,
    0
  );

  const handleItemCostChange = useCallback(
    (itemId: string, cost: number, amount: number) => {
      setItemCosts((prev) => ({
        ...prev,
        [itemId]: cost,
      }));

      onItemUsageChange(itemId, amount);
    },
    [onItemUsageChange]
  );

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
