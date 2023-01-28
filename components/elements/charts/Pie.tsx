import { FC, useState } from "react";
import React from "react";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from "recharts";
import COLORS from "./colors";
import { Datum } from "./types";
import { max } from "date-fns";

interface PieProps {
  data: Datum[];
  activeIndex: number;
  onPieHover: (data: Datum | null, index: number) => void;
}

type PieInnerProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  index: number;
};

const CustomPie: FC<PieProps> = ({ data, activeIndex, onPieHover }) => {
  const renderPiePercentSVGText = (
    percent: number,
    posX: number,
    posY: number
  ) => {
    if (percent > 0.05) {
      return (
        <text
          className="font-jose font-semibold"
          x={posX}
          y={posY}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {(percent * 100).toFixed(0) + "%"}
        </text>
      );
    }
  };

  const renderPieLabelSVGText = (inputText: string, maxLength: number) => {
    const words = inputText.split(" ");
    const line1 =
      words.length > 0
        ? words[0].length < maxLength
          ? words[0]
          : words[0].slice(0, maxLength) + "..."
        : "";
    const line2 =
      words.length > 1
        ? words[1].length < maxLength
          ? words[1] + (words.length > 2 ? " ..." : "")
          : words[1].slice(0, maxLength) + "..."
        : "";

    return (
      <>
        <text
          x="50%"
          y={line2 === "" ? "47%" : "44%"}
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
            y="48.5%"
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            className="font-jose"
          >
            {line2}
          </text>
        )}
      </>
    );
  };

  const renderPieAmountSVGText = (amount: number, currency: string) => {
    return (
      <text
        x="50%"
        y="53%"
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-jose"
      >
        {`${currency}${amount}`}
      </text>
    );
  };

  const renderCustomizedLabel = (props: PieInnerProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, index } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const magic = (-midAngle * Math.PI) / 180;
    const percentPos = (axis: "x" | "y") =>
      (axis === "x" ? cx : cy) +
      radius * (axis === "x" ? Math.cos(magic) : Math.sin(magic));

    return (
      <>
        {renderPiePercentSVGText(
          Number(data[index]?.percent),
          percentPos("x"),
          percentPos("y")
        )}
        {renderPieLabelSVGText(data[activeIndex]?.name, 14)}
        {renderPieAmountSVGText(data[activeIndex]?.value, "$")}
      </>
    );
  };

  const renderShape = (type: "active" | "inactive") => {
    return (props: PieInnerProps) => {
      const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
        props;
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
          {type === "active" && (
            <Sector
              cx={cx}
              cy={cy}
              startAngle={startAngle}
              endAngle={endAngle}
              innerRadius={outerRadius + 5}
              outerRadius={outerRadius + 8}
              fill={fill}
            />
          )}
        </g>
      );
    };
  };

  const pieHeight = 450;

  return (
    <>
      {data.length > 0 ? (
        <div style={{ width: "100%", height: pieHeight }}>
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
                inactiveShape={renderShape("inactive")}
                activeShape={renderShape("active")}
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
          style={{ height: pieHeight }}
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
