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
  Legend,
  LegendType,
  ReferenceLine,
} from "recharts";
import COLORS from "../colors";
import type { BarInnerProps, TooltipInnerProps } from "./types";
import type { ChartProps } from "../types";
import { DataKeys } from "../Line/types";
import { xAxisTick, yAxisTick } from "../ticks";
import { capitalize } from "../../../../helpers/strings";
import { useReduxSelector } from "../../../../hooks/useRedux";
import { selectSummary } from "../../../../redux/summary";
import usePath from "../../../../hooks/usePath";
import { SummaryLines } from "../../../../redux/types";

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
                pl?.value && Number(pl.value) < 0 ? "-" : ""
              }$${Math.abs(Number(pl?.value) || 0)}`}</p>
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

  const CustomSummaryLegend = ({ payload }: TooltipInnerProps) => {
    return (
      <ul
        className={`grid 
        ${summaryLines.length > 2 ? "grid-cols-2" : "grid-cols-1"} 
        ${
          summaryLines.length === 4
            ? "sm:grid-cols-4"
            : summaryLines.length === 3
            ? "sm:grid-cols-3"
            : summaryLines.length === 2
            ? "sm:grid-cols-2"
            : "sm:grid-cols-1"
        } 
        gap-2 items-center justify-center sm:w-3/4 mx-auto`}
      >
        {payload &&
          payload.map((entry, index) => (
            <li
              key={index}
              className={`flex flex-row items-center ${
                summaryLines.length === 1
                  ? "justify-center"
                  : index % 2 === 0
                  ? "justify-end"
                  : "justify-start"
              } sm:justify-center`}
            >
              <div
                style={{
                  background:
                    entry.value === "income"
                      ? "rgba(74, 222, 128, 0.75)"
                      : entry.value === "expense"
                      ? "rgba(248, 113, 113, 0.75)"
                      : entry.value === "savings"
                      ? "rgba(250, 204, 21, 0.75)"
                      : "rgba(78, 176, 241, 0.75)",
                }}
                className="mr-1 h-4 w-4 rounded"
              />
              <p className="text-white">{entry.value}</p>
            </li>
          ))}
      </ul>
    );
  };

  const barHeight = 450;

  return (
    <>
      {data.length > 0 ? (
        <div
          className="lg:px-6 pt-10 font-jose"
          style={{ width: "100%", height: "100%" }}
        >
          <ResponsiveContainer>
            <BarChart
              data={data}
              stackOffset="sign"
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="5 5" vertical={false} />
              <XAxis tickFormatter={xAxisTick} dataKey="name" />
              <YAxis tickFormatter={yAxisTick} />
              <ReferenceLine y={0} stroke="#000" />
              {recordPath === "summary" && (
                <Legend content={<CustomSummaryLegend />} />
              )}
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
                        stackId={
                          summaryExpensesNegative && key !== "cash" ? "a" : key
                        }
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
                                : key === "cash"
                                ? "rgba(78, 176, 241, 0.75)"
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
