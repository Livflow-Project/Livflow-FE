import { useCallback, useEffect, useState } from 'react';

import ContentLoadingIndicator from '@/components/common/ContentLoadingIndicator';
import CostCalculatorItem from './CostCalculatorItem';
import { InventoryItem } from '@/api/storeId/inventory/inventory.type';

type CostCalculatorListProps = {
  inventoryItems: InventoryItem[];
  isLoading?: boolean;
  onTotalCostChange: (totalCost: number) => void;
};

const CostCalculatorList = ({
  inventoryItems,
  isLoading,
  onTotalCostChange,
}: CostCalculatorListProps) => {
  // 각 아이템의 사용량과 계산된 원가를 저장할 상태
  const [itemCosts, setItemCosts] = useState<{ [key: string]: number }>({});

  // 총 원가 계산
  const totalCost = Object.values(itemCosts).reduce(
    (sum, cost) => sum + cost,
    0
  );

  // 아이템 원가 업데이트 핸들러 - useCallback으로 메모이제이션
  const handleItemCostChange = useCallback((itemId: string, cost: number) => {
    setItemCosts((prev) => ({
      ...prev,
      [itemId]: cost,
    }));
  }, []);

  // 총 원가가 변경될 때 상위 컴포넌트에 알림
  useEffect(() => {
    onTotalCostChange(totalCost);
  }, [totalCost, onTotalCostChange]);

  if (isLoading) {
    return <ContentLoadingIndicator />;
  }

  return (
    <div>
      {inventoryItems.map((item) => (
        <CostCalculatorItem
          key={item.ingredient_id}
          inventoryItem={item}
          totalCost={totalCost}
          onCostChange={(cost) =>
            handleItemCostChange(item.ingredient_id, cost)
          }
        />
      ))}
    </div>
  );
};

export default CostCalculatorList;
