import { InventoryItem } from '@/api/storeId/inventory/inventory.type';

type CostCalculatorItemProps = {
  inventoryItem: InventoryItem;
};

const CostCalculatorItem = ({ inventoryItem }: CostCalculatorItemProps) => (
  <ul className='relative flex h-[45px] w-full items-center border-b border-underline/30 text-center text-lg font-normal'>
    <li className='text-x w-[20%] min-w-20'>{inventoryItem.ingredient_name}</li>

    <li className='w-[15%]'>{inventoryItem.remaining_stock}</li>

    <li className='w-[20%]'>
      <input className='number_input h-full w-[70%] rounded-full border-none bg-background text-center' />
    </li>

    <li className='w-[10%]'>{inventoryItem.unit}</li>

    <li className='w-[20%]'>재료 원가</li>

    <li className='w-[15%]'>원가 비율</li>
  </ul>
);

export default CostCalculatorItem;
