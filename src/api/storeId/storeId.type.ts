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

// 거래 추가를 위한 요청 타입
export type AddTransactionParams = {
  year: number;
  month: number;
  day: number;
  day_info: {
    expense?: DayDetailTransaction[];
    income?: DayDetailTransaction[];
  };
};

// 거래 수정을 위한 요청 타입
export type UpdateTransactionParams = {
  year: number;
  month: number;
  day: number;
  day_info: {
    expense?: DayDetailTransaction[];
    income?: DayDetailTransaction[];
  };
};

// 거래 삭제를 위한 요청 타입
export type DeleteTransactionParams = {
  year: number;
  month: number;
  day: number;
  transactionType: 'expense' | 'income';
  transactionIndex: number;
};
