import React from "react";
import { ResponsiveContainer, AreaChart, YAxis, Area, Tooltip } from "recharts";

const DynamicLineChart = ({ values }) => {
  if (values.length === 0) {
    return null; // Return null if there is no data
  }

  // Debugging: log the values to ensure data is passed correctly
  console.log("Chart values:", values);

  // Calculate the minimum and maximum values
  const minValue = Math.min(...values.map((d) => d.value));
  const maxValue = Math.max(...values.map((d) => d.value));

  // Ensure there is a slight difference if minValue and maxValue are the same
  const adjustedMin = minValue === maxValue ? minValue - 1 : minValue;
  const adjustedMax = minValue === maxValue ? maxValue + 1 : maxValue;

  return (
    <ResponsiveContainer width="100%" height={45}>
      <AreaChart data={values}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="1%" stopColor="#304463" stopOpacity={0} />
            <stop offset="30%" stopColor="#304463" stopOpacity={1} />
            <stop offset="70%" stopColor="#304463" stopOpacity={1} />
            <stop offset="99%" stopColor="#304463" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="areaFill_0" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#304463" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#304463" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <YAxis domain={[adjustedMin, adjustedMax]} hide={true} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke="url(#colorValue)" // Apply gradient to the stroke
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#areaFill_0)" // Gradient fill for the area
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DynamicLineChart;
