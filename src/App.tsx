import { useEffect } from 'react';

import { useParse } from "./hooks/useParse";

import Toast, { emitToast } from "./adapters/Toast";

import ColumnData from "./components/ColumnData";
import Header from "./components/Header";
import Loader from "./components/Loader";

function App() {
  const { isLoading, columns, errors, isErrors, headers } =
    useParse("/house_prices.csv");

  useEffect(() => {
    if (isErrors) {
      errors.forEach(error => emitToast.error(error.message || "Unknown error occurred."))
    }
  }, [isErrors, errors])

  return (
    <div className="max-h-80 p-0 m-0">
      <Header />
      {!isErrors && isLoading && <Loader />}
      {!isErrors && !isLoading && (
        <ColumnData headers={headers} columns={columns} />
      )}
      <Toast />
    </div>
  );
}

export default App;
