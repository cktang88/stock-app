import { useMemo } from "react";
import { Stock } from "../api";
import Chart from "./chart";

export function PriceDisplay({ stock }: { stock: Stock }) {
  const opts = {
    title: "Prices",
    width: 800,
    height: 600,
    series: [
      {},
      {
        stroke: "blue",
      },
    ],
  };
  if (!stock.prices) {
    return <></>;
  }
  const data = useMemo(() => {
    return [
      Object.keys(stock.prices)
        .filter((k) => k > "2016")
        .map((k) => new Date(k).getTime() / 1000)
        .reverse(),
      Object.entries(stock.prices)
        .filter(([k, v]) => k > "2016")
        .map(([k, v]) => Number(v["5. adjusted close"]))
        // .map((v) => Number(v["4. close"]))
        .reverse(),
    ];
  }, [stock]);

  return (
    <div>
      <div style={{ fontSize: "24px", margin: "24px" }}>
        {stock.symbol.toUpperCase()}
      </div>
      <Chart options={opts} data={data} />
    </div>
  );
}
