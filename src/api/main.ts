import alphavantage from "alphavantage";
import { getBalanceSheet } from "./balanceSheet";
import localforage from "localforage";
import { getWeeklyAdjustedPrices } from "./prices";

export const alpha = alphavantage({
  key: import.meta.env.VITE_ALPHAVANTAGE_KEY,
});

export type Stock = {
  symbol: string;
  balanceSheetAnnual: Object[];
  balanceSheetQuarterly: Object[];
  prices: Object;
};

export const fetchData: () => Promise<Stock[]> = () => {
  const stocks = ["ibm", "snow", "aapl"];
  let res = Promise.all(
    stocks.map(async (symbol) => {
      let bal = await getBalanceSheet(symbol);
      let raw_prices = await getWeeklyAdjustedPrices(symbol);
      let prices = raw_prices["Weekly Adjusted Time Series"];
      return {
        symbol,
        balanceSheetAnnual: bal["annualReports"],
        balanceSheetQuarterly: bal["quarterlyReports"],
        prices,
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
