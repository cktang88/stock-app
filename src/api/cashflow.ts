import { alpha, getCacheOrRefetch } from ".";

export const getCashFlow = async (symbol: string) => {
  const key = "CASH_FLOW" + symbol.toUpperCase();
  return getCacheOrRefetch(
    key,
    async () => await alpha.fundamental.cash_flow(symbol)
  );
};
