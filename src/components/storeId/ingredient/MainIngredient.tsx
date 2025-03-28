import { useCallback, useState } from 'react';

import ActionButtons from './components/button/ActionButtons';
import ContentLoadingIndicator from '@/components/common/ContentLoadingIndicator';
import ErrorPage from '@/pages/status/errorPage';
import IngredientHeader from './components/ingredientTable/IngredientHeader';
import IngredientList from './components/ingredientTable/IngredientList';
import { IngredientResponse } from '@/api/storeId/ingredients/ingredients.type';
import IngredientSummary from './components/IngredientSummary';
import IngredientsModal from './modal/IngredientsModal';
import IngredientsUsagesModal from './modal/IngredientsUsagesModal';
import { toast } from 'react-toastify';
import { useIngredientsQuery } from '@/api/storeId/ingredients/ingredients.hooks';
import { useOutletContext } from 'react-router-dom';

type ModalState =
  | { type: 'add'; data: null }
  | { type: 'edit'; data: IngredientResponse }
  | { type: 'delete'; data: IngredientResponse }
  | { type: null; data: null };

const MainIngredient = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    data: null,
  });

  const { storeId } = useOutletContext<{ storeId: string }>();

  const { useGetAllIngredients, useDeleteIngredient } = useIngredientsQuery();

  const {
    data: ingredients,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllIngredients(storeId);
  const deleteMutation = useDeleteIngredient();

  const handleEditIngredient = useCallback((ingredient: IngredientResponse) => {
    setModalState({ type: 'edit', data: ingredient });
  }, []);

  const handleDeleteClick = useCallback((ingredient: IngredientResponse) => {
    setModalState({ type: 'delete', data: ingredient });
  }, []);

  const handleDeleteIngredient = () => {
    if (modalState.type !== 'delete' || !modalState.data) return;

    deleteMutation.mutate(
      { storeId, ingredientId: modalState.data.ingredient_id },
      {
        onSuccess: () => {
          if (ingredients?.length === 1) setIsEditMode(false);
          setModalState({ type: null, data: null });
        },
      }
    );
  };

  const handleModalOpen = useCallback(() => {
    toast.dismiss();
    setModalState({ type: 'add', data: null });
  }, []);

  const handleCloseModal = () => {
    setModalState({ type: null, data: null });
  };

  const handleToggleEditMode = useCallback(() => {
    toast.dismiss();
    setIsEditMode((prev) => !prev);
  }, []);

  if (isLoading) {
    return <ContentLoadingIndicator />;
  }

  if (isError) {
    return <ErrorPage error={error as Error} resetError={() => refetch()} />;
  }

  // 모달 상태에 따라 적절한 모달 컴포넌트 렌더링
  const renderModal = () => {
    switch (modalState.type) {
      case 'add':
      case 'edit':
        return (
          <IngredientsModal
            onClose={handleCloseModal}
            storeId={storeId}
            isEditMode={modalState.type === 'edit'}
            initialData={
              modalState.type === 'edit' ? modalState.data : undefined
            }
          />
        );
      case 'delete':
        return (
          <IngredientsUsagesModal
            storeId={storeId}
            ingredient={modalState.data}
            onClose={handleCloseModal}
            onConfirmDelete={handleDeleteIngredient}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className='flex h-full flex-col items-center justify-between px-[35px] py-[30px]'>
        <header className='flex w-full items-center justify-between gap-5'>
          <IngredientSummary ingredients={ingredients} />

          <ActionButtons
            hasIngredients={!!ingredients?.length}
            isEditMode={isEditMode}
            onAddIngredient={() => handleModalOpen()}
            onToggleEditMode={handleToggleEditMode}
          />
        </header>

        <div className='h-[calc(100%-80px)] w-full overflow-hidden rounded-xl bg-white'>
          <IngredientHeader />

          <IngredientList
            ingredients={ingredients}
            isEditMode={isEditMode}
            onEditIngredient={handleEditIngredient}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      {renderModal()}
    </>
  );
};

export default MainIngredient;
