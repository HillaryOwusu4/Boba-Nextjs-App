'use client';

import { useState, useRef } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { DRINKS } from '@/data/drinks';
import { Plus, X, LayoutGrid, Image as ImageIcon, Camera } from 'lucide-react';

export default function CollectionsManagementPage() {
  // Extract unique categories from DRINKS data
  const categories = Array.from(new Set(DRINKS.map(d => d.category)));
  
  const [showAdd, setShowAdd] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleProduct = (id: number) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8 xl:p-12 h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black text-[#111111] uppercase tracking-tight mb-2">Collections</h1>
              <p className="text-gray-500 font-bold text-sm tracking-wide">Organize your drinks into menu sections and seasonal series.</p>
            </div>
            
            <button 
              onClick={() => { setShowAdd(true); setSelectedProducts([]); setImagePreview(null); }}
              className="px-8 py-4 bg-[#FFAC00] text-[#111111] rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all shadow-xl flex items-center gap-3 active:scale-95"
            >
              <Plus className="w-5 h-5" /> Create Collection
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => {
              const productCount = DRINKS.filter(d => d.category === cat).length;
              
              return (
                <div key={cat} className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  {/* Faux Background pattern */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#FFAC00] opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="w-16 h-16 rounded-3xl bg-[#FAFAFA] flex items-center justify-center border border-gray-100 mb-8 group-hover:bg-[#111111] transition-colors">
                    <LayoutGrid className="w-7 h-7 text-[#FFAC00]" />
                  </div>

                  <h3 className="text-2xl font-black text-[#111111] uppercase tracking-tight mb-2">{cat}</h3>
                  <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-8">{productCount} Active Drinks</p>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                     <span className="text-xs font-bold text-[#FFAC00] tracking-widest uppercase cursor-pointer hover:text-[#111111]">Manage Items</span>
                     <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors">
                        <X className="w-4 h-4" />
                     </div>
                  </div>
                </div>
              );
            })}

            {/* Empty State / Add New Placeholder */}
            <div 
              onClick={() => { setShowAdd(true); setSelectedProducts([]); setImagePreview(null); }}
              className="rounded-[3rem] border-4 border-dashed border-gray-100 p-10 flex flex-col items-center justify-center text-center cursor-pointer group hover:border-[#FFAC00] transition-colors bg-white/20"
            >
               <div className="w-16 h-16 rounded-full border-2 border-gray-100 flex items-center justify-center mb-4 group-hover:border-[#FFAC00] transition-all">
                  <Plus className="w-6 h-6 text-gray-300 group-hover:text-[#FFAC00]" />
               </div>
               <span className="font-black text-gray-300 uppercase tracking-widest text-xs group-hover:text-[#111111]">Add New Bucket</span>
            </div>
          </div>

        </div>
      </main>

      {/* Create Collection Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-[100] bg-[#111111]/80 backdrop-blur-md flex items-center justify-center p-4">
           <div className="bg-white rounded-[3rem] p-10 sm:p-14 w-full max-w-xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button onClick={() => { setShowAdd(false); setImagePreview(null); }} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-[#FAFAFA] flex items-center justify-center border border-gray-100 hover:bg-red-50 hover:text-red-500 transition-colors">
                <X className="w-5 h-5" />
              </button>

              <div className="mb-10">
                <h2 className="text-3xl font-black text-[#111111] uppercase tracking-tight mb-2">New Collection</h2>
                <p className="text-gray-500 font-bold text-sm tracking-wide">Define a new category and select products.</p>
              </div>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Collection Title <span className="text-red-500">*</span></label>
                  <input type="text" required placeholder="e.g. Seasonal Specials" className="w-full bg-[#FAFAFA] px-8 py-6 rounded-3xl border border-transparent focus:border-[#FFAC00] outline-none font-bold transition-all shadow-inner" />
                </div>

                {/* Multi-product selection */}
                <div className="flex flex-col gap-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Assign Products</label>
                   <div className="relative">
                      <select 
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (val && !selectedProducts.includes(val)) toggleProduct(val);
                        }}
                        className="w-full bg-[#FAFAFA] px-8 py-6 rounded-3xl border border-transparent focus:border-[#FFAC00] outline-none font-bold transition-all appearance-none"
                      >
                        <option value="">Select products to add...</option>
                        {DRINKS.map(drink => (
                          <option key={drink.id} value={drink.id}>{drink.title}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 text-[#FFAC00]">
                        <Plus className="w-5 h-5" />
                      </div>
                   </div>

                   {/* Selection Preview Chips */}
                   <div className="flex flex-wrap gap-2 px-2">
                     {selectedProducts.map(id => {
                       const drink = DRINKS.find(d => d.id === id);
                       return (
                         <div key={id} className="flex items-center gap-2 bg-[#FAFAFA] border border-gray-100 px-4 py-2 rounded-xl group hover:border-[#FFAC00] transition-colors">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#111111]">{drink?.title}</span>
                            <button onClick={() => toggleProduct(id)} className="text-gray-300 hover:text-red-500 transition-colors">
                               <X className="w-3 h-3" />
                            </button>
                         </div>
                       );
                     })}
                     {selectedProducts.length === 0 && (
                       <span className="text-[10px] italic text-gray-300 ml-2">No products assigned yet</span>
                     )}
                   </div>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Cover Image (Optional)</label>
                   <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageChange} 
                      className="hidden" 
                      accept="image/*" 
                   />
                   <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full overflow-hidden h-32 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer group ${
                         imagePreview ? 'border-transparent bg-gray-50' : 'border-gray-100 bg-[#FAFAFA] hover:border-[#FFAC00] text-gray-400'
                      }`}
                   >
                      {imagePreview ? (
                         <div className="relative w-full h-full p-2">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                               <span className="text-white text-[10px] font-black uppercase tracking-widest">Change</span>
                            </div>
                         </div>
                      ) : (
                         <>
                            <ImageIcon className="w-6 h-6" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Select Image</span>
                         </>
                      )}
                   </div>
                </div>

                <button className="w-full bg-[#111111] text-[#FFAC00] py-6 rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#FFAC00] hover:text-[#111111] transition-all shadow-xl">
                  Save Collection
                </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
