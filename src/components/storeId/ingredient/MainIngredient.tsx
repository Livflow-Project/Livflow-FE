import Button from '@/components/common/Button';
import ContentLoadingIndicator from '@/components/common/ContentLoadingIndicator';
import ErrorPage from '@/pages/status/errorPage';
import IngredientHeader from './components/IngredientHeader';
import IngredientList from './components/IngredientList';
import { IngredientResponse } from '@/api/storeId/ingredients/ingredients.type';
import IngredientsModal from './modal/IngredientsModal';
import IngredientsUsagesModal from './modal/IngredientsUsagesModal';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { useIngredientsQuery } from '@/api/storeId/ingredients/ingredients.hooks';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

const MainIngredient = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingIngredient, setEditingIngredient] =
    useState<IngredientResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{
    isOpen: boolean;
    ingredient: IngredientResponse | null;
  }>({
    isOpen: false,
    ingredient: null,
  });

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

  const handleDeleteClick = (ingredient: IngredientResponse) => {
    setDeleteConfirmModal({
      isOpen: true,
      ingredient,
    });
  };

  const handleDelete = (ingredient: IngredientResponse) => {
    deleteMutation.mutate(
      {
        storeId: storeId,
        ingredientId: ingredient.ingredient_id,
      },
      {
        onSuccess: () => {
          if (ingredients.length === 1) {
            setIsEditMode(false);
          }
        },
      }
    );
  };

  const handleModalOpen = () => {
    toast.dismiss();
    setIsModalOpen(true);
  };

  const toggleEditMode = () => {
    toast.dismiss();
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

  // 재료가 있는지 확인
  const hasIngredients = ingredients && ingredients.length > 0;

  return (
    <>
      <div className='flex h-full flex-col items-center justify-between px-[35px] py-[30px]'>
        <header className='flex w-full items-center justify-between gap-5'>
          <div className='h-[60px] w-[30%] min-w-[350px] rounded-lg bg-white/50'>
            <div className='flex h-full w-full items-center justify-evenly text-xl'>
              <span>{`총 등록된 재료 : ${ingredients?.length ?? 0}개`}</span>
              <div className='h-[40px] w-[1px] bg-caption'></div>
              <span>{`총 비용 : ${
                hasIngredients
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
            {(!hasIngredients || !isEditMode) && (
              <Button onClick={handleModalOpen}>재료 추가하기</Button>
            )}
            {hasIngredients && (
              <div className={twMerge('flex gap-5', !isEditMode && 'ml-5')}>
                <Button onClick={toggleEditMode}>
                  {isEditMode ? '완료하기' : '수정 / 삭제하기'}
                </Button>
              </div>
            )}
          </div>
        </header>

        <div className='h-[calc(100%-80px)] w-full overflow-hidden rounded-xl bg-white'>
          <IngredientHeader />

          <IngredientList
            ingredients={ingredients}
            isEditMode={isEditMode}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
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

      {deleteConfirmModal.isOpen && deleteConfirmModal.ingredient && (
        <IngredientsUsagesModal
          storeId={storeId}
          ingredient={deleteConfirmModal.ingredient}
          onClose={() =>
            setDeleteConfirmModal({ isOpen: false, ingredient: null })
          }
          onConfirmDelete={handleDelete}
        />
      )}
    </>
  );
};

export default MainIngredient;
