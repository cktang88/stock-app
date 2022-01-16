import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { fetchData, Stock } from "./api";
import { BalanceDisplay } from "./components/BalanceDisplay";
import { CashflowDisplay } from "./components/CashflowDisplay";
import { PriceDisplay } from "./components/PriceDisplay";
import { OverviewDisplay } from "./components/OverviewDisplay";

enum Tabs {
  INCOME,
  PRICES,
  CASHFLOW,
}

function App() {
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
    const term = search.toLowerCase();
    return fullData.filter(
      (e) =>
        e.symbol.toLocaleLowerCase().includes(term) ||
        e.overview["Name"].toLowerCase().includes(term)
    );
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
            <div style={{ display: "flex" }}>
              <PriceDisplay key={d.id} stock={d} />
              <div style={{ margin: "24px" }}>
                <OverviewDisplay key={d.id} stock={d} />
              </div>
            </div>
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
