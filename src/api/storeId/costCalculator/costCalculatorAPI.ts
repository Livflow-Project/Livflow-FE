import {
  CostCalculatorDetail,
  CostCalculatorListItem,
  CostCalculatorRequest,
} from './costCalculator.type';

import axiosInstance from '@/api/axiosInstance';

export const getAllRecipesAPI = async (
  storeId: string
): Promise<CostCalculatorListItem[]> => {
  const response = await axiosInstance.get(`/costcalcul/${storeId}`);
  return response.data;
};

export const getRecipeAPI = async (
  storeId: string,
  recipeId: string
): Promise<CostCalculatorDetail> => {
  const response = await axiosInstance.get(
    `/costcalcul/${storeId}/${recipeId}`
  );
  return response.data;
};

export const createRecipeAPI = async (
  storeId: string,
  data: CostCalculatorRequest
): Promise<CostCalculatorDetail> => {
  const response = await axiosInstance.post(`/costcalcul/${storeId}`, data);
  return response.data;
};

export const updateRecipeAPI = async (
  storeId: string,
  recipeId: string,
  data: CostCalculatorRequest
): Promise<CostCalculatorDetail> => {
  const response = await axiosInstance.put(
    `/costcalcul/${storeId}/${recipeId}`,
    data
  );
  return response.data;
};

export const deleteRecipeAPI = async (storeId: string, recipeId: string) => {
  const response = await axiosInstance.delete(
    `/costcalcul/${storeId}/${recipeId}`
  );
  return response.data;
};
