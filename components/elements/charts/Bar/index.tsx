import { FC, useState } from "react";
import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  TooltipProps,
} from "recharts";
import COLORS from "../colors";
import type {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import type { BarInnerProps } from "./types";
import type { ChartProps } from "../types";

const CustomBar: FC<ChartProps> = ({ data, activeIndex, onHover }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const xAxisTick = (value: string, index: number) => {
    const isYear = !isNaN(Number(value));
    return value?.substring(0, isYear ? 4 : 3);
  };
  const yAxisTick = (value: string, index: number) => {
    const asNum = Number(value);
    if (isNaN(asNum)) return "$" + value;
    if (asNum < 1000) return "$" + value;
    if (asNum < 1000000) return "$" + asNum / 1000 + "K";
    if (asNum < 1000000000) return "$" + asNum / 1000000 + "M";
    return "$" + asNum / 1000000000 + "B";
  };

  const renderTooltip = (props: TooltipProps<ValueType, NameType>) => {
    const { active, payload, label } = props;
    if (hoverIndex !== null && active && payload && payload.length) {
      return (
        <div className={`bg-white rounded-lg border-2 border-stone-600 p-2`}>
          <p className="font-jose">{`${label} : $${payload[0].value}`}</p>
        </div>
      );
    } else return null;
  };

  const renderRoundedBar = (props: BarInnerProps) => {
    const { fill, x, y, width: w, height: h, index } = props;
    const r = h < 5 ? h : 5; // radius of the arc (5px for heights over 5px)
    const l = w * 0.75; // length of bar's base
    return (
      <path
        d={`
          M${x + w / 8},${y} 
          h${l - r} 
          a${r},${r} 0 0 1 ${r},${r} 
          v${h - r} 
          h-${l + r} 
          v-${h - r} 
          a${r},${r} 0 0 1 ${r},-${r}
        `}
        stroke={index === hoverIndex ? "#FFF" : "none"}
        fill={fill}
      />
    );
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
            <BarChart
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
              <YAxis tickFormatter={yAxisTick} dataKey="value" />
              <Tooltip
                cursor={{ fill: "transparent" }}
                wrapperStyle={{ outline: "none" }}
                content={renderTooltip}
              />
              <Bar
                dataKey="value"
                shape={renderRoundedBar}
                onMouseOut={() => setHoverIndex(null)}
                onMouseOver={(_, index) => {
                  onHover(null, index);
                  setHoverIndex(index);
                }}
                onClick={(_, index) => setHoverIndex(index)}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
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

export default CustomBar;
