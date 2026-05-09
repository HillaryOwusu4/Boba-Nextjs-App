'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Search, Filter, Download, ChevronDown, Check } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';

const DUMMY_ORDERS = [
  { id: '#2491', customer: 'Sophia Reynolds', date: 'Oct 24, 2023', total: '$28.50', status: 'Preparing', items: 'Midnight Matcha, Classic Boba' },
  { id: '#2490', customer: 'James Cooper', date: 'Oct 24, 2023', total: '$14.20', status: 'Ready', items: 'Brown Sugar Latte' },
  { id: '#2489', customer: 'Emma Wilson', date: 'Oct 23, 2023', total: '$42.00', status: 'Completed', items: 'Thai Tea (x2), Mango Burst' },
  { id: '#2488', customer: 'Liam Davies', date: 'Oct 23, 2023', total: '$9.50', status: 'Cancelled', items: 'Signature Milk Tea' },
  { id: '#2487', customer: 'Olivia Brown', date: 'Oct 23, 2023', total: '$31.75', status: 'Completed', items: 'Ube Monsta, Taro Fantasy' },
  { id: '#2486', customer: 'Noah Smith', date: 'Oct 22, 2023', total: '$18.00', status: 'Completed', items: 'Classic Brew, Winter Velvet' },
];

function FilterDropdown({ 
  value, 
  onChange, 
  options, 
  label 
}: { 
  value: string, 
  onChange: (v: string) => void, 
  options: string[], 
  label: string 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-4 bg-[#FAFAFA] px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#111111] border border-transparent hover:border-gray-100 transition-all min-w-[160px]"
      >
        <span className="text-gray-400 font-bold">{label}:</span>
        <span className="flex-1 text-left ml-1">{value}</span>
        <ChevronDown className={`w-3 h-3 text-[#FFAC00] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${
                value === option ? 'text-[#FFAC00] bg-[#FAFAFA]' : 'text-gray-500 hover:bg-[#FAFAFA] hover:text-[#111111]'
              }`}
            >
              {option}
              {value === option && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrdersTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All Time');

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
      <div className="p-8 border-b border-gray-50 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row gap-4 flex-1">
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
             <FilterDropdown 
                label="Status"
                value={statusFilter === 'All' ? 'All Statuses' : statusFilter}
                onChange={(val) => setStatusFilter(val === 'All Statuses' ? 'All' : val)}
                options={['All Statuses', 'Preparing', 'Ready', 'Completed', 'Cancelled']}
             />

             <FilterDropdown 
                label="Date"
                value={dateFilter}
                onChange={setDateFilter}
                options={['All Time', 'Oct 24', 'Oct 23', 'Oct 22']}
             />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-4 bg-[#FAFAFA] rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
            <Filter className="w-4 h-4 text-gray-400 group-hover:text-[#FFAC00]" />
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
            {filteredOrders.map((order) => (
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
          </tbody>
        </table>
      </div>

      {/* Pagination Faux */}
      <div className="p-8 border-t border-gray-50 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
          Showing {filteredOrders.length} of {DUMMY_ORDERS.length} orders
        </span>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[#FAFAFA] rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-white hover:shadow-sm transition-all">Prev</button>
          <button className="px-4 py-2 bg-[#111111] rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-md">1</button>
          <button className="px-4 py-2 bg-[#FAFAFA] rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-white hover:shadow-sm transition-all">2</button>
          <button className="px-4 py-2 bg-[#FAFAFA] rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-white hover:shadow-sm transition-all">Next</button>
        </div>
      </div>
    </div>
  );
}
