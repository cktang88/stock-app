import { useEffect, useState } from "react";
import "./App.css";
import { fetchData, Stock } from "./api/main";
import Chart from "./chart";
import { BalanceDisplay } from "./components/BalanceDisplay";
import { CashflowDisplay } from "./components/CashflowDisplay";
import { PriceDisplay } from "./components/PriceDisplay";
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

export default App;
