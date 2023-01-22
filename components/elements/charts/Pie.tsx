import { FC, useState } from "react";
import React from "react";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from "recharts";
import PieLegend from "./PieLegend";
import ChartToggle from "./CatalogToggle";
import COLORS from "./colors";

export type Datum = { name: string; value: number; percent?: number };

interface PieProps {
  data: Datum[];
  activeIndex: number;
  onPieHover: (data: Datum | null, index: number) => void;
}

const CustomPie: FC<PieProps> = ({ data, activeIndex, onPieHover }) => {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
    index: number;
  }) => {
    const entry = data[activeIndex];
    const sector = data[index];

    const entryLines = entry?.name.split(" ");
    const lineLength = 14;
    const line1 =
      entryLines[0].length > lineLength
        ? entryLines[0].slice(0, lineLength) + "..."
        : entryLines[0];
    const line2 =
      entryLines.length > 1 &&
      (entryLines[1].length > lineLength
        ? entryLines[1].slice(0, lineLength) + "..."
        : entryLines[1] + (entryLines.length > 2 ? " ..." : ""));

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const percentX = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const percentY = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <>
        {Number(sector?.percent) > 0.05 && (
          <text
            className="font-jose font-semibold"
            x={percentX}
            y={percentY}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {(Number(sector?.percent) * 100).toFixed(0) + "%"}
          </text>
        )}

        <text
          x="50%"
          y={entry?.name.length > 14 ? "44%" : "47%"}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          className="font-jose"
        >
          {line1}
        </text>

        {line2 && (
          <text
            x="50%"
            y="50%"
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            className="font-jose"
          >
            {line2}
          </text>
        )}

        <text
          x="50%"
          y={entry?.name.length > 14 ? "56%" : "53%"}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          className="font-jose"
        >
          {`$${entry?.value}`}
        </text>
      </>
    );
  };

  const renderActiveShape = ({
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  }: {
    cx: number;
    cy: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
  }) => {
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 5}
          outerRadius={outerRadius + 8}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <>
      {data.length > 0 ? (
        <div style={{ width: "100%", height: 450 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                dataKey="value"
                data={data}
                labelLine={false}
                label={renderCustomizedLabel}
                innerRadius={80}
                outerRadius={175}
                paddingAngle={1.5}
                activeShape={renderActiveShape}
                fill="#8884d8"
                onMouseOver={onPieHover}
                activeIndex={activeIndex}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div
          style={{ height: 450 }}
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

export default CustomPie;
