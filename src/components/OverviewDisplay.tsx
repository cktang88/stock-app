import { useMemo } from "react";
import { Stock } from "../api";

export const OverviewDisplay = ({ stock }: { stock: Stock }) => {
  const data = useMemo(() => {
    const processed = { ...stock };
    delete processed?.overview["Description"];
    // delete processed?.overview["Name"];
    delete processed?.overview["Industry"];
    delete processed?.overview["Sector"];
    delete processed?.overview["Address"];
    return processed;
  }, [stock]);

  return (
    <div style={{ display: "flex", paddingLeft: "60px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {Object.entries(data?.overview).map(([key, value]) => (
          <div style={{ textAlign: "left", width: "200px" }}>{key}</div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {Object.entries(data?.overview).map(([key, value]) => (
          <div style={{ textAlign: "right" }}>{value}</div>
        ))}
      </div>
    </div>
  );
};
