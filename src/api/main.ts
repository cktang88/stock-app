import alphavantage from "alphavantage";
import { getIncomeStatement } from "./income";
import localforage from "localforage";
import { getWeeklyAdjustedPrices } from "./prices";
import { getCashFlow } from "./cashflow";

export const alpha = alphavantage({
  key: import.meta.env.VITE_ALPHAVANTAGE_KEY,
});

export type Stock = {
  symbol: string;
  incomeAnnual: Object[];
  incomeQuarterly: Object[];
  prices: Object;
  cashflowAnnual: Object[];
  cashflowQuarterly: Object[];
};

export const fetchData: () => Promise<Stock[]> = () => {
  const stocks = ["ibm", "snow", "aapl"];
  let res = Promise.all(
    stocks.map(async (symbol) => {
      let bal = await getIncomeStatement(symbol);
      let raw_prices = await getWeeklyAdjustedPrices(symbol);
      let raw_cash = await getCashFlow(symbol);
      let prices = raw_prices["Weekly Adjusted Time Series"];
      return {
        symbol,
        incomeAnnual: bal["annualReports"],
        incomeQuarterly: bal["quarterlyReports"],
        prices,
        cashflowAnnual: raw_cash["annualReports"],
        cashflowQuarterly: raw_cash["quarterlyReports"],
      };
    })
  );
  console.log(res);
  return res;
};

export const getCacheOrRefetch = async (key: string, refetchFn: () => any) => {
  const cachedData = await localforage.getItem(key);
  if (cachedData) {
    console.log("got cached data: ", key);
    return cachedData;
  }
  let freshData = await refetchFn();
  await localforage.setItem(key, freshData);
  console.log("returning FRESH data: ", key);
  return freshData;
};
