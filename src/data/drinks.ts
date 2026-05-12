export interface Ingredient {
  name: string;
  icon: string;
}

export interface Nutrition {
  kcal: number;
  fat: number;
  carbs: number;
  protein: number;
}
export const allProducts = [
  { id: 1, title: 'Classic Brew', price: '$8.00', image: '/multible_boab.png', color: '#F4F1EA' },
  { id: 2, title: 'Daddy Signature', price: '$7.50', image: '/multible_boab.png', color: '#1A1A1A' },
  { id: 3, title: 'Vintage Burst', price: '$8.50', image: '/multible_boab.png', color: '#E64833' },
  { id: 5, title: 'Summer Pop', price: '$7.00', image: '/multible_boab.png', color: '#FFAC00' },
  { id: 6, title: 'Winter Velvet', price: '$9.00', image: '/multible_boab.png', color: '#4B2C20' },
];
export const ITEMS = [
  { 
    id: 1, 
    title: 'Experience', 
    subtitle: 'Pure Vision',
    description: 'Immerse yourself in curated cinematic masterpieces delivered in breathtaking high definition.',
    image: '/boba_cinematic_1_1777230647935.png',
    videoUrl: '/videos/kling_20260411_作品_The_drink__5125_0(1).mp4'
  },
  { 
    id: 2, 
    title: 'Matcha', 
    subtitle: 'Magic',
    description: 'Discover the vibrant essence of premium ceremonial grade matcha blended to perfection.',
    image: '/boba_cinematic_2_1777230830032.png',
    videoUrl: '/videos/kling_20260427_作品_Ultra_real_3097_0.mp4'
  },
  { 
    id: 3, 
    title: 'Taro', 
    subtitle: 'Fantasy',
    description: 'Indulge in the velvety smooth texture of our signature taro infusion.',
    image: '/boba_cinematic_3_1777231030431.png',
    videoUrl: '/videos/20260427_045908_UTC_0.mp4'
  },
  
];
export const DRINKS = [
  {
    id: 101,
    title: 'Brown Sugar',
    price: '$6.50',
    image: '/bobadrinks/1 (2).png',
    description: 'Slow-cooked brown sugar with silky milk tea and tapioca pearls.',
    category: 'Milk Tea',
    topColor: '#f3e3c8',
    buttonColor: '#a86a3d',
    ingredients: [
      { name: 'Brown Sugar', icon: '🍯' },
      { name: 'Milk Tea', icon: '🍵' },
      { name: 'Tapioca', icon: '⚫' },
      { name: 'Ice', icon: '🧊' },
    ],
    nutrition: { kcal: 320, fat: 5.2, carbs: 62, protein: 4.1 },
  },
  {
    id: 102,
    title: 'Matcha Latte',
    price: '$6.75',
    image: '/bobadrinks/1 (3).png',
    description: 'Ceremonial-grade matcha layered over oat milk, topped with foam.',
    category: 'Latte',
    topColor: '#d4e8c2',
    buttonColor: '#4a7c3f',
    ingredients: [
      { name: 'Matcha', icon: '🍃' },
      { name: 'Oat Milk', icon: '🥛' },
      { name: 'Foam', icon: '☁️' },
      { name: 'Tapioca', icon: '⚫' },
    ],
    nutrition: { kcal: 240, fat: 4.8, carbs: 38, protein: 5.2 },
  },
  {
    id: 106,
    title: 'Thai Tea',
    price: '$6.25',
    image: '/bobadrinks/1 (2).png',
    description: 'Spiced amber tea with sweetened condensed milk and boba.',
    category: 'Classic Tea',
    topColor: '#fbe9d3',
    buttonColor: '#c4621a',
    ingredients: [
      { name: 'Thai Tea', icon: '🫖' },
      { name: 'Condensed Milk', icon: '🥛' },
      { name: 'Boba', icon: '⚫' },
      { name: 'Spices', icon: '✨' },
    ],
    nutrition: { kcal: 290, fat: 6.4, carbs: 48, protein: 3.6 },
  },
  {
    id: 107,
    title: 'Mango',
    price: '$6.75',
    image: 'https://i.postimg.cc/3wWyTw8Q/Gemini-Generated-Image-zevekezevekezeve-removebg-preview.png',
    description: 'Alphonso mango blended with coconut milk and passion fruit pearls.',
    category: 'Fruit Tea',
    topColor: '#fef3c7',
    buttonColor: '#d97706',
    ingredients: [
      { name: 'Mango', icon: '🥭' },
      { name: 'Coconut Milk', icon: '🥥' },
      { name: 'Passion Fruit', icon: '🌸' },
      { name: 'Pearls', icon: '⚪' },
    ],
    nutrition: { kcal: 260, fat: 3.8, carbs: 54, protein: 2.4 },
  },
  {
    id: 108,
    title: 'Charcoal',
    price: '$7.25',
    image: 'https://i.postimg.cc/520Tqc4K/Gemini-Generated-Image-ek9hmcek9hmcek9h-removebg-preview.png',
    description: 'Activated charcoal black sesame latte with vanilla cream top.',
    category: 'Signature',
    topColor: '#e5e7eb',
    buttonColor: '#374151',
    ingredients: [
      { name: 'Charcoal', icon: '🖤' },
      { name: 'Black Sesame', icon: '🌿' },
      { name: 'Vanilla Cream', icon: '🍦' },
      { name: 'Boba', icon: '⚫' },
    ],
    nutrition: { kcal: 350, fat: 8.2, carbs: 44, protein: 6.8 },
  },
  {
    id: 108,
    title: 'Charcoal',
    price: '$7.25',
    image: 'https://i.postimg.cc/520Tqc4K/Gemini-Generated-Image-ek9hmcek9hmcek9h-removebg-preview.png',
    description: 'Activated charcoal black sesame latte with vanilla cream top.',
    category: 'Signature',
    topColor: '#e5e7eb',
    buttonColor: '#374151',
    ingredients: [
      { name: 'Charcoal', icon: '🖤' }, { name: 'Black Sesame', icon: '🌿' }, { name: 'Vanilla Cream', icon: '🍦' }, { name: 'Boba', icon: '⚫' },
    ],
    nutrition: { kcal: 350, fat: 8.2, carbs: 44, protein: 6.8 },
  },
  // ── THE NEWBIES ──
  {
    id: 201, title: 'Cherry on top', price: '$7.50', image: '/bobadrinks/1 (2).png', category: 'New Arrivals',
    description: 'Refreshing cherry-infused drink with a sweet surprise on top.', topColor: '#fee2e2', buttonColor: '#ef4444',
    ingredients: [{ name: 'Cherry', icon: '🍒' }, { name: 'Syrup', icon: '🍯' }], nutrition: { kcal: 210, fat: 0, carbs: 52, protein: 0.5 }
  },
  {
    id: 202, title: 'Brazilian Bomb', price: '$7.25', image: '/bobadrinks/1 (3).png', category: 'New Arrivals',
    description: 'Tangy Brazilian lemonade with an explosive burst of flavor.', topColor: '#fef9c3', buttonColor: '#eab308',
    ingredients: [{ name: 'Lemon', icon: '🍋' }, { name: 'Lime', icon: '🟢' }], nutrition: { kcal: 180, fat: 0, carbs: 45, protein: 0.2 }
  },
  {
    id: 203, title: 'Milk with Benefits', price: '$7.75', image: '/bobadrinks/1 (2).png', category: 'New Arrivals',
    description: 'Nutritious and delicious milk blend with added health benefits.', topColor: '#f0fdf4', buttonColor: '#16a34a',
    ingredients: [{ name: 'Milk', icon: '🥛' }, { name: 'Honey', icon: '🍯' }], nutrition: { kcal: 240, fat: 4.0, carbs: 38, protein: 7.0 }
  },
  {
    id: 204, title: 'Brazilian Boozy', price: '$8.50', image: '/bobadrinks/1 (2).png', category: 'New Arrivals',
    description: 'A cocktail-inspired Brazilian lemonade for those who like a kick.', topColor: '#fef3c7', buttonColor: '#d97706',
    ingredients: [{ name: 'Lemon', icon: '🍋' }, { name: 'Zest', icon: '✨' }], nutrition: { kcal: 210, fat: 0, carbs: 48, protein: 0.2 }
  },
  // ── MATCHA SERIES ──
  {
    id: 301, title: 'Classic Matcha', price: '$6.50', image: '/bobadrinks/1 (2).png', category: 'Matcha',
    description: 'Pure ceremonial matcha whisked to creamy perfection.', topColor: '#dcfce7', buttonColor: '#22c55e',
    ingredients: [{ name: 'Matcha', icon: '🍃' }], nutrition: { kcal: 190, fat: 4.5, carbs: 22, protein: 3.5 }
  },
  {
    id: 302, title: 'Mango Matcha', price: '$7.00', image: '/bobadrinks/1 (3).png', category: 'Matcha',
    description: 'Earthy matcha combined with sweet, sun-ripened mango.', topColor: '#fef3c7', buttonColor: '#f59e0b',
    ingredients: [{ name: 'Matcha', icon: '🍃' }, { name: 'Mango', icon: '🥭' }], nutrition: { kcal: 230, fat: 3.2, carbs: 48, protein: 2.8 }
  },
  {
    id: 303, title: 'Strawberry Matcha', price: '$7.00', image: '/bobadrinks/1 (2).png', category: 'Matcha',
    description: 'A beautiful layer of strawberry puree and premium matcha.', topColor: '#fee2e2', buttonColor: '#dc2626',
    ingredients: [{ name: 'Matcha', icon: '🍃' }, { name: 'Strawberry', icon: '🍓' }], nutrition: { kcal: 220, fat: 3.5, carbs: 44, protein: 3.0 }
  },
  {
    id: 304, title: 'Blueberry Matcha', price: '$7.00', image: '/bobadrinks/1 (2).png', category: 'Matcha',
    description: 'Rich matcha paired with the antioxidant power of blueberries.', topColor: '#e0e7ff', buttonColor: '#4338ca',
    ingredients: [{ name: 'Matcha', icon: '🍃' }, { name: 'Blueberry', icon: '🫐' }], nutrition: { kcal: 225, fat: 3.4, carbs: 45, protein: 3.1 }
  },
  // ── MILK SERIES ──
  {
    id: 401, title: 'Banana Milk', price: '$6.00', image: '/bobadrinks/1 (2).png', category: 'Milk Series',
    description: 'Classic creamy milk with real banana infusion.', topColor: '#fef9c3', buttonColor: '#fbbf24',
    ingredients: [{ name: 'Banana', icon: '🍌' }], nutrition: { kcal: 200, fat: 5.0, carbs: 32, protein: 6.0 }
  },
  {
    id: 402, title: 'Strawberry Milk', price: '$6.00', image: '/bobadrinks/1 (2).png', category: 'Milk Series',
    description: 'Sweet pink milk made with fresh strawberry nectar.', topColor: '#fee2e2', buttonColor: '#db2777',
    ingredients: [{ name: 'Strawberry', icon: '🍓' }], nutrition: { kcal: 210, fat: 4.8, carbs: 36, protein: 5.8 }
  },
  {
    id: 403, title: 'Dirty Milk Tea', price: '$6.50', image: '/bobadrinks/1 (3).png', category: 'Milk Series',
    description: 'The ultimate indulgent milk tea with extra syrup "dirt".', topColor: '#f3e3c8', buttonColor: '#78350f',
    ingredients: [{ name: 'Tea', icon: '🍵' }, { name: 'Syrup', icon: '🍯' }, { name: 'Cinnamon', icon: '🍂' }], nutrition: { kcal: 340, fat: 7.0, carbs: 64, protein: 4.5 }
  },
  // ── UNIQUE SERIES ──
  {
    id: 501, title: 'Ube Milk', price: '$7.25', image: '/bobadrinks/1 (2).png', category: 'Signature',
    description: 'Vibrant purple yam milk with a creamy, nutty finish.', topColor: '#f3e8ff', buttonColor: '#9333ea',
    ingredients: [{ name: 'Ube', icon: '🍠' }], nutrition: { kcal: 280, fat: 6.5, carbs: 42, protein: 4.0 }
  },
  {
    id: 502, title: 'Caramel Lotus', price: '$7.50', image: '/bobadrinks/1 (2).png', category: 'Signature',
    description: 'Luxurious caramel frappe with Lotus Biscoff crumbles.', topColor: '#ffedd5', buttonColor: '#ea580c',
    ingredients: [{ name: 'Caramel', icon: '🍮' }, { name: 'Biscoff', icon: '🍪' }, { name: 'Cinnamon', icon: '🍂' }], nutrition: { kcal: 450, fat: 18, carbs: 68, protein: 5.5 }
  },
  {
    id: 503, title: 'Ube Monsta', price: '$8.00', image: '/bobadrinks/1 (3).png', category: 'Signature',
    description: 'An extra-large Ube signature drink with all the toppings.', topColor: '#f5f3ff', buttonColor: '#7c3aed',
    ingredients: [{ name: 'Ube', icon: '🍠' }, { name: 'Boba', icon: '⚫' }], nutrition: { kcal: 380, fat: 9.0, carbs: 58, protein: 6.5 }
  },
  // ── FRUIT TEAS ──
  {
    id: 601, title: 'Summer Solstice', price: '$6.75', image: '/bobadrinks/1 (2).png', category: 'Fruit Tea',
    description: 'Refreshing citrus fruit tea for the perfect summer day.', topColor: '#fff7ed', buttonColor: '#f97316',
    ingredients: [{ name: 'Citrus', icon: '🍊' }], nutrition: { kcal: 150, fat: 0, carbs: 38, protein: 0.5 }
  },
  {
    id: 602, title: 'Multifrutta', price: '$7.00', image: '/bobadrinks/1 (2).png', category: 'Fruit Tea',
    description: 'A medley of tropical fruits in our premium green tea base.', topColor: '#f0fdf4', buttonColor: '#16a34a',
    ingredients: [{ name: 'Mixed Fruit', icon: '🍓' }], nutrition: { kcal: 170, fat: 0, carbs: 42, protein: 0.6 }
  },
  // ── PASTRIES ──
  {
    id: 701, title: 'Cinnamon Rolls', price: '$4.50', image: '/bobadrinks/1 (2).png', category: 'Pastries',
    description: 'Soft, buttery rolls with premium cinnamon and glaze.', topColor: '#fff7ed', buttonColor: '#92400e',
    ingredients: [{ name: 'Cinnamon', icon: '🍂' }], nutrition: { kcal: 420, fat: 18, carbs: 58, protein: 5.0 }
  },
  {
    id: 702, title: 'Meat Pie', price: '$3.50', image: '/bobadrinks/1 (2).png', category: 'Pastries',
    description: 'Flaky, savory pastry filled with seasoned minced meat.', topColor: '#fef2f2', buttonColor: '#b91c1c',
    ingredients: [{ name: 'Meat', icon: '🥩' }], nutrition: { kcal: 320, fat: 22, carbs: 28, protein: 12 }
  },
  {
    id: 703, title: 'Madeleines', price: '$3.00', image: '/bobadrinks/1 (3).png', category: 'Pastries',
    description: 'Light and airy shell-shaped sponge cakes with lemon zest.', topColor: '#fefce8', buttonColor: '#ca8a04',
    ingredients: [{ name: 'Lemon', icon: '🍋' }], nutrition: { kcal: 150, fat: 8, carbs: 18, protein: 2.5 }
  },
];

export type Drink = (typeof DRINKS)[number];
