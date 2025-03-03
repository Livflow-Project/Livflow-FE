import ContentLoadingIndicator from '@/components/common/ContentLoadingIndicator';
import CostCalculatorItem from './CostCalculatorItem';
import { InventoryItem } from '@/api/storeId/inventory/inventory.type';

type CostCalculatorListProps = {
  inventoryItems: InventoryItem[];
  isLoading?: boolean;
};

const CostCalculatorList = ({
  inventoryItems,
  isLoading,
}: CostCalculatorListProps) => {
  if (isLoading) {
    return <ContentLoadingIndicator />;
  }

  return (
    <div>
      {inventoryItems.map((item) => (
        <CostCalculatorItem key={item.ingredient_id} inventoryItem={item} />
      ))}
    </div>
  );
};

export default CostCalculatorList;
