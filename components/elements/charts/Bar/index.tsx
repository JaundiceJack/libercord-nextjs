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
  ReferenceLine,
} from "recharts";
import COLORS from "../colors";
import type { BarInnerProps, TooltipInnerProps } from "./types";
import type { ChartProps } from "../types";
import { DataKeys } from "../Line/types";
import { xAxisTick, yAxisTick } from "../ticks";
import { capitalize } from "../../../../helpers/strings";
import { useReduxSelector } from "../../../../hooks/useRedux";
import { selectSummary, SummaryLines } from "../../../../redux/summarySlice";
import usePath from "../../../../hooks/usePath";

const CustomBar: FC<ChartProps & DataKeys> = ({
  data,
  dataKeys,
  activeIndex,
  onHover,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const { recordPath } = usePath();

  const { summaryExpensesNegative, summaryLines } =
    useReduxSelector(selectSummary);

  const CustomTooltip = ({ active, payload, label }: TooltipInnerProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-md bg-slate-400 p-2">
          <p className="w-full text-center">{`${label}`}</p>
          {payload.map((pl, i) => (
            <div className="grid grid-cols-2 gap-1" key={i}>
              <p className="text-right">{`${capitalize(
                dataKeys ? pl?.name : recordPath
              )}:`}</p>
              <p className="">{`${
                pl?.value && pl.value < 0 ? "-" : ""
              }$${Math.abs(pl?.value || 0)}`}</p>
            </div>
          ))}
        </div>
      );
    } else return null;
  };

  const renderRoundedBar = (props: BarInnerProps) => {
    const { fill, x, y, width: w, height: h, index } = props;
    const r = h < 5 ? h : 5; // radius of the arc (5px for heights over 5px)
    const l = w * 0.75; // length of bar's base
    const value = data[index]?.value;
    const income = data[index]?.income;
    const expense = -(data[index]?.expense || 0);
    const savings = data[index]?.savings;

    return dataKeys ? (
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
    ) : (
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
        opacity="85%"
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
              stackOffset="sign"
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
              <ReferenceLine y={0} stroke="#000" />
              <Tooltip
                cursor={{ fill: "transparent" }}
                wrapperStyle={{ outline: "none" }}
                content={<CustomTooltip />}
              />
              {dataKeys ? (
                dataKeys.map(
                  (key, i) =>
                    summaryLines.includes(key as SummaryLines) && (
                      <Bar
                        key={i}
                        dataKey={key}
                        opacity="80%"
                        stackId={summaryExpensesNegative ? "a" : key}
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
                            fill={
                              key === "income"
                                ? "rgba(74, 222, 128, 0.75)"
                                : key === "expense"
                                ? "rgba(248, 113, 113, 0.75)"
                                : key === "savings"
                                ? "rgba(250, 204, 21, 0.75)"
                                : COLORS[i % COLORS.length]
                            }
                          />
                        ))}
                      </Bar>
                    )
                )
              ) : (
                <Bar
                  dataKey="value"
                  opacity="80%"
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
              )}
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
