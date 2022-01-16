export type StringObj = {
  [key: string]: string;
};
export type Stock = {
  symbol: string;
  incomeAnnual: StringObj[];
  incomeQuarterly: StringObj[];
  prices: StringObj;
  cashflowAnnual: StringObj[];
  cashflowQuarterly: StringObj[];
  overview: StringObj;
};

export type StockTxnResult = {
  numSharesDelta: number;
  moneyDelta: number;
};
