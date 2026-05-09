'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import OrdersTable from '@/components/admin/orders/OrdersTable';
import { ShoppingBag, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function AdminOrdersPage() {
  const stats = [
    { label: 'Total Orders', value: '1,284', icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Pending', value: '12', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Completed', value: '1,240', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Cancelled', value: '32', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-6 xl:p-8 h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          <header className="mb-12">
            <h1 className="text-4xl font-black text-[#111111] uppercase tracking-tight mb-2">Orders Management</h1>
            <p className="text-gray-500 font-bold text-sm tracking-wide">Monitor and fulfill live orders from your customers.</p>
          </header>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-shadow">
                  <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">{stat.label}</span>
                    <span className="text-2xl font-black text-[#111111] leading-none">{stat.value}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Orders Table */}
          <OrdersTable />

        </div>
      </main>
    </div>
  );
}
