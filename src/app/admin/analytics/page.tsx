import AdminSidebar from '@/components/admin/AdminSidebar';
import MetricCards from '@/components/admin/analytics/MetricCards';
import SalesChart from '@/components/admin/analytics/SalesChart';
import RecentOrders from '@/components/admin/analytics/RecentOrders';

export default function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Sidebar Layout */}
      <AdminSidebar />
      
      {/* Main Content Pane */}
      <main className="flex-1 ml-64 p-8 xl:p-12 h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <header className="flex justify-between items-end mb-12">
            <div>
              <h1 className="text-4xl font-black text-[#111111] uppercase tracking-tight mb-2">Store Overview</h1>
              <p className="text-gray-500 font-bold text-sm tracking-wide">Welcome back. Here's what's happening today.</p>
            </div>
            
            <div className="flex gap-4">
               <button className="px-6 py-3 bg-white border border-gray-100 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#111111] transition-colors shadow-sm">
                 Export Report
               </button>
               <button className="px-6 py-3 bg-[#111111] text-[#FFAC00] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#FFAC00] hover:text-[#111111] transition-all shadow-md">
                 New Campaign
               </button>
            </div>
          </header>

          {/* KPI Grid */}
          <section>
            <MetricCards />
          </section>

          {/* Lower Grid: Chart & Auxiliary Data */}
          <section className="flex flex-col lg:flex-row gap-8 w-full">
            <SalesChart />
            
            {/* Quick Stats or Actions for the right column */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
              <div className="bg-[#111111] text-white rounded-[2rem] p-8 shadow-xl flex flex-col justify-between overflow-hidden relative group">
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#FFAC00] rounded-full mix-blend-screen blur-[60px] opacity-20" />
                
                <div>
                   <h3 className="text-lg font-black uppercase tracking-tight mb-1 relative z-10">Low Stock Alert</h3>
                   <p className="text-gray-400 text-xs font-medium relative z-10">Tapioca Pearls (Grade A)</p>
                </div>
                
                <div className="mt-8 relative z-10">
                   <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                     <span className="text-red-400">12% Remaining</span>
                   </div>
                   <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-red-500 w-[12%]" />
                   </div>
                   <button className="mt-6 w-full py-3 bg-white/10 hover:bg-white text-white hover:text-[#111111] rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">
                     Order More
                   </button>
                </div>
              </div>
            </div>
          </section>

          {/* Table */}
          <section className="pb-12">
            <RecentOrders />
          </section>

        </div>
      </main>
    </div>
  );
}
