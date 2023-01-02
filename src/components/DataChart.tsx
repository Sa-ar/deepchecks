import { useMemo } from "react";
import Chart from "../adapters/Chart";
import {
  distributionRangeToString,
  EValueType,
  getColumnValuesType,
  getDistributionRanges,
} from "../utils/chart";

type DataChartProps = {
  header: string;
  values: unknown[];
  stepPercentage?: number;
};

const chartFunctionsMap = {
  [EValueType.categorical]: {
    getData(values: unknown[], labels: string[]) {
      return labels.map(
        (label) => values.filter((value) => label === value).length
      );
    },
    getLabels(values: unknown[]): string[] {
      return [...new Set(values as string[])];
    },
  },
  [EValueType.numeric]: {
    getData(values: unknown[], _labels: string[], stepPercentage: number) {
      const distributionRanges = getDistributionRanges(
        values as number[],
        stepPercentage
      );

      return distributionRanges.map(
        ({ startValue, endValue }) =>
          (values as number[]).filter((value, index, { length }) => {
            if (index === length - 1)
              return value >= startValue && value <= endValue;

            return value >= startValue && value < endValue;
          }).length
      );
    },
    getLabels(values: unknown[], stepPercentage: number): string[] {
      const distributionRanges = getDistributionRanges(
        values as number[],
        stepPercentage
      );

      return distributionRanges.map(distributionRangeToString);
    },
  },
};

function DataChart({ header, values, stepPercentage = 10 }: DataChartProps) {
  const columnValueType = useMemo(() => getColumnValuesType(values), [values]);
  const labels = useMemo(
    () => chartFunctionsMap[columnValueType].getLabels(values, stepPercentage),
    [values, stepPercentage]
  );
  const data = useMemo(
    () =>
      chartFunctionsMap[columnValueType].getData(
        values,
        labels,
        stepPercentage
      ),
    [values, labels, stepPercentage]
  );

  return (
    <Chart type={columnValueType} data={data} labels={labels} header={header} />
  );
}

export default DataChart;
