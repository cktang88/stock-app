import { FC, useEffect, useMemo, useState } from "react";
import "./App.css";
import { fetchData, Stock } from "./api";
import { BalanceDisplay } from "./components/BalanceDisplay";
import { CashflowDisplay } from "./components/CashflowDisplay";
import { PriceDisplay } from "./components/PriceDisplay";
import {
  cleanKeys,
  COL_WIDTH,
  OverviewDisplay,
} from "./components/OverviewDisplay";

enum Tabs {
  INCOME,
  PRICES,
  CASHFLOW,
  OVERVIEW,
}

function App() {
  const [fullData, setData] = useState<Stock[]>([]);
  const [tab, setTab] = useState(Tabs.OVERVIEW);
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
    const res = fullData.filter(
      (e) =>
        e.symbol.toLowerCase().includes(term) ||
        (e.overview?.Name && e.overview.Name.toLowerCase().includes(term))
    );
    return res;
  }, [fullData, search]);

  return (
    <div className="App">
      <span style={{ padding: "24px" }}>
        <SearchBar setSearch={setSearch} />
      </span>

      <button onClick={() => setTab(Tabs.PRICES)}>Prices</button>
      <button onClick={() => setTab(Tabs.OVERVIEW)}>Overview</button>
      <button onClick={() => setTab(Tabs.INCOME)}>Income</button>
      <button onClick={() => setTab(Tabs.CASHFLOW)}>CashFlow</button>
      {tab == Tabs.INCOME && (
        <div>
          {data?.map((d) => (
            <BalanceDisplay key={`${d.symbol}-balance`} stock={d} />
          ))}
        </div>
      )}
      {tab == Tabs.PRICES && (
        <div
          style={{
            margin: "24px",
            display: "flex",
            maxWidth: "100vw",
            flexWrap: "wrap",
          }}
        >
          {data?.map((d) => (
            <PriceDisplay key={`${d.symbol}-price`} stock={d} />
          ))}
        </div>
      )}
      {tab == Tabs.OVERVIEW && <OverviewPage data={data} />}
      {tab == Tabs.CASHFLOW && (
        <div>
          {data?.map((d) => (
            <CashflowDisplay key={`${d.symbol}-cashflow`} stock={d} />
          ))}
        </div>
      )}
    </div>
  );
}

const OverviewPage: FC<{ data: Stock[] }> = ({ data }) => {
  const [sortVar, setSortVar] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(false);

  const sortedData = useMemo(() => {
    if (!sortVar) {
      return data;
    }
    // strings and numbers sort differently in JS rip
    if (Number.isNaN(Number(data[0].overview[sortVar]))) {
      return sortAsc
        ? data.sort((a, b) => a.overview[sortVar] < b.overview[sortVar])
        : data.sort((a, b) => a.overview[sortVar] > b.overview[sortVar]);
    }
    return data.sort((a, b) =>
      sortAsc
        ? b.overview[sortVar] - a.overview[sortVar]
        : a.overview[sortVar] - b.overview[sortVar]
    );
  }, [sortVar, data, sortAsc]);
  return (
    <div
      style={{
        paddingTop: "24px",
        paddingRight: "24px",
        display: "flex",
        flexDirection: "column",
        // maxWidth: "100vw",
        // flexWrap: "wrap",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", paddingBottom: "24px" }}
      >
        {Object.keys(cleanKeys(sortedData[0]?.overview)).map((key, i) => (
          <div
            style={{
              textAlign: "right",
              minWidth: COL_WIDTH,
              // color: i % 2 == 0 ? "#000" : "#777",
              height: "2em",
            }}
            key={`legend-overview-${i}`}
          >
            <button
              onClick={() => {
                if (sortVar != key) {
                  setSortVar(key);
                } else {
                  setSortAsc(!sortAsc);
                }
              }}
            >
              {key}
            </button>
          </div>
        ))}
      </div>
      {sortedData?.map((d) => (
        <OverviewDisplay key={`${d.symbol}-overview`} stock={d} />
      ))}
    </div>
  );
};

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
