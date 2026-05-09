'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart3 } from 'lucide-react';

const weeklyData = [
  { day: "Mon", sales: 45 },
  { day: "Tue", sales: 52 },
  { day: "Wed", sales: 38 },
  { day: "Thu", sales: 65 },
  { day: "Fri", sales: 85 },
  { day: "Sat", sales: 120 },
  { day: "Sun", sales: 90 },
];

const chartConfig = {
  sales: {
    label: "Orders",
    color: "#111111",
  },
};

export default function SalesChart() {
  return (
    <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm w-full flex flex-col">
      <div className="flex justify-between items-end mb-8">
         <div>
           <h3 className="text-xl font-black tracking-tight text-[#111111] uppercase mb-1">Weekly Volume</h3>
           <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Orders per day</p>
         </div>
         <div className="w-12 h-12 rounded-full bg-[#FAFAFA] flex items-center justify-center border border-gray-100">
           <BarChart3 className="w-5 h-5 text-[#FFAC00]" />
         </div>
      </div>

      <div className="h-[300px] w-full">
        <ChartContainer config={chartConfig} className="aspect-auto h-full w-full">
          <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 900, fill: '#D1D5DB' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 900, fill: '#D1D5DB' }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar 
              dataKey="sales" 
              radius={[6, 6, 0, 0]} 
              barSize={40}
            >
              {weeklyData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.day === 'Sat' ? '#FFAC00' : '#111111'} 
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
