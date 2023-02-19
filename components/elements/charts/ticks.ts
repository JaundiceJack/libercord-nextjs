export const xAxisTick = (value: string, index: number) => {
  const isYear = !isNaN(Number(value));
  return value?.substring(0, isYear ? 4 : 1);
};

export const yAxisTick = (value: string, index: number) => {
  const asNum = Number(value);
  if (isNaN(asNum)) return `$${value}`;

  const neg = asNum < 0 ? "-" : "";
  const abs = Math.abs(asNum);

  return abs < 1000
    ? `${neg}$${abs}`
    : abs < 1000000
    ? `${neg}$${abs / 1000}K`
    : abs < 1000000000
    ? `${neg}$${abs / 1000000}M`
    : `${neg}$${abs / 1000000000}B`;
};
