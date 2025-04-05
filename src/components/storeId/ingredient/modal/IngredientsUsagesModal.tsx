import ConfirmModal from '@/components/common/ConfirmModal';
import ContentLoadingIndicator from '@/components/common/ContentLoadingIndicator';
import { IngredientResponse } from '@/api/storeId/ingredients/ingredients.type';
import { useIngredientsQuery } from '@/api/storeId/ingredients/ingredients.hooks';

type IngredientsUsagesModalProps = {
  storeId: string;
  ingredient: IngredientResponse;
  onClose: () => void;
  onConfirmDelete: (ingredient: IngredientResponse) => void;
};

const IngredientsUsagesModal = ({
  storeId,
  ingredient,
  onClose,
  onConfirmDelete,
}: IngredientsUsagesModalProps) => {
  const { useGetIngredientUsages } = useIngredientsQuery();

  const { data: usages, isLoading } = useGetIngredientUsages(
    storeId,
    ingredient.ingredient_id
  );

  const handleConfirm = () => {
    onConfirmDelete(ingredient);
  };

  if (isLoading) return <ContentLoadingIndicator />;

  const title =
    usages && usages.length > 0 ? '사용 중인 재료 삭제 확인' : '재료 삭제 확인';

  return (
    <ConfirmModal title={title} onClose={onClose} onConfirm={handleConfirm}>
      {usages && usages.length > 0 ? (
        <div className='flex flex-col items-center gap-4'>
          <p className='font-semibold text-red'>
            이 재료는 다음 메뉴에서 사용 중입니다:
          </p>
          <div className='w-full rounded-md bg-gray-100 p-4 text-center'>
            {usages.map((menu: string, index: number) => (
              <span key={index} className='text-xl'>
                <span className='font-bold'>{menu}</span>
                {index < usages.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
          <p className='mt-2 font-semibold text-red/60'>
            삭제하면 위 메뉴에서 이 재료가 제거됩니다.
          </p>
          <p className='font-medium'>정말 삭제하시겠습니까?</p>
        </div>
      ) : (
        <div className='text-center'>
          <p className='mb-3 text-lg font-medium'>
            <span className='font-bold text-primary'>
              {ingredient.ingredient_name}
            </span>
            을 삭제하시겠습니까?
          </p>
          <p className='text-caption'>이 작업은 되돌릴 수 없습니다.</p>
        </div>
      )}
    </ConfirmModal>
  );
};

export default IngredientsUsagesModal;
