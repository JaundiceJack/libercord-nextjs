export type Datum = {
  name: string;
  value: number;
  percent?: number;
  type?: "source" | "category" | "location";
};

export const sortByPercent = (a: Datum, b: Datum) =>
  a.percent! > b.percent! ? -1 : 1;
