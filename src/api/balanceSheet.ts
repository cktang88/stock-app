import { alpha, getCacheOrRefetch } from "./main";

export const getBalanceSheet = async (symbol: string) => {
  const key = "INCOME_STATEMENT" + symbol.toUpperCase();
  return getCacheOrRefetch(
    key,
    async () => await alpha.fundamental.income_statement(symbol)
  );
};
