import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { fetchData, Stock } from "./api/main";
import { BalanceDisplay } from "./components/BalanceDisplay";
import { CashflowDisplay } from "./components/CashflowDisplay";
import { PriceDisplay } from "./components/PriceDisplay";

enum Tabs {
  INCOME,
  PRICES,
  CASHFLOW,
}

function App() {
  const [count, setCount] = useState(0);
  const [fullData, setData] = useState<Stock[]>([]);
  const [tab, setTab] = useState(Tabs.PRICES);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetcher = async () => {
      let res = await fetchData();
      setData(res);
    };
    fetcher();
  }, []);

  const data = useMemo(() => {
    return fullData.filter((e) => e.symbol.includes(search));
  }, [fullData, search]);

  return (
    <div className="App">
      <span style={{ padding: "24px" }}>
        <SearchBar setSearch={setSearch} />
      </span>

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

const SearchBar = ({ setSearch }) => {
  return (
    <input
      style={{ fontSize: "1.2em" }}
      type="search"
      placeholder="Search"
      onChange={(e) => setSearch(e.currentTarget.value)}
    ></input>
  );
};

export default App;
