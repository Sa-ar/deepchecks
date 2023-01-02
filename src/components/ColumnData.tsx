import { useEffect, useState } from "react";

import Select, { SelectValue } from "../adapters/Select";
import { EValueType, getColumnValuesType } from "../utils/chart";
import DataChart from "./DataChart";

type ColumnDataProps = {
  headers: string[];
  columns: {
    [key: string]: unknown[];
  };
};

function ColumnData({ headers, columns }: ColumnDataProps) {
  const [currentColumn, setCurrentColumn] = useState<SelectValue>(null);
  const [stepPercentage, setStepPercentage] = useState(10);
  const [isNumericColumn, setIsNumericColumn] = useState(false);

  useEffect(() => {
    setIsNumericColumn(
      !!currentColumn?.label &&
        getColumnValuesType(columns[currentColumn.label || ""]) ===
          EValueType.numeric
    );
  }, [currentColumn]);

  return (
    <article>
      <Select
        value={currentColumn}
        options={headers
          .filter((header) => header.toLowerCase() !== "id")
          .map((header) => ({ value: header.toLowerCase(), label: header }))}
        onChange={(newColumn) => setCurrentColumn(newColumn)}
      />
      {isNumericColumn && (
        <label>
          Distribution Percentage:{" "}
          <input
            type="number"
            defaultValue={10}
            onChange={(e) => setStepPercentage(Number(e.currentTarget.value))}
          />
        </label>
      )}

      {currentColumn && (
        <DataChart
          header={currentColumn.label}
          values={columns[currentColumn.label]}
          stepPercentage={stepPercentage}
        />
      )}
    </article>
  );
}

export default ColumnData;
