import { UseInventoryItemRequest } from './inventory.type';
import axiosInstance from '@/api/axiosInstance';

export const getInventoryItemsAPI = async (storeId: string) => {
  const response = await axiosInstance.get(`/inventory/${storeId}`);
  return response.data;
};

export const useInventoryItemAPI = async (
  storeId: string,
  ingredientId: string,
  data: UseInventoryItemRequest
) => {
  const response = await axiosInstance.post(
    `/inventory/${storeId}/${ingredientId}/use`,
    data
  );
  return response.data;
};
