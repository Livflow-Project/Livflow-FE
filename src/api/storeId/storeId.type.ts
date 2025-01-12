import { Category } from '../store/store.type';

export type StoreIDResponse = {
  store_id: string;
  name: string;
  address?: string;
  chart: Category[];
};

export type StoreIdDetailResponse = {
  date_info: DayInfo[];
};

export type DayInfo = {
  day: number;
  day_info: DayDetailTransaction[];
};

export type DayDetailTransaction = {
  transaction_id: string; // UUID
  type: 'expense' | 'income';
  category: string;
  detail: string;
  cost: number;
};

// id를 제외한 DayDetailTransaction 타입
export type AddDayDetailTransaction = Omit<
  DayDetailTransaction,
  'transaction_id'
>;

export type StoreDetailParams = {
  year: number;
  month: number;
};

// 거래 추가를 위한 요청 타입
export type AddTransactionParams = {
  year: number;
  month: number;
  day: number;
  day_info: AddDayDetailTransaction[];
};

// 거래 수정을 위한 요청 타입
export type UpdateTransactionParams = {
  transaction_id: string;
  year: number;
  month: number;
  day: number;
  day_info: DayDetailTransaction[];
};

// 거래 삭제를 위한 요청 타입
export type DeleteTransactionParams = {
  transaction_id: string;
};
