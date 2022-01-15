import { useEffect, useState } from "react";
import "./App.css";
import { fetchData, Stock } from "./api/main";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<Stock[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      let res = await fetchData();
      setData(res);
    };
    fetcher();
  }, []);

  return (
    <div className="App">
      <div>
        {data?.map((d) => (
          <StockDisplay key={d.id} stock={d} />
        ))}
      </div>
    </div>
  );
}

function StockDisplay({ stock }: { stock: Stock }) {
  return (
    <>
      <div style={{ fontSize: "24px", margin: "24px" }}>
        {stock.symbol.toUpperCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "row", margin: "24px" }}>
        {/* {stock?.balanceSheetAnnual.map((year) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {Object.entries(year).map(([k, v]) => (
              <div>
                {k}: {JSON.stringify(v)}
              </div>
            ))}
          </div>
        ))} */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {Object.keys(stock?.balanceSheetQuarterly[0]).map((key) => (
            <div style={{ textAlign: "left" }}>{key}</div>
          ))}
        </div>
        {stock?.balanceSheetQuarterly.map((year) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: "160px",
            }}
          >
            {Object.values(year).map((val) => (
              <div style={{ textAlign: "left" }}>{JSON.stringify(val)}</div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
