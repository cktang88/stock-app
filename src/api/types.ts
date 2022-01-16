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

export type StockTxnRecord = {
  moneyDelta: number;
  numSharesDelta: number;
  symbol: string;
  unixTs: number;
};
