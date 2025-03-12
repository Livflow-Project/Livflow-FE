import Button from '@/components/common/Button';
import { CostCalculatorDetail } from '@/api/storeId/costCalculator/costCalculator.type';
import CostCalculatorHeader from './components/costCalculator/costCalculatorTable/CostCalculatorHeader';
import CostCalculatorList from './components/costCalculator/costCalculatorTable/CostCalculatorList';
import ErrorPage from '@/pages/status/errorPage';
import { FormProvider } from 'react-hook-form';
import Header from './components/costCalculator/Header';
import ImageUploader from './components/costCalculator/ImageUploader';
import SummaryInfo from './components/costCalculator/SummaryInfo';
import { useGetInventoryItems } from '@/api/storeId/inventory/inventory.hooks';
import { useOutletContext } from 'react-router-dom';
import { useRecipeForm } from '@/hooks/useRecipeForm';
import { useRecipeSubmit } from '@/hooks/useRecipeSubmit';

type MainCostCalculatorProps = {
  onSave: () => void;
  onCancel: () => void;
  recipeData?: CostCalculatorDetail;
  editOnly?: boolean;
};
const MainCostCalculator = ({
  onSave,
  onCancel,
  recipeData,
  editOnly = false,
}: MainCostCalculatorProps) => {
  const { storeId } = useOutletContext<{ storeId: string }>();

  const {
    methods,
    originalUsage,
    handleItemUsageChange,
    handleTotalCostChange,
  } = useRecipeForm(recipeData);

  const { onSubmit, isPending } = useRecipeSubmit(
    onSave,
    recipeData,
    editOnly,
    originalUsage
  );

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
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => onSubmit(data, methods))}
        className='flex h-full justify-between px-[35px] py-[30px]'
      >
        <div className='flex h-full w-[70%] flex-col justify-between'>
          <Header />

          <article className='h-[calc(100%-80px)] w-full overflow-hidden rounded-xl bg-white'>
            <CostCalculatorHeader />

            <CostCalculatorList
              inventoryItems={inventoryItems || []}
              isLoading={isLoading}
              onTotalCostChange={handleTotalCostChange}
              onItemUsageChange={handleItemUsageChange}
            />
          </article>
        </div>

        <div className='flex h-full w-[28%] flex-col justify-between'>
          <SummaryInfo />

          <ImageUploader />

          <div className='flex items-center justify-between'>
            <Button type={'button'} onClick={onCancel}>
              취소하기
            </Button>
            <Button type={'submit'}>
              {isPending
                ? '저장 중...'
                : editOnly
                  ? '메뉴 수정하기'
                  : '메뉴 저장하기'}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default MainCostCalculator;
