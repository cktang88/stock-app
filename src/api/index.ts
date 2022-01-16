import alphavantage from "alphavantage";
import { getIncomeStatement } from "./income";
import localforage from "localforage";
import { getMonthlyAdjustedPrices } from "./prices";
import { getCashFlow } from "./cashflow";
import { getOverview } from "./overview";
import { getPriceAtDay } from "./priceAtTime";
import { Stock, StockTxnRecord } from "./types";
import { SYMBOLS } from "../symbols";

export const alpha = alphavantage({
  key: import.meta.env.VITE_ALPHAVANTAGE_KEY,
});

export const fetchData: () => Promise<Stock[]> = async () => {
  let res = Promise.all(
    SYMBOLS.map(async (symbol) => {
      let bal = await getIncomeStatement(symbol);
      let raw_prices = await getMonthlyAdjustedPrices(symbol);
      let raw_cash = await getCashFlow(symbol);
      let overview = await getOverview(symbol);
      let prices = raw_prices["Monthly Adjusted Time Series"];
      return {
        symbol,
        incomeAnnual: bal["annualReports"],
        incomeQuarterly: bal["quarterlyReports"],
        prices,
        cashflowAnnual: raw_cash["annualReports"],
        cashflowQuarterly: raw_cash["quarterlyReports"],
        overview,
      };
    })
  );
  // console.log(res);
  console.log("CACHE MEM USAGE: ", await navigator.storage.estimate());

  return res;
};

export const buy = async (
  symbol: string,
  spend: number,
  date: Date
): Promise<StockTxnRecord> => {
  // NOTE: months are 0-indexed
  const price: number = (await getPriceAtDay(symbol, date))["fclose"];
  const numShares = Math.floor(spend / price);
  return {
    numSharesDelta: numShares,
    moneyDelta: numShares * price,
    unixTsSecs: date.getTime() / 100,
    symbol,
  };
};

export const sell = async (
  symbol: string,
  dollarValue: number,
  date: Date
): Promise<StockTxnRecord> => {
  // NOTE: months are 0-indexed
  const price: number = (await getPriceAtDay(symbol, date))["fclose"];
  const numShares = Math.floor(dollarValue / price);
  return {
    numSharesDelta: numShares,
    moneyDelta: numShares * price,
    unixTsSecs: date.getTime() / 1000,
    symbol,
  };
};

export const getCacheOrRefetch = async (key: string, refetchFn: () => any) => {
  const cachedData = await localforage.getItem(key);
  if (cachedData) {
    // console.log("got cached data: ", key);
    return cachedData;
  }
  let freshData = {};
  try {
    freshData = await refetchFn();
    await localforage.setItem(key, freshData);
    console.log("returning FRESH data: ", key);
  } catch (e) {
    console.log(e);
  }
  return freshData;
};

export * from "./types";
