import { useEffect, useState } from "react";
import "./App.css";
import { fetchData, Stock } from "./api/main";
import humanFormat from "human-format";

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
              // border: "1px solid black",
              // borderCollapse: "initial",
              paddingRight: "24px",
            }}
          >
            {Object.values(year).map((val) => {
              const [pretty, pos] = prettifyVal(val);
              return (
                <div
                  style={{
                    textAlign: "right",
                    color:
                      pos == Positive.TRUE
                        ? "green"
                        : pos == Positive.NONE
                        ? "black"
                        : "red",
                  }}
                >
                  {pretty}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

enum Positive {
  TRUE,
  FALSE,
  NONE,
}

function prettifyVal(val: string): [string, Positive] {
  try {
    const n = Number(val);
    const pos = n == 0 ? Positive.NONE : n > 0 ? Positive.TRUE : Positive.FALSE;
    return [humanFormat(n).replace("G", "B"), pos]; // billion
  } catch (e) {
    return [val, Positive.NONE];
  }
}

export default App;
