'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { DRINKS } from '@/data/drinks';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import ProductForm from '@/components/admin/inventory/ProductForm';

export default function InventoryPage() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  const filteredDrinks = DRINKS.filter(d => 
    d.title.toLowerCase().includes(search.toLowerCase()) || 
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8 xl:p-12 h-screen overflow-y-auto">
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

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by name or category..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-[#FFAC00] font-bold text-sm transition-all shadow-sm"
              />
            </div>
            <button className="px-6 py-4 bg-white border border-gray-100 rounded-2xl flex items-center gap-3 text-sm font-bold text-gray-500 hover:text-[#111111] transition-colors shadow-sm">
              <Filter className="w-5 h-5" /> Filter
            </button>
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-[#FAFAFA] border-b border-gray-100">
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Price</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Cals</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {filteredDrinks.map((drink) => (
                      <tr key={drink.id} className="group hover:bg-[#FAFAFA]/50 transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                             <div className="w-14 h-14 rounded-2xl bg-[#FAFAFA] p-2 border border-gray-100 flex items-center justify-center shrink-0">
                               <img src={drink.image} alt={drink.title} className="w-full h-full object-contain" />
                             </div>
                             <div className="flex flex-col">
                               <span className="font-black text-[#111111] leading-tight mb-1">{drink.title}</span>
                               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">ID: #{drink.id}</span>
                             </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="px-4 py-1.5 rounded-full bg-[#FAFAFA] border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-500">
                            {drink.category}
                          </span>
                        </td>
                        <td className="px-8 py-5 font-black text-[#111111]">{drink.price}</td>
                        <td className="px-8 py-5">
                           <div className="flex flex-col">
                              <span className="text-sm font-bold text-gray-600">{drink.nutrition.kcal} kcal</span>
                              <div className="w-16 h-1 bg-gray-100 rounded-full mt-1">
                                <div className="h-full bg-[#FFAC00] rounded-full" style={{ width: `${(drink.nutrition.kcal / 500) * 100}%` }} />
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-5 text-right">
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
                 </tbody>
               </table>
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
