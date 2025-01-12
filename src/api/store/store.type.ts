export type StoreResponse = {
  store_id: string;
  name: string;
  address?: string;
  chart: Category[];
};

export type Category = {
  type: 'expense' | 'income';
  category: string;
  cost: number;
};

export type StoreRequestParams = {
  name: string;
  address?: string;
};
