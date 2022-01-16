import { useMemo } from "react";
import { Stock } from "../api";

export const OverviewDisplay = ({ stock }: { stock: Stock }) => {
  const data = useMemo(() => {
    const processed = Object.assign({}, stock.overview);
    delete processed["Description"];
    delete processed["Name"];
    delete processed["Industry"];
    delete processed["Sector"];
    delete processed["Address"];
    return processed;
  }, [stock]);

  return (
    <div style={{ display: "flex", paddingLeft: "60px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {Object.entries(data).map(([key, value]) => (
          <div style={{ textAlign: "left", width: "200px" }}>{key}</div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {Object.entries(data).map(([key, value]) => (
          <div style={{ textAlign: "right" }}>{value}</div>
        ))}
      </div>
    </div>
  );
};
