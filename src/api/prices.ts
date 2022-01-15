import { alpha, getCacheOrRefetch } from "./main";

export const getWeeklyAdjustedPrices = async (symbol: string) => {
  const key = "WEEKLY_ADJUSTED_PRICES" + symbol.toUpperCase();
  return getCacheOrRefetch(
    key,
    async () => await alpha.data.weekly_adjusted(symbol)
  );
};
