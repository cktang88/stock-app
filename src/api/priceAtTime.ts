import { getCacheOrRefetch, StringObj } from ".";

const BASE_IEX_URL = "https://cloud.iexapis.com/v1";

// using https://iexcloud.io/docs/api/#historical-prices
// NOTE: Access to Historical Prices from more than 5 years ago is only included with paid subscriptions
export const getPriceAtDay = async (symbol: string, date: Date) => {
  const key = "IEX_HISTORICAL_PRICE_" + symbol.toUpperCase();
  const publicKey = import.meta.env.VITE_IEX_PUBLIC_KEY;

  if (date.getDay() == 0 || date.getDay() == 6) {
    throw Error("Invalid date: must be week day.");
  }

  const yyyymmdd = date
    .toISOString()
    .split("T")[0]
    .replace("-", "")
    .replace("-", "");
  console.log(date.toISOString());
  let url = `${BASE_IEX_URL}/stock/${symbol}/chart/date/${yyyymmdd}?chartByDay=true&token=${publicKey}`;
  return getCacheOrRefetch(
    key,
    async () =>
      await fetch(url)
        .then((res) => res.json())
        .then((res) => {
          if (res["error"]) {
            throw Error(res["error"]);
          }
          return res[0];
        })
  );
  //   return await fetch(url)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res["error"]) {
  //         throw Error(res["error"]);
  //       }
  //       return res[0];
  //     });
};
