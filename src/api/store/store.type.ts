export type StoresResponse = {
  all_stores: number;
  stores: StoreDetailResponse[];
};

export type StoreDetailResponse = {
  store_id: string; // UUID
  name: string;
  address?: string;
  chart: Category[];
};

export type StoreIdResponse = Omit<StoreDetailResponse, 'chart'>;

export type Category = {
  type: 'expense' | 'income';
  category: string;
  cost: number;
};

export type StoreRequestParams = {
  name: string;
  address?: string;
};
