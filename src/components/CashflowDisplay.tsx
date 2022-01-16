import { Stock } from "../api";
import { prettifyVal, Positive } from "./utils";

export function CashflowDisplay({ stock }: { stock: Stock }) {
  if (!stock?.cashflowQuarterly) {
    return <></>;
  }
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
