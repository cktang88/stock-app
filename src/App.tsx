import { useEffect, useState } from "react";
import "./App.css";
import { fetchData, Stock } from "./api/main";
import Chart from "./chart";
// import humanFormat from "human-format";

enum Tabs {
  INCOME,
  PRICES,
  CASHFLOW,
}

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<Stock[]>([]);
  const [tab, setTab] = useState(Tabs.PRICES);

  useEffect(() => {
    const fetcher = async () => {
      let res = await fetchData();
      setData(res);
    };
    fetcher();
  }, []);

  return (
    <div className="App">
      <button onClick={() => setTab(Tabs.PRICES)}>Prices</button>
      <button onClick={() => setTab(Tabs.INCOME)}>Income</button>
      <button onClick={() => setTab(Tabs.CASHFLOW)}>CashFlow</button>
      {tab == Tabs.INCOME && (
        <div>
          {data?.map((d) => (
            <BalanceDisplay key={d.id} stock={d} />
          ))}
        </div>
      )}
      {tab == Tabs.PRICES && (
        <div>
          {data?.map((d) => (
            <PriceDisplay key={d.id} stock={d} />
          ))}
        </div>
      )}
      {tab == Tabs.CASHFLOW && (
        <div>
          {data?.map((d) => (
            <CashflowDisplay key={d.id} stock={d} />
          ))}
        </div>
      )}
    </div>
  );
}

function PriceDisplay({ stock }: { stock: Stock }) {
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
  const data = [
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
  console.log(data);

  return (
    <div>
      <div style={{ fontSize: "24px", margin: "24px" }}>
        {stock.symbol.toUpperCase()}
      </div>
      <Chart options={opts} data={data} />
    </div>
  );
}

function CashflowDisplay({ stock }: { stock: Stock }) {
  return (
    <>
      <div style={{ fontSize: "24px", margin: "24px" }}>
        {stock.symbol.toUpperCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "row", margin: "24px" }}>
        {/* {stock?.incomeAnnual.map((year) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {Object.entries(year).map(([k, v]) => (
              <div>
                {k}: {JSON.stringify(v)}
              </div>
            ))}
          </div>
        ))} */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {Object.keys(stock?.cashflowQuarterly[0]).map((key) => (
            <div style={{ textAlign: "left" }}>{key}</div>
          ))}
        </div>
        {stock?.cashflowQuarterly.map((year) => (
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

function BalanceDisplay({ stock }: { stock: Stock }) {
  return (
    <>
      <div style={{ fontSize: "24px", margin: "24px" }}>
        {stock.symbol.toUpperCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "row", margin: "24px" }}>
        {/* {stock?.incomeAnnual.map((year) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {Object.entries(year).map(([k, v]) => (
              <div>
                {k}: {JSON.stringify(v)}
              </div>
            ))}
          </div>
        ))} */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {Object.keys(stock?.incomeQuarterly[0]).map((key) => (
            <div style={{ textAlign: "left" }}>{key}</div>
          ))}
        </div>
        {stock?.incomeQuarterly.map((year) => (
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
    let n = Number(val);
    if (Number.isNaN(n)) {
      throw Error("Not a number");
    }
    const pos = n == 0 ? Positive.NONE : n > 0 ? Positive.TRUE : Positive.FALSE;
    n = Math.round(n / 1_000_000);
    return [n.toLocaleString("en-US") + " M", pos];
  } catch (e) {
    val = val == "None" ? "-" : val;
    return [val, Positive.NONE];
  }
}

// function prettifyVal2(val: string): [string, Positive] {
//   try {
//     let n = Number(val);
//     const pos = n == 0 ? Positive.NONE : n > 0 ? Positive.TRUE : Positive.FALSE;
//     return [humanFormat(n).replace("G", "B"), pos]; // billion
//   } catch (e) {
//     val = val == "None" ? "-" : val;
//     return [val, Positive.NONE];
//   }
// }

export default App;
