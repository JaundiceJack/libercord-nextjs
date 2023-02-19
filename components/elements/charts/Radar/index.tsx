import { FC } from "react";
import React from "react";
import {
  RadarChart,
  Radar,
  Cell,
  Sector,
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import COLORS from "../colors";
import type { RadarInnerProps } from "./types";
import type { ChartProps } from "../types";
import { useWindowSize } from "../../../../hooks/useWindowSize";
import { yAxisTick } from "../ticks";

const CustomRadar: FC<ChartProps> = ({ data, activeIndex, onHover }) => {
  const { width: screenWidth, height: screenHeight } = useWindowSize();

  const radarHeight = 450;

  return (
    <>
      {data.length > 0 ? (
        <div
          className="relative flex items-center justify-center"
          style={{ width: "100%", height: radarHeight }}
        >
          <ResponsiveContainer width="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis
                orientation="left"
                angle={90}
                tickFormatter={yAxisTick}
              />
              <Radar
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div
          style={{ height: radarHeight }}
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

export default CustomRadar;
