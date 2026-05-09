'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { DRINKS } from '@/data/drinks';
import { Plus, Search, Edit, Trash2, RotateCcw } from 'lucide-react';
import ProductForm from '@/components/admin/inventory/ProductForm';
import AdminDropdown from '@/components/admin/AdminDropdown';

export default function InventoryPage() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const categories = ['All', ...Array.from(new Set(DRINKS.map(d => d.category)))];

  const filteredDrinks = DRINKS.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase()) || 
                         d.id.toString().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredDrinks.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = filteredDrinks.slice(startIndex, startIndex + pageSize);

  // Reset to page 1 on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, pageSize]);

  const handleReset = () => {
    setSearch('');
    setCategoryFilter('All');
    setPageSize(5);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-6 xl:p-8 h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black text-[#111111] uppercase tracking-tight mb-2">Inventory</h1>
              <p className="text-gray-500 font-bold text-sm tracking-wide">Manage your product catalog and drink specifications.</p>
            </div>
            
            <button 
              onClick={() => setShowForm(true)}
              className="px-8 py-4 bg-[#111111] text-[#FFAC00] rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#FFAC00] hover:text-[#111111] transition-all shadow-xl flex items-center gap-3 active:scale-95"
            >
              <Plus className="w-5 h-5" /> Add New Drink
            </button>
          </header>

          {/* Premium Controls Bar */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="p-8 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input 
                    type="text" 
                    placeholder="Search by name or ID..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-[#FAFAFA] pl-14 pr-6 py-4 rounded-2xl text-sm font-bold border border-transparent focus:border-[#FFAC00] outline-none transition-all"
                  />
                </div>

                <AdminDropdown 
                  label="Category"
                  value={categoryFilter}
                  onChange={setCategoryFilter}
                  options={categories.map(c => ({ label: c === 'All' ? 'All Categories' : c, value: c }))}
                  className="min-w-[180px]"
                />
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
              </div>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAFAFA] border-y border-gray-50">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Price</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Cals</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {currentItems.map((drink) => (
                    <tr key={drink.id} className="group hover:bg-[#FAFAFA]/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-14 h-14 rounded-2xl bg-[#FAFAFA] p-2 border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                             <img src={drink.image} alt={drink.title} className="w-full h-full object-contain" />
                           </div>
                           <div className="flex flex-col">
                             <span className="font-black text-[#111111] leading-tight mb-1">{drink.title}</span>
                             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">ID: #{drink.id}</span>
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-4 py-1.5 rounded-full bg-[#FAFAFA] border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-500">
                          {drink.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-black text-[#111111]">{drink.price}</td>
                      <td className="px-8 py-6">
                         <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-600">{drink.nutrition.kcal} kcal</span>
                            <div className="w-16 h-1 bg-gray-100 rounded-full mt-1">
                              <div className="h-full bg-[#FFAC00] rounded-full" style={{ width: `${Math.min((drink.nutrition.kcal / 500) * 100, 100)}%` }} />
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex justify-end gap-2">
                           <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#FFAC00] hover:border-[#FFAC00] transition-all shadow-sm">
                             <Edit className="w-4 h-4" />
                           </button>
                           <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm">
                             <Trash2 className="w-4 h-4" />
                           </button>
                         </div>
                      </td>
                    </tr>
                  ))}
                  {currentItems.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No products found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Functional Pagination Footer */}
            <div className="p-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                  Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredDrinks.length)} of {filteredDrinks.length} products
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Rows:</span>
                  <AdminDropdown 
                    variant="mini"
                    direction="up"
                    value={pageSize}
                    onChange={setPageSize}
                    options={[
                      { label: '5', value: 5 },
                      { label: '10', value: 10 },
                      { label: '20', value: 20 },
                    ]}
                    className="min-w-[70px]"
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
                
                {[...Array(totalPages)].map((_, i) => (
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
                ))}

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

        </div>
      </main>

      {/* Product Form Overlay */}
      {showForm && (
        <div className="fixed inset-0 z-[100] bg-[#111111]/80 backdrop-blur-md flex items-center justify-center p-4">
           <ProductForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
}
