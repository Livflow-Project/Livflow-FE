import {
  CostCalculatorDetail,
  CostCalculatorListItem,
  CostCalculatorRequest,
} from './costCalculator.type';

import axiosInstance from '@/api/axiosInstance';

export const getAllRecipesAPI = async (
  storeId: string
): Promise<CostCalculatorListItem[]> => {
  const response = await axiosInstance.get(`/costcalcul/${storeId}/`);

  return response.data;
};

export const getRecipeAPI = async (
  storeId: string,
  recipeId: string
): Promise<CostCalculatorDetail> => {
  const response = await axiosInstance.get(
    `/costcalcul/${storeId}/${recipeId}/`
  );

  return response.data;
};

export const createRecipeAPI = async (
  storeId: string,
  data: CostCalculatorRequest
): Promise<CostCalculatorDetail> => {
  const formData = new FormData();

  // 일반 데이터 추가
  formData.append('recipe_name', data.recipe_name || '');
  formData.append('recipe_cost', data.recipe_cost?.toString() || '0');
  formData.append(
    'production_quantity',
    data.production_quantity?.toString() || '1'
  );
  formData.append('is_favorites', data.is_favorites?.toString() || 'false');

  // 배열 데이터 추가
  formData.append('ingredients', JSON.stringify(data.ingredients || []));

  // 이미지 처리
  if (data.recipe_img instanceof File) {
    formData.append('recipe_img', data.recipe_img);
  } else {
    formData.append('recipe_img', '');
  }

  const response = await axiosInstance.post(
    `/costcalcul/${storeId}/`,
    formData
  );

  return response.data;
};

export const updateRecipeAPI = async (
  storeId: string,
  recipeId: string,
  data: CostCalculatorRequest
): Promise<CostCalculatorDetail> => {
  const formData = new FormData();

  // 일반 데이터 추가
  formData.append('recipe_name', data.recipe_name || '');
  formData.append('recipe_cost', data.recipe_cost?.toString() || '0');
  formData.append(
    'production_quantity',
    data.production_quantity?.toString() || '1'
  );
  formData.append('is_favorites', data.is_favorites?.toString() || 'false');

  // 배열 데이터를 JSON 문자열로 변환하여 추가
  formData.append('ingredients', JSON.stringify(data.ingredients || []));

  // 이미지 처리
  if (data.recipe_img instanceof File) {
    formData.append('recipe_img', data.recipe_img);
  } else {
    formData.append('recipe_img', '');
  }

  const response = await axiosInstance.put(
    `/costcalcul/${storeId}/${recipeId}/`,
    formData
  );

  return response.data;
};

export const deleteRecipeAPI = async (storeId: string, recipeId: string) => {
  const response = await axiosInstance.delete(
    `/costcalcul/${storeId}/${recipeId}/`
  );

  return response.data;
};
