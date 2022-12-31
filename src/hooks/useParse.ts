import { parse, ParseError, ParseMeta, ParseWorkerConfig } from "papaparse";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export function useParse(url: string) {
  const [columns, setColumns] = useState<{[key: string]: unknown}>({});
  const [rows, setRows] = useState<unknown[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [errors, setErrors] = useState<Array<ParseError | unknown>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState<ParseMeta>();

  const {
    isLoading: isFileLoading,
    isError,
    data: fileData,
    error,
  } = useQuery("getCsv", async () => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.text();
  });


  useEffect(() => {
    const parseConfig: ParseWorkerConfig = {
      dynamicTyping: true,
      header: true,
      worker: true,
      skipEmptyLines: true,
      complete: function ({ data, errors, meta }) {
        setHeaders(Object.keys(data[0]))
        setErrors(errors);
        setMeta(meta);
        setRows(data);
        setColumns(data.reduce((acc, row) => {
          Object.entries(row).map(([column, value]) => {
            acc[column] ? acc[column].push(value) : acc[column] = [value]
          });
          return acc;
        }, {}));
        setIsLoading(false);
      }
    };

    if (!isFileLoading && !isError && typeof fileData === "string") {
      parse(fileData, parseConfig);
    } else if (isFileLoading) {
      setIsLoading(true);
    } else if (isError) {
      setErrors([error]);
    }
  }, [fileData, isFileLoading, isError, error])

  return {
    columns,
    rows,
    errors,
    headers,
    isErrors: !!errors.length,
    isLoading,
    meta
  };
}
