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

export function getDistributionRanges(values: number[], binsAmount: number) {
  const [min, max] = getMinAndMax(values);
  const step = Math.floor((max - min) / binsAmount);
  const binsRanges = Array(binsAmount).fill("").map((_, i, { length }) => ({ startValue: min + (i * step), endValue: i === length - 1 ? max : min + ((i + 1) * step) }));

  return binsRanges;
}

export function distributionRangeToString(distributionRange: distributionRange) {
  return `${distributionRange.startValue} - ${distributionRange.endValue}`;
}
