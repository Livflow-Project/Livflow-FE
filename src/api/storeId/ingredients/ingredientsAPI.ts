import { IngredientRequest } from './ingredients.type';
import axiosInstance from '../../axiosInstance';

export const IngredientsAPI = {
  getAllIngredientsAPI: async (storeId: string) => {
    const response = await axiosInstance.get(`/ingredients/${storeId}/`);
    return response.data;
  },

  getIngredientAPI: async (storeId: string, ingredientsId: string) => {
    const response = await axiosInstance.get(
      `/ingredients/${storeId}/${ingredientsId}/`
    );
    return response.data;
  },

  addIngredientAPI: async (storeId: string, data: IngredientRequest) => {
    const response = await axiosInstance.post(`/ingredients/${storeId}/`, data);
    return response.data;
  },

  updateIngredientAPI: async (
    storeId: string,
    ingredientsId: string,
    data: IngredientRequest
  ) => {
    const response = await axiosInstance.put(
      `/ingredients/${storeId}/${ingredientsId}/`,
      data
    );
    return response.data;
  },

  deleteIngredientAPI: async (storeId: string, ingredientsId: string) => {
    const response = await axiosInstance.delete(
      `/ingredients/${storeId}/${ingredientsId}/`
    );
    return response.data;
  },
};
