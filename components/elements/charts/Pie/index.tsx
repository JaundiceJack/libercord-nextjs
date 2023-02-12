import { FC } from "react";
import React from "react";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from "recharts";
import COLORS from "../colors";
import type { PieInnerProps } from "./types";
import type { ChartProps } from "../types";
import { useWindowSize } from "../../../../hooks/useWindowSize";

const CustomPie: FC<ChartProps> = ({ data, activeIndex, onHover }) => {
  const { width: screenWidth, height: screenHeight } = useWindowSize();

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
        <div
          className="relative flex items-center justify-center"
          style={{ width: "100%", height: pieHeight }}
        >
          <ResponsiveContainer width="100%">
            <PieChart>
              <Pie
                dataKey="value"
                data={data}
                labelLine={false}
                label={renderCustomizedLabel}
                innerRadius={80}
                outerRadius={screenWidth && screenWidth >= 640 ? 175 : 150}
                paddingAngle={1.5}
                inactiveShape={renderShape("inactive")}
                activeShape={renderShape("active")}
                onMouseOver={onHover}
                activeIndex={activeIndex}
                isAnimationActive={false}
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
          <div
            className={`absolute flex flex-col items-center justify-center 
            font-jose text-white rounded-full p-4`}
            style={{
              width: 160,
              height: 160,
              background: "#383840",
              boxShadow: "inset 0 0 4px 2px #223",
            }}
          >
            <p
              style={{ color: COLORS[activeIndex % COLORS.length] }}
              className="text-lg text-center w-full overflow-hidden text-ellipsis"
            >
              {data[activeIndex]?.name}
            </p>
            <p>${data[activeIndex]?.value}</p>
          </div>
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
