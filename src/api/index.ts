import alphavantage from "alphavantage";
import { getIncomeStatement } from "./income";
import localforage from "localforage";
import { getMonthlyAdjustedPrices } from "./prices";
import { getCashFlow } from "./cashflow";
import { getOverview } from "./overview";

export const alpha = alphavantage({
  key: import.meta.env.VITE_ALPHAVANTAGE_KEY,
});

const SYMBOLS = [
  "ibm",
  "snow",
  "aapl",
  "crm", // salesforce
  "afrm", // affirm
  "mdb", //mongo
  "ddog",
  "net", //cloudflare
  "axp", //amex
  "v", //visa
  "pypl", //paypal
  "coin", //coinbase
];

export type Stock = {
  symbol: string;
  incomeAnnual: Object[];
  incomeQuarterly: Object[];
  prices: Object;
  cashflowAnnual: Object[];
  cashflowQuarterly: Object[];
  overview: Object;
};

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
  console.log(res);
  console.log("CACHE MEM USAGE: ", await navigator.storage.estimate());
  return res;
};

export const getCacheOrRefetch = async (key: string, refetchFn: () => any) => {
  const cachedData = await localforage.getItem(key);
  if (cachedData) {
    console.log("got cached data: ", key);
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
