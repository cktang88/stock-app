import localforage from "localforage";
import { FC, useEffect, useState } from "react";
import { StockTxnRecord } from "../api";
import Chart from "./chart";

export const PortfolioDisplay: FC<{ portfolioName: string }> = ({
  portfolioName,
}) => {
  const PORTFOLIO_CACHE_KEY = "PORTFOLIO_CACHE_" + portfolioName;

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
    const loadData = async () => {
      const portfolio: StockTxnRecord[] = await localforage.getItem(
        PORTFOLIO_CACHE_KEY
      );
      // TODO: generate timeseries data based on price history...
    };
    loadData();
    // load from localforage
    console.log("foo");
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
