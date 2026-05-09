'use client';

import { BarChart3 } from 'lucide-react';

export default function SalesChart() {
  // Dummy data generated for the chart
  const weeklyData = [
    { day: "Mon", sales: 45 },
    { day: "Tue", sales: 52 },
    { day: "Wed", sales: 38 },
    { day: "Thu", sales: 65 },
    { day: "Fri", sales: 85 },
    { day: "Sat", sales: 120 },
    { day: "Sun", sales: 90 },
  ];

  const maxSales = Math.max(...weeklyData.map(d => d.sales));

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-gray-100 shadow-sm w-full lg:w-2/3 flex flex-col pt-8">
      
      <div className="flex justify-between items-end mb-12">
         <div>
           <h3 className="text-xl font-black tracking-tight text-[#111111] uppercase mb-1">Weekly Volume</h3>
           <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Trailing 7 Days</p>
         </div>
         <div className="w-12 h-12 rounded-full bg-[#FAFAFA] flex items-center justify-center border border-gray-100">
           <BarChart3 className="w-5 h-5 text-[#FFAC00]" />
         </div>
      </div>

      <div className="flex-1 flex items-end gap-2 sm:gap-6 justify-between h-48 sm:h-64 pt-4 border-b border-gray-100 pb-2">
        {weeklyData.map((data, idx) => {
          // Calculate percentage height based on max height so it scales cleanly
          const heightPercent = `${(data.sales / maxSales) * 100}%`;
          
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
               {/* Faux Bar */}
               <div 
                 className={`w-full max-w-[3rem] rounded-t-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                   data.day === 'Sat' ? 'bg-[#FFAC00]' : 'bg-[#111111] group-hover:bg-[#333333]'
                 }`}
                 style={{ height: heightPercent }}
               />
               <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">{data.day}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
