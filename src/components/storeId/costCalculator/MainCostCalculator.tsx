import Button from '@/components/common/Button';
import CostCalculatorHeader from './components/costCalculator/costCalculatorTable/CostCalculatorHeader';
import CostCalculatorList from './components/costCalculator/costCalculatorTable/CostCalculatorList';
import ErrorPage from '@/pages/status/errorPage';
import Header from './components/costCalculator/Header';
import ImageUploader from './components/costCalculator/ImageUploader';
import SummaryInfo from './components/costCalculator/SummaryInfo';
import { useGetInventoryItems } from '@/api/storeId/inventory/inventory.hooks';
import { useStore } from '@/contexts/StoreContext';

type MainCostCalculatorProps = {
  onSave: () => void;
  onCancel: () => void;
};

const MainCostCalculator = ({ onSave, onCancel }: MainCostCalculatorProps) => {
  // 스토어 컨텍스트에서 storeId 가져오기
  const { storeInfo } = useStore();
  const storeId = storeInfo?.id || '';

  // 재료 목록 데이터 가져오기
  const {
    data: inventoryItems,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetInventoryItems(storeId);

  if (isError) {
    return <ErrorPage error={error as Error} resetError={() => refetch()} />;
  }

  return (
    <div className='flex h-full justify-between px-[35px] py-[30px]'>
      <div className='flex h-full w-[70%] flex-col justify-between'>
        <Header />

        <article className='h-[calc(100%-80px)] w-full rounded-xl bg-white'>
          <CostCalculatorHeader />

          <CostCalculatorList
            inventoryItems={inventoryItems || []}
            isLoading={isLoading}
          />
        </article>
      </div>

      <div className='flex h-full w-[28%] flex-col justify-between'>
        <SummaryInfo />

        <ImageUploader />

        <div className='flex items-center justify-between'>
          <Button onClick={onCancel}>취소하기</Button>
          <Button onClick={onSave}>메뉴 저장하기</Button>
        </div>
      </div>
    </div>
  );
};

export default MainCostCalculator;
