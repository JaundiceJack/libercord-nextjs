import { FC, useState } from "react";
import React from "react";
import {
  LineChart,
  Line,
  Legend,
  LegendType,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import COLORS from "../colors";
import type {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import type { LineInnerProps, DataKeys, TooltipInnerProps } from "./types";
import type { ChartProps } from "../types";
import { capitalize } from "../../../../helpers/strings";
import { xAxisTick, yAxisTick } from "../ticks";
import usePath from "../../../../hooks/usePath";

const CustomLine: FC<ChartProps & DataKeys> = ({
  data,
  dataKeys,
  activeIndex,
  onHover,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const { recordPath } = usePath();

  const CustomTooltip = ({ active, payload, label }: TooltipInnerProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-md bg-slate-400 p-2">
          <p className="w-full text-center">{`${label}`}</p>
          {payload.map((pl, i) => (
            <div className="grid grid-cols-2 gap-1" key={i}>
              <p className="text-right">{`${capitalize(pl?.name)}:`}</p>
              <p className="">{`${
                pl?.value && pl.value < 0 ? "-" : ""
              }$${Math.abs(pl?.value || 0)}`}</p>
            </div>
          ))}
        </div>
      );
    } else return null;
  };

  const barHeight = 450;

  return (
    <>
      {data.length > 0 ? (
        <div
          className="lg:px-6 pt-10 font-jose"
          style={{ width: "100%", height: barHeight }}
        >
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="5 5" vertical={false} />
              <XAxis tickFormatter={xAxisTick} dataKey="name" />
              <YAxis tickFormatter={yAxisTick} />
              <Legend
                formatter={(
                  value: any,
                  entry: {
                    value: any;
                    id?: string | undefined;
                    type?: LegendType | undefined;
                    color?: string | undefined;
                    payload?: { strokeDasharray: React.ReactText } | undefined;
                  },
                  index: number
                ) => {
                  return dataKeys ? dataKeys[index] : recordPath;
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              {dataKeys ? (
                dataKeys.map((key, i) => (
                  <Line
                    type="monotone"
                    key={i}
                    stroke={
                      key === "income"
                        ? "rgba(74, 222, 128, 0.75)"
                        : key === "expense"
                        ? "rgba(248, 113, 113, 0.75)"
                        : key === "savings"
                        ? "rgba(250, 204, 21, 0.75)"
                        : COLORS[i % COLORS.length]
                    }
                    dataKey={key}
                    onMouseOut={() => setHoverIndex(null)}
                  />
                ))
              ) : (
                <Line
                  type="monotone"
                  stroke={
                    recordPath === "income"
                      ? "rgba(74, 222, 128, 0.75)"
                      : recordPath === "expenses"
                      ? "rgba(248, 113, 113, 0.75)"
                      : "rgba(129, 140, 248)"
                  }
                  dataKey="value"
                  onMouseOut={() => setHoverIndex(null)}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div
          style={{ height: barHeight }}
          className="flex items-center justify-center"
        >
          <p className="text-center text-white font-jose">
            Add data for this timepoint to graph it
          </p>
        </div>
      )}
    </>
  );
};

export default CustomLine;
