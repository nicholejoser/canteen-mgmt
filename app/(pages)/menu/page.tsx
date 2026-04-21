'use client';

import React, { useState } from 'react';
import { Plus, Package, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { menuItems as initialItems, MenuItem }  from '@/public/data/mockdata';
import Header from '@/components/Header';
import MenuTable from '@/components/MenuTable';
import AddMenuModal from '@/components/AddMenuTable';

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const handleAddItem = (itemData: Omit<MenuItem, 'id' | 'soldToday'>) => {
    const newItem: MenuItem = {
      ...itemData,
      id: Math.max(...items.map(i => i.id)) + 1,
      soldToday: 0,
    };
    setItems([...items, newItem]);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleUpdateItem = (itemData: Omit<MenuItem, 'id' | 'soldToday'>) => {
    if (editingItem) {
      setItems(items.map(i =>
        i.id === editingItem.id ? { ...i, ...itemData } : i
      ));
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  const handleToggleAvailability = (id: number) => {
    setItems(items.map(i =>
      i.id === id ? { ...i, available: !i.available } : i
    ));
  };

  const totalRevenue = items.reduce((acc, item) => acc + (item.soldToday * item.price), 0);
  const availableCount = items.filter(i => i.available).length;
  const unavailableCount = items.filter(i => !i.available).length;

  return (
    <div className="min-h-screen bg-gray-50 font-lexend">
      <Header title="Menu Management" subtitle="Manage your canteen menu items and categories" />

      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{items.length}</p>
              <p className="text-sm text-gray-500">Total Items</p>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{availableCount}</p>
              <p className="text-sm text-gray-500">Available</p>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{unavailableCount}</p>
              <p className="text-sm text-gray-500">Unavailable</p>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(0)}</p>
              <p className="text-sm text-gray-500">Today&#39;s Revenue</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 cursor-pointer"
            onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          >
            <Plus className="w-4 h-4" />
            Add Menu Item
          </button>
        </div>

        {/* Menu Table */}
        <MenuTable
          items={items}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
          onToggleAvailability={handleToggleAvailability}
        />

        {/* Modal */}
        <AddMenuModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
          onSave={editingItem ? handleUpdateItem : handleAddItem}
          editItem={editingItem}
        />
      </div>
    </div>
  );
}