import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Search, Download, RotateCcw } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';
import AdminDropdown from '../AdminDropdown';

const DUMMY_ORDERS = [
  { id: '#2491', customer: 'Sophia Reynolds', date: 'Oct 24, 2023', total: '$28.50', status: 'Preparing', items: 'Midnight Matcha, Classic Boba' },
  { id: '#2490', customer: 'James Cooper', date: 'Oct 24, 2023', total: '$14.20', status: 'Ready', items: 'Brown Sugar Latte' },
  { id: '#2489', customer: 'Emma Wilson', date: 'Oct 23, 2023', total: '$42.00', status: 'Completed', items: 'Thai Tea (x2), Mango Burst' },
  { id: '#2488', customer: 'Liam Davies', date: 'Oct 23, 2023', total: '$9.50', status: 'Cancelled', items: 'Signature Milk Tea' },
  { id: '#2487', customer: 'Olivia Brown', date: 'Oct 23, 2023', total: '$31.75', status: 'Completed', items: 'Ube Monsta, Taro Fantasy' },
  { id: '#2486', customer: 'Noah Smith', date: 'Oct 22, 2023', total: '$18.00', status: 'Completed', items: 'Classic Brew, Winter Velvet' },
];

export default function OrdersTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filteredOrders = DUMMY_ORDERS.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    // Very simple date string matching for demonstration
    const matchesDate = dateFilter === 'All Time' || order.date.includes(dateFilter);

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Reset to page 1 when filters or page size change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter, pageSize]);

  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = filteredOrders.slice(startIndex, startIndex + pageSize);

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setDateFilter('All Time');
    setPageSize(5);
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    // CSV Header
    const headers = ['Order ID', 'Customer', 'Date', 'Total', 'Status', 'Items'];
    
    // CSV Content lines
    const rows = filteredOrders.map(order => [
      order.id,
      `"${order.customer}"`, // Wrap in quotes to handle commas in names
      order.date,
      order.total,
      order.status,
      `"${order.items}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `boba_orders_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
      {/* Table Header / Actions */}
      <div className="p-8 border-b border-gray-50 flex flex-col xl:flex-row xl:items-start justify-between gap-6">
        <div className="flex flex-col md:flex-row gap-4 flex-1 transition-all duration-300">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#FAFAFA] pl-14 pr-6 py-4 rounded-2xl text-sm font-bold border border-transparent focus:border-[#FFAC00] outline-none transition-all"
            />
          </div>

          <div className="flex gap-3">
             <AdminDropdown 
                label="Status"
                value={statusFilter}
                onChange={(val: string) => setStatusFilter(val)}
                options={[
                  { label: 'All Statuses', value: 'All' },
                  { label: 'Preparing', value: 'Preparing' },
                  { label: 'Ready', value: 'Ready' },
                  { label: 'Completed', value: 'Completed' },
                  { label: 'Cancelled', value: 'Cancelled' }
                ]}
             />

             <AdminDropdown 
                label="Date"
                value={dateFilter}
                onChange={(val: string) => setDateFilter(val)}
                options={[
                  { label: 'All Time', value: 'All Time' },
                  { label: 'Oct 24 (Today)', value: 'Oct 24' },
                  { label: 'Oct 23', value: 'Oct 23' },
                  { label: 'Oct 22', value: 'Oct 22' }
                ]}
             />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleReset}
            title="Reset Filters"
            className="p-4 bg-[#FAFAFA] rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all group flex items-center gap-3"
          >
            <RotateCcw className="w-4 h-4 text-gray-400 group-hover:text-[#FFAC00]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Reset</span>
          </button>
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-3 px-6 py-4 bg-[#FAFAFA] rounded-2xl border border-gray-100 font-black text-[10px] uppercase tracking-widest text-[#111111] hover:bg-white hover:shadow-md transition-all group"
          >
            <Download className="w-4 h-4 text-[#FFAC00]" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAFAFA]/50">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Items</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Total</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
              <th className="px-8 py-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {currentItems.map((order) => (
              <tr key={order.id} className="group hover:bg-[#FAFAFA] transition-colors">
                <td className="px-8 py-6 text-sm font-black text-[#111111]">{order.id}</td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#111111]">{order.customer}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">One-time Guest</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-xs text-gray-500 font-bold line-clamp-1 max-w-[200px]">{order.items}</span>
                </td>
                <td className="px-8 py-6 text-xs text-gray-400 font-bold">{order.date}</td>
                <td className="px-8 py-6 text-sm font-black text-[#111111]">{order.total}</td>
                <td className="px-8 py-6">
                  <OrderStatusBadge status={order.status as any} />
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-gray-300 hover:text-[#111111]">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan={7} className="px-8 py-20 text-center">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No orders found matching your criteria</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Functional */}
      <div className="p-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredOrders.length)} of {filteredOrders.length} orders
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Rows per page:</span>
            <AdminDropdown 
              variant="mini"
              direction="up"
              value={pageSize}
              onChange={(val: number) => setPageSize(val)}
              options={[
                { label: '5', value: 5 },
                { label: '10', value: 10 },
                { label: '20', value: 20 },
                { label: '30', value: 30 },
                { label: '50', value: 50 },
              ]}
              className="min-w-[80px]"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#FAFAFA] rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-white hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          
          {[...Array(totalPages)].map((_, i) => {
            // Only show a limited number of page buttons if there are many pages
            if (totalPages > 7) {
               if (i > 0 && i < totalPages - 1 && Math.abs(i + 1 - currentPage) > 1) {
                  if (i === 1 || i === totalPages - 2) return <span key={i} className="text-gray-300">...</span>;
                  return null;
               }
            }

            return (
              <button 
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  currentPage === i + 1 
                    ? 'bg-[#111111] text-white shadow-md' 
                    : 'bg-[#FAFAFA] text-gray-400 hover:bg-white hover:shadow-sm'
                }`}
              >
                {i + 1}
              </button>
            );
          })}

          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-4 py-2 bg-[#FAFAFA] rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-white hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
