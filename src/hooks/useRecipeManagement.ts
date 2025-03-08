import {
  useDeleteRecipeMutation,
  useGetAllRecipes,
} from '@/api/storeId/costCalculator/costCalculator.hooks';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '@/contexts/StoreContext';

export const useRecipeManagement = () => {
  const [showCostCalculator, setShowCostCalculator] = useState(false);
  const [isDeleteModeInternal, setIsDeleteModeInternal] = useState(false);

  const navigate = useNavigate();
  const { storeInfo } = useStore();
  const storeId = storeInfo?.id || '';

  // 레시피 목록 조회
  const {
    data: recipes,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllRecipes(storeId || '');

  // 파생 상태: 레시피가 있을 때만 삭제 모드 활성화
  const isDeleteMode = recipes && recipes.length > 0 && isDeleteModeInternal;

  // 레시피 삭제 뮤테이션
  const deleteRecipeMutation = useDeleteRecipeMutation(storeId || '');

  // 메뉴 추가 모드 전환
  const handleAddMenu = () => {
    setShowCostCalculator(true);
  };

  // 메뉴 편집 페이지로 이동
  const handleEditRecipe = (recipeId: string) => {
    navigate(`/store/${storeId}/recipe/${recipeId}`);
  };

  // 메뉴 저장 후 처리
  const handleSaveMenu = () => {
    setShowCostCalculator(false);
    refetch();
  };

  // 메뉴 추가 취소
  const handleCancelMenu = () => {
    setShowCostCalculator(false);
  };

  // 삭제 모드 토글
  const handleDeleteMode = () => {
    setIsDeleteModeInternal((prevMode) => !prevMode);
  };

  // 레시피 삭제
  const handleDeleteRecipe = (recipeId: string) => {
    deleteRecipeMutation.mutate(recipeId, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return {
    recipes,
    isLoading,
    isError,
    error,
    refetch,
    showCostCalculator,
    isDeleteMode,
    handleAddMenu,
    handleEditRecipe,
    handleSaveMenu,
    handleCancelMenu,
    handleDeleteMode,
    handleDeleteRecipe,
  };
};
