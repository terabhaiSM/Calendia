"use client";

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  { name: "Mon", total: 4 },
  { name: "Tue", total: 6 },
  { name: "Wed", total: 3 },
  { name: "Thu", total: 5 },
  { name: "Fri", total: 7 },
  { name: "Sat", total: 2 },
  { name: "Sun", total: 1 },
]; //sample data to be replaced with actual data

export function Overview() {
  return (
    <div className="h-[350px] sm:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            width={30}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Card className="p-2 !bg-background border shadow-md">
                    <p className="text-sm font-medium">{`${payload[0].value} appointments`}</p>
                  </Card>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="currentColor"
            strokeWidth={2}
            dot={{
              strokeWidth: 2,
              r: 4,
              stroke: "currentColor",
              fill: "var(--background)",
            }}
            className="stroke-primary"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}