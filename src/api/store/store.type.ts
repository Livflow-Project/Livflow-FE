export type StoreResponse = {
  store_id: string;
  name: string;
  address?: string;
  chart: { expense: Category[]; income: Category[] };
};

export type Category = {
  category: string;
  cost: number;
};

export type StoreRequestParams = {
  name: string;
  address?: string;
};
