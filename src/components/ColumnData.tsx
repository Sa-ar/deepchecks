import { useState } from "react";

import Select, { SelectValue } from "../adapters/Select";
import DataChart from "./DataChart";

type ColumnDataProps = {
  headers: string[];
  columns: {
    [key: string]: unknown[];
  }
}

function ColumnData({ headers, columns }: ColumnDataProps) {
  const [currentColumn, setCurrentColumn] = useState<SelectValue>(null);

  return (
    <article>
      <Select
        value={currentColumn}
        options={headers
          .filter((header) => header.toLowerCase() !== "id")
          .map((header) => ({ value: header.toLowerCase(), label: header }))}
        onChange={(newColumn) => setCurrentColumn(newColumn)}
      />

      {currentColumn && (
        <DataChart header={currentColumn.label} values={columns[currentColumn.label]} />
      )}
    </article>
  );
}

export default ColumnData;
