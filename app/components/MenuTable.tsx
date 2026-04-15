'use client';

import React, { useState } from 'react';
import { Edit, Trash2, Search, ToggleLeft, ToggleRight } from 'lucide-react';
import { MenuItem } from '@/public/data/mockdata';

interface MenuTableProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: number) => void;
  onToggleAvailability: (id: number) => void;
}

export default function MenuTable({ items, onEdit, onDelete, onToggleAvailability }: MenuTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', ...new Set(items.map(item => item.category))];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterCategory === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className={`border rounded-xl p-4 hover:shadow-md transition-all duration-200 ${!item.available ? 'opacity-60 bg-gray-50' : 'bg-white'}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{item.image}</span>
                <div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
              </div>
              <span className="text-lg font-bold text-primary-600">${item.price.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">{item.description}</p>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Sold today:</span>
                <span className="text-sm font-bold text-gray-900">{item.soldToday}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onToggleAvailability(item.id)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  title={item.available ? 'Mark Unavailable' : 'Mark Available'}
                >
                  {item.available ? (
                    <ToggleRight className="w-5 h-5 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <button onClick={() => onEdit(item)} className="p-1.5 hover:bg-yellow-50 rounded-lg transition-colors">
                  <Edit className="w-4 h-4 text-gray-400 hover:text-yellow-500" />
                </button>
                <button onClick={() => onDelete(item.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}