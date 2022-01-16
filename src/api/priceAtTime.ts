import { getCacheOrRefetch } from ".";

const BASE_IEX_URL = "https://cloud.iexapis.com/v1";

// using https://iexcloud.io/docs/api/#historical-prices
// NOTE: Access to Historical Prices from more than 5 years ago is only included with paid subscriptions
export const getPriceAtDay = async (symbol: string, date: string) => {
  const key = "IEX_HISTORICAL_PRICE_" + symbol.toUpperCase();
  const url = `${BASE_IEX_URL}/stock/${symbol}/chart/date/${date}?chartByDay=true&chartCloseOnly=true?token=${
    import.meta.env.VITE_IEX_PUBLIC_KEY
  }`;
  return getCacheOrRefetch(
    key,
    async () =>
      await fetch(url)
        .then((res) => res.json())
        .then((res) => {
          if (res["error"]) {
            throw Error(res["error"]);
          }
        })
  );
};
