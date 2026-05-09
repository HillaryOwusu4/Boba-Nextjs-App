'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart as PieIcon } from 'lucide-react';

const categoryData = [
  { category: "Matcha", v: 400, color: "#111111" },
  { category: "Milk Tea", v: 300, color: "#FFAC00" },
  { category: "Fruit Tea", v: 200, color: "#f0f0f0" },
  { category: "Signature", v: 100, color: "#333333" },
];

const chartConfig = {
  v: {
    label: "Orders",
  },
};

export default function CategoryDistribution() {
  return (
    <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm w-full flex flex-col">
      <div className="flex justify-between items-end mb-8">
         <div>
           <h3 className="text-xl font-black tracking-tight text-[#111111] uppercase mb-1">Sales by Category</h3>
           <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Customer Favorites</p>
         </div>
         <div className="w-12 h-12 rounded-full bg-[#FAFAFA] flex items-center justify-center border border-gray-100">
           <PieIcon className="w-5 h-5 text-[#FFAC00]" />
         </div>
      </div>

      <div className="h-[300px] w-full relative">
        <ChartContainer config={chartConfig} className="aspect-auto h-full w-full">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              paddingAngle={5}
              dataKey="v"
              stroke="none"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          </PieChart>
        </ChartContainer>
        
        {/* Centered Total (Optional but looks premium) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
          <span className="text-2xl font-black text-[#111111]">1,000</span>
          <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Total Orders</span>
        </div>
      </div>

      {/* Legend Below */}
      <div className="mt-8 flex justify-center gap-6 flex-wrap">
         {categoryData.map((item) => (
           <div key={item.category} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.category}</span>
           </div>
         ))}
      </div>
    </div>
  );
}
