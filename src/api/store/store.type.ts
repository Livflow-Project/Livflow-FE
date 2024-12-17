type StoreResponse = {
  store_id: number;
  name: string;
  address?: string;
  chart: { expense: Category[]; income: Category[] };
};

type Category = {
  category: string;
  cost: number;
};

type StoreRequestParams = {
  name: string;
  address?: string;
};
