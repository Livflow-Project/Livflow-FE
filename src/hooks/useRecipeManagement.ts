import {
  useDeleteRecipeMutation,
  useGetAllRecipes,
} from '@/api/storeId/costCalculator/costCalculator.hooks';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { toast } from 'react-toastify';
import { useState } from 'react';

export const useRecipeManagement = () => {
  const [showCostCalculator, setShowCostCalculator] = useState(false);
  const [isDeleteModeInternal, setIsDeleteModeInternal] = useState(false);

  const navigate = useNavigate();

  const { storeId } = useOutletContext<{ storeId: string }>();

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
    toast.dismiss();
    setShowCostCalculator(true);
  };

  // 메뉴 편집 페이지로 이동
  const handleEditRecipe = (recipeId: string) => {
    toast.dismiss();
    navigate(`/store/${storeId}/recipe/${recipeId}`);
  };

  // 메뉴 저장 후 처리
  const handleSaveMenu = () => {
    setShowCostCalculator(false);
    refetch();
  };

  // 메뉴 추가 취소
  const handleCancelMenu = () => {
    toast.dismiss();
    setShowCostCalculator(false);
  };

  // 삭제 모드 토글
  const handleDeleteMode = () => {
    toast.dismiss();
    setIsDeleteModeInternal((prevMode) => !prevMode);
  };

  // 레시피 삭제
  const handleDeleteRecipe = (recipeId: string) => {
    // 현재 레시피가 마지막 하나인지 확인
    const isLastRecipe = recipes && recipes.length === 1;

    deleteRecipeMutation.mutate(recipeId, {
      onSuccess: () => {
        // 마지막 레시피였다면 삭제 모드 비활성화
        if (isLastRecipe) {
          setIsDeleteModeInternal(false);
        }
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
