import { Category } from '../store/store.type';

export type StoreIDResponse = {
  store_id: number;
  name: string;
  address?: string;
  chart: {
    expense: Category[];
    income: Category[];
  };
};

export type StoreIdDetailResponse = {
  date_info: DayInfo[];
};

export type DayInfo = {
  day: number;
  day_info: DayTransaction;
};

export type DayTransaction = {
  expense: DayDetailTransaction[];
  income: DayDetailTransaction[];
};

export type DayDetailTransaction = {
  category: string;
  detail: string;
  cost: number;
};

export type StoreDetailParams = {
  year: number;
  month: number;
};
