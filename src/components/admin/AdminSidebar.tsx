'use client';

import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Package, Users, Settings, LogOut, Coffee, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { label: 'Analytics', href: '/admin/analytics', icon: LayoutDashboard },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Inventory', href: '/admin/inventory', icon: Package },
    { label: 'Collections', href: '/admin/collections', icon: LayoutGrid },
    { label: 'Customers', href: '/admin/customers', icon: Users },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
      
      {/* Brand Header */}
      <div className="h-24 flex items-center px-8 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#FFAC00] rounded-xl flex items-center justify-center transform transition-transform group-hover:scale-105 shadow-sm">
            <Coffee className="w-5 h-5 text-[#111111]" />
          </div>
          <span className="font-black text-xl tracking-tight text-[#111111] uppercase">Backstage</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        <span className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 block">Main Menu</span>
        
        {links.map((link) => {
          const isActive = pathname?.startsWith(link.href);
          const Icon = link.icon;
          
          return (
            <Link 
              key={link.label}
              href={link.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-sm ${
                isActive 
                  ? 'bg-[#111111] text-white shadow-md' 
                  : 'text-gray-500 hover:bg-[#FAFAFA] hover:text-[#111111]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#FFAC00]' : 'text-gray-400'}`} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer Settings */}
      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 w-full">
          <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
