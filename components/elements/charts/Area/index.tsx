import { FC, useState } from "react";
import React from "react";
import {
  AreaChart,
  Area,
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
import type { AreaInnerProps } from "./types";
import type { ChartProps } from "../types";

const CustomArea: FC<ChartProps> = ({ data, activeIndex, onHover }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const areaHeight = 450;

  return (
    <>
      {data.length > 0 ? (
        <div
          className="lg:px-6 pt-10 font-jose"
          style={{ width: "100%", height: areaHeight }}
        >
          <ResponsiveContainer>
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="5 5" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />

              <Area
                type="monotone"
                dataKey="value"
                onMouseOut={() => setHoverIndex(null)}
                fill="8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div
          style={{ height: areaHeight }}
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

export default CustomArea;
