export type Datum = {
  name: string;
  value: number;
  percent?: number;
  type?: "source" | "category" | "location";
};

export type ChartProps = {
  data: Datum[];
  activeIndex: number;
  onHover: (data: Datum | null, index: number) => void;
};
