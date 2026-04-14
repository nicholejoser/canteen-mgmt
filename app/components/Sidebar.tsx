'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UtensilsCrossed,
  ShoppingCart,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Coffee,
  LogOut,
  Bell,
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Users', icon: Users, href: '/users' },
  { name: 'Menu Items', icon: UtensilsCrossed, href: '/menu' },
  { name: 'Orders', icon: ShoppingCart, href: '/orders' },
  { name: 'Reports', icon: BarChart3, href: '/reports' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-72'
      } bg-gray-900 min-h-screen flex flex-col transition-all duration-300 ease-in-out relative`}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-700">
        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Coffee className="w-6 h-6 text-white" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">Canteen</h1>
            <p className="text-gray-400 text-xs">Monitoring System</p>
          </div>
        )}
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors z-10 shadow-lg"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className={`text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4 ${collapsed ? 'text-center' : 'px-4'}`}>
          {collapsed ? '•••' : 'Main Menu'}
        </p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-4 py-4 border-t border-gray-700 space-y-1">
        <Link href="#" className={`sidebar-link ${collapsed ? 'justify-center px-2' : ''}`}>
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Settings</span>}
        </Link>
        <button className={`sidebar-link w-full text-red-400 hover:text-red-300 hover:bg-red-900/20 ${collapsed ? 'justify-center px-2' : ''}`}>
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>

      {/* User Profile */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              JS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">John Smith</p>
              <p className="text-gray-400 text-xs truncate">Administrator</p>
            </div>
            <Bell className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      )}
    </aside>
  );
}