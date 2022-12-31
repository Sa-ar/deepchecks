import { useParse } from "./hooks/useParse";

import './App.css';

function App() {
  const { isLoading, columns, errors, isErrors, headers } = useParse("/house_prices.csv");

  return (
    <div className="App">
      {isErrors && (
        <div>
          <>Error: {JSON.stringify(errors)}</>
        </div>
      )}
      {!isErrors && isLoading && "Loading..."}
      <pre style={{ width: "100%", textAlign: "left" }}>
        {JSON.stringify(headers)}
        {!isErrors && !isLoading && JSON.stringify(columns, null, 2)}
      </pre>
    </div>
  );
}

export default App;
