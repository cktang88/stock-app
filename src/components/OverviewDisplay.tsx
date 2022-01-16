import { Stock } from "../api";
import { prettifyVal } from "./utils";

export const COL_WIDTH = "120px";
export const OverviewDisplay = ({ stock }: { stock: Stock }) => {
  const data = cleanKeys(stock.overview);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {Object.entries(data).map(([key, value], i) => (
        <div
          style={{
            textAlign: "right",
            overflow: "hidden",
            whiteSpace: "nowrap",
            // color: i % 2 == 0 ? "#000" : "#777",
            height: "2em",
            minWidth: COL_WIDTH,
          }}
          key={`${stock.symbol}-overview-item-${i}`}
        >
          {prettifyVal(value)[0]}
        </div>
      ))}
    </div>
  );
};

export const cleanKeys = (obj: Object) => {
  const processed = Object.assign({}, obj);
  // NOTE: description is actually the only nullable field
  const ignoredFields = [
    "Description",
    "Name",
    "Industry",
    "Sector",
    "Address",
    "CIK",
    "AssetType",
    "Country",
    "Currency",
  ];
  ignoredFields.forEach((field) => {
    delete processed[field];
  });

  return processed;
};
