import alphavantage from "alphavantage";
import { getBalanceSheet } from "./balanceSheet";

export const alpha = alphavantage({
  key: import.meta.env.VITE_ALPHAVANTAGE_KEY,
});

export const run = async () => {
  const data = await getBalanceSheet("snow");
  console.log(data);
};
