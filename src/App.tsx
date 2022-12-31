import { useState } from "react";

import { useParse } from "./hooks/useParse";

import Select, { SelectValue } from "./adapters/Select";

import "./App.css";

function App() {
  const { isLoading, columns, errors, isErrors, headers } =
    useParse("/house_prices.csv");
  const [currentColumn, setCurrentColumn] = useState<SelectValue>(null);

  return (
    <div className="App">
      {isErrors && (
        <div>
          <>Error: {JSON.stringify(errors)}</>
        </div>
      )}
      {!isErrors && isLoading && "Loading..."}
      <Select
        value={currentColumn}
        options={headers
          .filter((header) => header.toLowerCase() !== "id")
          .map((header) => ({ value: header.toLowerCase(), label: header }))}
        onChange={(newColumn) => setCurrentColumn(newColumn)}
      />
      <pre style={{ width: "calc(100vw - 60px)", textAlign: "left" }}>
        {!isErrors &&
          !isLoading &&
          currentColumn?.label &&
          JSON.stringify(columns[currentColumn.label], null, 2)}
      </pre>
    </div>
  );
}

export default App;
