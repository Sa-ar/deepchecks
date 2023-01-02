import { useParse } from "./hooks/useParse";

import "./App.css";
import ColumnData from "./components/ColumnData";

function App() {
  const { isLoading, columns, errors, isErrors, headers } =
    useParse("/house_prices.csv");

  return (
    <div className="App">
      {isErrors && (
        <div>
          <>Error: {JSON.stringify(errors)}</>
        </div>
      )}
      {!isErrors && isLoading && "Loading..."}
      {!isErrors && !isLoading && (
        <ColumnData headers={headers} columns={columns} />
      )}
    </div>
  );
}

export default App;
