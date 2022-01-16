import { alpha, getCacheOrRefetch } from ".";

export const getWeeklyAdjustedPrices = async (symbol: string) => {
  const key = "WEEKLY_ADJUSTED_PRICES" + symbol.toUpperCase();
  return getCacheOrRefetch(
    key,
    async () => await alpha.data.weekly_adjusted(symbol)
  );
};

export const getMonthlyAdjustedPrices = async (symbol: string) => {
  const key = "MONTHLY_ADJUSTED_PRICES_" + symbol.toUpperCase();
  return getCacheOrRefetch(
    key,
    async () => await alpha.data.monthly_adjusted(symbol)
  );
};
