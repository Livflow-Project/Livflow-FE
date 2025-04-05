export type TransactionResponse = {
  transaction_id: string;
  type: 'expense' | 'income';
  category: string;
  detail?: string;
  cost: number;
};

export type TransactionRequest = Omit<TransactionResponse, 'transaction_id'>;

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
