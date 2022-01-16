import { alpha, getCacheOrRefetch } from ".";

export const getOverview = async (symbol: string) => {
  const key = "OVERVIEW_" + symbol.toUpperCase();
  return getCacheOrRefetch(key, async () => {
    const raw = await alpha.fundamental.company_overview(symbol);
    // trim description to save storage
    delete raw["Description"];
  });
};
