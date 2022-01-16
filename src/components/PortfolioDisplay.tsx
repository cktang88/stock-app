import localforage from "localforage";
import { FC, useEffect, useState } from "react";
import { StockTxnRecord } from "../api";
import { getMonthlyAdjustedPrices } from "../api/prices";
import { SYMBOLS } from "../symbols";
import Chart from "./chart";

export const PortfolioDisplay: FC<{ portfolioName: string }> = ({
  portfolioName,
}) => {
  const opts = {
    title: "Portfolio",
    width: 1200,
    height: 800,
    series: [
      {},
      {
        stroke: "blue",
      },
    ],
  };

  const [data, setData] = useState([[], []]);
  useEffect(() => {
    loadData(portfolioName);
    console.log("done.");
  }, []);

  return (
    <div style={{ paddingTop: "24px" }}>
      {/* <div style={{ fontSize: "24px", margin: "24px" }}>
        {stock.symbol.toUpperCase()}
      </div> */}
      <Chart options={opts} data={data} />
    </div>
  );
};

const loadData = async (portfolioName: string) => {
  const PORTFOLIO_CACHE_KEY = "PORTFOLIO_CACHE_" + portfolioName;

  const portfolio: StockTxnRecord[] = await localforage.getItem(
    PORTFOLIO_CACHE_KEY
  );
  // sort ascending
  portfolio.sort((a, b) => a.unixTsSecs - b.unixTsSecs);

  let priceHistory: Record<string, Object> = {};
  await Promise.all(
    SYMBOLS.map(async (symbol) => {
      let raw_prices = await getMonthlyAdjustedPrices(symbol);
      let prices = raw_prices["Monthly Adjusted Time Series"];
      priceHistory[symbol] = prices;
    })
  );

  // TODO: generate timeseries data based on price history...
  const times = [];
  const values = [];
  const nowTsSecs = new Date().getTime() / 1000;
  for (let i = 0; i < nowTsSecs; i++) {
    console.log(i);
  }
};
