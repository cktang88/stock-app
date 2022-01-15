import alphavantage from "alphavantage";
import { getBalanceSheet } from "./balanceSheet";

export const alpha = alphavantage({
  key: import.meta.env.VITE_ALPHAVANTAGE_KEY,
});

export type Stock = {
  symbol: string;
  balanceSheetAnnual: Object[];
  balanceSheetQuarterly: Object[];
};

export const fetchData: () => Promise<Stock[]> = () => {
  const stocks = ["ibm", "snow", "aapl"];
  let res = Promise.all(
    stocks.map(async (symbol) => {
      let data = await getBalanceSheet(symbol);
      return {
        symbol,
        balanceSheetAnnual: data["annualReports"],
        balanceSheetQuarterly: data["quarterlyReports"],
      };
    })
  );
  console.log(res);
  return res;
};
