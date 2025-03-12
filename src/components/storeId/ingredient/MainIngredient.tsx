import Button from '@/components/common/Button';
import ContentLoadingIndicator from '@/components/common/ContentLoadingIndicator';
import ErrorPage from '@/pages/status/errorPage';
import IngredientHeader from './components/IngredientHeader';
import IngredientList from './components/IngredientList';
import { IngredientResponse } from '@/api/storeId/ingredients/ingredients.type';
import IngredientsModal from './modal/IngredientsModal';
import { useIngredientsQuery } from '@/api/storeId/ingredients/ingredients.hooks';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

const MainIngredient = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingIngredient, setEditingIngredient] =
    useState<IngredientResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { useGetAllIngredients, useDeleteIngredient } = useIngredientsQuery();

  const { storeId } = useOutletContext<{ storeId: string }>();

  const {
    data: ingredients,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllIngredients(storeId);
  const deleteMutation = useDeleteIngredient();

  const handleEdit = (ingredient: IngredientResponse) => {
    setEditingIngredient(ingredient);
    setIsModalOpen(true);
  };

  const handleDelete = (ingredient: IngredientResponse) => {
    deleteMutation.mutate({
      storeId: storeId,
      ingredientId: ingredient.ingredient_id,
    });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // 로딩 상태 처리
  if (isLoading) {
    return <ContentLoadingIndicator />;
  }

  // 에러 상태 처리
  if (isError) {
    return <ErrorPage error={error as Error} resetError={() => refetch()} />;
  }

  return (
    <>
      <div className='flex h-full flex-col items-center justify-between px-[35px] py-[30px]'>
        <header className='flex w-full items-center justify-between gap-5'>
          <div className='h-[60px] w-[30%] min-w-[350px] rounded-lg bg-white/50'>
            <div className='flex h-full w-full items-center justify-evenly text-xl'>
              <span>{`총 등록된 재료 : ${ingredients?.length ?? 0}개`}</span>
              <div className='h-[40px] w-[1px] bg-caption'></div>
              <span>{`총 비용 : ${
                ingredients.length > 0
                  ? ingredients.reduce(
                      (sum: number, ingredient: IngredientResponse) =>
                        sum + ingredient.ingredient_cost,
                      0
                    )
                  : 0
              }원`}</span>
            </div>
          </div>

          <div className='flex items-center'>
            {!isEditMode && (
              <Button onClick={handleModalOpen}>재료 추가하기</Button>
            )}
            <div className={`${isEditMode ? '' : 'ml-5'} flex gap-5`}>
              <Button onClick={toggleEditMode}>
                {isEditMode ? '완료하기' : '수정 / 삭제하기'}
              </Button>
            </div>
          </div>
        </header>

        <div className='h-[calc(100%-80px)] w-full overflow-hidden rounded-xl bg-white'>
          <IngredientHeader />

          <IngredientList
            ingredients={ingredients}
            isEditMode={isEditMode}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {isModalOpen && (
        <IngredientsModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingIngredient(null);
          }}
          storeId={storeId}
          isEditMode={!!editingIngredient}
          initialData={editingIngredient || undefined}
        />
      )}
    </>
  );
};

export default MainIngredient;
