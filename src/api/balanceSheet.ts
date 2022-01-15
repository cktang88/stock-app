import { alpha } from "./main";
import localforage from "localforage";

export const getBalanceSheet = async (symbol: string) => {
  const key = "INCOME_STATEMENT" + symbol.toUpperCase();
  const cachedData = await localforage.getItem(key);
  if (cachedData) {
    console.log("got cached data: ", key);
    return cachedData;
  }
  let freshData = null;
  try {
    freshData = await alpha.fundamental.income_statement(symbol);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }

  await localforage.setItem(key, freshData);
  console.log("returning FRESH data: ", key);
  return freshData;
};
