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
    <article className="w-1/2 max-h-80 p-5">
      <form className="flex justify-between w-full mb-2 mt-2">
        <Select
          value={currentColumn}
          options={headers
            .filter((header) => header.toLowerCase() !== "id")
            .map((header) => ({ value: header.toLowerCase(), label: header }))}
          onChange={(newColumn) => setCurrentColumn(newColumn)}
          className="font-medium min-h-full"
        />
        {isNumericColumn && (
          <label className="flex text-sm font-medium text-gray-900 dark:text-gray-300 gap-2">
            Distribution Percentage:
            <input
              type="number"
              defaultValue={10}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setStepPercentage(Number(e.currentTarget.value))}
            />
          </label>
        )}
      </form>

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
