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

  formData.append('recipe_name', data.recipe_name || '');
  formData.append('recipe_cost', data.recipe_cost?.toString() || '0');
  formData.append(
    'production_quantity',
    data.production_quantity?.toString() || '1'
  );
  formData.append('is_favorites', data.is_favorites?.toString() || 'false');

  formData.append('ingredients', JSON.stringify(data.ingredients || []));

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

  if ('recipe_name' in data) {
    formData.append('recipe_name', data.recipe_name || '');
  }
  if ('recipe_cost' in data) {
    formData.append('recipe_cost', data.recipe_cost?.toString() || '0');
  }
  if ('production_quantity' in data) {
    formData.append(
      'production_quantity',
      data.production_quantity?.toString() || '1'
    );
  }
  if ('is_favorites' in data) {
    formData.append('is_favorites', data.is_favorites?.toString() || 'false');
  }

  if (
    'ingredients' in data &&
    data.ingredients &&
    data.ingredients.length > 0
  ) {
    formData.append('ingredients', JSON.stringify(data.ingredients));
  }

  if ('recipe_img' in data) {
    if (data.recipe_img instanceof File) {
      formData.append('recipe_img', data.recipe_img);
    } else {
      formData.append('recipe_img', '');
    }
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
