"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CommitTooltip } from "./CommitTooltip";

const chartData = [
  { day: "Mon", commits: 5 },
  { day: "Tue", commits: 8 },
  { day: "Wed", commits: 3 },
  { day: "Thu", commits: 6 },
  { day: "Fri", commits: 12 },
  { day: "Sat", commits: 2 },
  { day: "Sun", commits: 4 },
];

export function RepositoryStats(): React.JSX.Element {
  return (
    <div className="glass-card p-5">
      <h3 className="mb-4 text-[16px] font-semibold">Commit Activity</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="day"
            tick={{ fill: "#9898B0", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fill: "#9898B0", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CommitTooltip />} />
          <Bar dataKey="commits" fill="#2DD4BF" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-[12px]">
          <span className="text-text-secondary">Most active day</span>
          <span className="font-semibold">Friday</span>
        </div>
        <div className="flex justify-between text-[12px]">
          <span className="text-text-secondary">Avg commits/week</span>
          <span className="font-semibold">5.7</span>
        </div>
      </div>
    </div>
  );
}
