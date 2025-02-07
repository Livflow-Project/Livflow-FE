export type Transaction = {
  transaction_id: string; // UUID
  type: 'expense' | 'income';
  category: string;
  detail: string;
  cost: number;
};

// id를 제외한 DayDetailTransaction 타입
export type TransactionRequest = Omit<Transaction, 'transaction_id'>;

export type AddTransactionParams = {
  date: {
    year: number;
    month: number;
    day: number;
  };
} & TransactionRequest;

export type DayParams = {
  year: number;
  month: number;
  day: number;
};
