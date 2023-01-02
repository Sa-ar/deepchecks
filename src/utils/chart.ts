export enum EValueType { numeric = "line", categorical = "bar" };

export type distributionRange = {
  startValue: number;
  endValue: number;
}

export function getColumnValuesType(values: unknown[]) {
  return values.every(value => typeof value === "number") ? EValueType.numeric : EValueType.categorical;
}

export function getMinAndMax(values: number[]) {
  return [Math.min(...values), Math.max(...values)];
}

export function getDistributionRanges(values: number[], stepPercentage: number) {
  const [min, max] = getMinAndMax(values);
  const step = Math.floor((max - min) * (stepPercentage / 100));
  const distributionRanges = [];

  for (let i = min; i < max; i += step) {
    distributionRanges.push({ startValue: i === min ? i : i + 1, endValue: i + step });
  }

  return distributionRanges;
}

export function distributionRangeToString(distributionRange: distributionRange) {
  return `${distributionRange.startValue} - ${distributionRange.endValue}`;
}
