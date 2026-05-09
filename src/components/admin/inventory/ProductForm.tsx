import { useState, useRef } from 'react';
import { Plus, X, Camera } from 'lucide-react';
import AdminDropdown from '../AdminDropdown';

export default function ProductForm({ onClose }: { onClose: () => void }) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState([{ name: 'Tapioca Pearls', icon: '⚫' }]);
  const [category, setCategory] = useState('Matcha');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Predefined ingredient list for the dropdown
  const COMMON_INGREDIENTS = [
    { name: 'Tapioca Pearls', icon: '⚫' },
    { name: 'Brown Sugar', icon: '🍯' },
    { name: 'Matcha', icon: '🍃' },
    { name: 'Oat Milk', icon: '🥛' },
    { name: 'Milk Tea', icon: '🍵' },
    { name: 'Mango', icon: '🥭' },
    { name: 'Strawberry', icon: '🍓' },
    { name: 'Ube', icon: '🍠' },
    { name: 'Coconut Milk', icon: '🥥' },
    { name: 'Thai Tea', icon: '🫖' },
    { name: 'Condensed Milk', icon: '🥛' },
    { name: 'Ice', icon: '🧊' },
    { name: 'Caramel', icon: '🍮' },
    { name: 'Biscoff', icon: '🍪' },
    { name: 'Honey', icon: '🍯' },
    { name: 'Passion Fruit', icon: '🌸' },
  ];

  const categories = [
    { label: 'Matcha', value: 'Matcha' },
    { label: 'Milk Tea', value: 'Milk Tea' },
    { label: 'Fruit Tea', value: 'Fruit Tea' },
    { label: 'Signature', value: 'Signature' },
    { label: 'Pastries', value: 'Pastries' },
  ];

  const ingredientOptions = COMMON_INGREDIENTS.map(i => ({ label: i.name, value: i.name }));

  const addIngredient = () => setIngredients([...ingredients, { name: COMMON_INGREDIENTS[0].name, icon: COMMON_INGREDIENTS[0].icon }]);
  const removeIngredient = (index: number) => setIngredients(ingredients.filter((_, i) => i !== index));
  
  const handleIngredientSelect = (index: number, selectionValue: string) => {
    const selected = COMMON_INGREDIENTS.find(i => i.name === selectionValue);
    if (selected) {
      const next = [...ingredients];
      next[index] = { ...selected };
      setIngredients(next);
    }
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
    <div className="bg-white rounded-[3rem] p-10 sm:p-14 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
      <button onClick={onClose} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-[#FAFAFA] flex items-center justify-center border border-gray-100 hover:bg-red-50 hover:text-red-500 transition-colors">
        <X className="w-5 h-5" />
      </button>

      <div className="mb-12">
        <h2 className="text-3xl font-black text-[#111111] uppercase tracking-tight mb-2">Create New Product</h2>
        <p className="text-gray-500 font-bold text-sm tracking-wide">Enter the details for the new signature drink.</p>
      </div>

      <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
        
        {/* Basic Info Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Product Title <span className="text-red-500">*</span></label>
              <input type="text" required placeholder="e.g. Midnight Matcha" className="w-full bg-[#FAFAFA] px-6 py-4 rounded-2xl border border-transparent focus:border-[#FFAC00] outline-none font-bold transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Base Price <span className="text-red-500">*</span></label>
              <input type="text" required placeholder="$0.00" className="w-full bg-[#FAFAFA] px-6 py-4 rounded-2xl border border-transparent focus:border-[#FFAC00] outline-none font-bold transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category <span className="text-red-500">*</span></label>
              <AdminDropdown 
                value={category}
                onChange={setCategory}
                options={categories}
              />
            </div>
          </div>

          {/* ... existing image upload area ... */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`w-full aspect-square rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center group cursor-pointer transition-all relative overflow-hidden ${
              imagePreview ? 'border-transparent bg-gray-50' : 'border-gray-100 bg-[#FAFAFA] hover:border-[#FFAC00]'
            }`}
          >
             <input 
               type="file" 
               ref={fileInputRef} 
               onChange={handleImageChange} 
               className="hidden" 
               accept="image/*" 
             />

             {imagePreview ? (
               <div className="relative w-full h-full p-4">
                 <img src={imagePreview} alt="Preview" className="w-full h-full object-contain drop-shadow-2xl" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-black uppercase tracking-widest">Change Image</span>
                 </div>
               </div>
             ) : (
               <>
                 <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                   <Camera className="w-8 h-8 text-[#FFAC00]" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Upload Product Image <span className="text-red-500">*</span></span>
                 <span className="text-[9px] text-gray-300 mt-1">PNG with transparent background</span>
               </>
             )}
          </div>
        </div>

        {/* ... existing description section ... */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 uppercase tracking-widest">Story & Ingredients</label>
          <textarea placeholder="Tell the story of this drink..." rows={4} className="w-full bg-[#FAFAFA] px-6 py-6 rounded-[2rem] border border-transparent focus:border-[#FFAC00] outline-none font-bold transition-all resize-none" />
        </div>

        {/* Dynamic Ingredients Section */}
        <div className="space-y-6">
           <div className="flex justify-between items-center">
             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ingredient Mix</label>
             <button onClick={addIngredient} type="button" className="text-[10px] font-black text-[#FFAC00] uppercase tracking-widest flex items-center gap-1 hover:text-[#111111] transition-colors">
               <Plus className="w-3 h-3" /> Add Item
             </button>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {ingredients.map((ing, idx) => (
               <div key={idx} className="flex gap-3 bg-[#FAFAFA] p-3 rounded-2xl items-center border border-transparent hover:border-gray-100">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">
                    {ing.icon}
                  </div>
                  <AdminDropdown 
                    variant="mini"
                    className="flex-1"
                    value={ing.name}
                    onChange={(val) => handleIngredientSelect(idx, val)}
                    options={ingredientOptions}
                  />
                  <button onClick={() => removeIngredient(idx)} className="text-gray-300 hover:text-red-500 transition-colors px-2">
                    <X className="w-4 h-4" />
                  </button>
               </div>
             ))}
           </div>
        </div>

        {/* Nutrition Section */}
        <div className="space-y-6 pt-4">
           <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nutritionals (Per Cup)</label>
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
             {['kcal', 'fat', 'carbs', 'protein'].map((field) => (
               <div key={field} className="flex flex-col gap-2">
                 <span className="text-[9px] font-bold uppercase tracking-widest text-gray-300 ml-4">{field}</span>
                 <input type="number" placeholder="0" className="w-full bg-[#FAFAFA] px-6 py-4 rounded-2xl border border-transparent focus:border-[#FFAC00] outline-none font-bold text-center transition-all" />
               </div>
             ))}
           </div>
        </div>

        {/* Colors Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
           <div className="flex flex-col gap-4">
             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Theme Colors <span className="text-red-500">*</span></label>
             <div className="flex gap-4">
                <div className="flex flex-col gap-2 items-center">
                  <div className="w-10 h-10 rounded-full bg-[#f3e3c8] shadow-inner border border-gray-100 cursor-pointer" />
                  <span className="text-[8px] font-bold text-gray-400 uppercase">Top</span>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <div className="w-10 h-10 rounded-full bg-[#a86a3d] shadow-inner border border-gray-100 cursor-pointer" />
                  <span className="text-[8px] font-bold text-gray-400 uppercase">Button</span>
                </div>
             </div>
           </div>
           
           <div className="flex items-end justify-end">
              <button className="w-full md:w-auto bg-[#111111] text-white px-12 py-5 rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#FFAC00] hover:text-[#111111] transition-all duration-300 shadow-xl hover:shadow-[0_20px_40px_rgba(255,172,0,0.3)]">
                Create & Publish
              </button>
           </div>
        </div>

      </form>
    </div>
  );
}
