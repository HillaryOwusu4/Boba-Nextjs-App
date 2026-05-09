'use client';

import { TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function MetricCards() {
  const metrics = [
    {
      id: 1,
      title: "Total Revenue",
      value: "$124,563",
      trend: "+14.5%",
      isPositive: true,
      icon: DollarSign,
      color: "bg-[#FFAC00]"
    },
    {
      id: 2,
      title: "Active Orders",
      value: "1,245",
      trend: "+8.2%",
      isPositive: true,
      icon: TrendingUp,
      color: "bg-[#111111]"
    },
    {
      id: 3,
      title: "New Customers",
      value: "892",
      trend: "-2.1%",
      isPositive: false,
      icon: Users,
      color: "bg-blue-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        
        return (
          <div key={metric.id} className="bg-white rounded-[2rem] p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col gap-6 relative overflow-hidden group hover:shadow-md transition-shadow">
             {/* Decorative Background Blob */}
             <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full ${metric.color} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity`} />
             
             <div className="flex justify-between items-center z-10">
               <div className="w-12 h-12 rounded-full bg-[#FAFAFA] flex items-center justify-center border border-gray-100">
                 <Icon className="w-5 h-5 text-[#111111]" />
               </div>
               
               <div className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full ${metric.isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                 {metric.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                 {metric.trend}
               </div>
             </div>

             <div className="z-10">
               <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs mb-1">{metric.title}</p>
               <h3 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight">{metric.value}</h3>
             </div>
          </div>
        );
      })}
    </div>
  );
}
