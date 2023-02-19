export type BarInnerProps = {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
};

export interface PayloadType {
  name?: string;
  value?: number;
}

export type TooltipInnerProps = {
  label?: string;
  active?: number;
  payload?: PayloadType[];
};

export interface DataKeys {
  dataKeys?: string[];
}
