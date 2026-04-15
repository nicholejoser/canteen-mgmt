'use client';

import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { menuItems } from '@/public/data/mockdata';

export default function PopularItems() {
  const sortedItems = [...menuItems].sort((a, b) => b.soldToday - a.soldToday).slice(0, 5);
  const maxSold = sortedItems[0]?.soldToday || 1;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Popular Items Today</h3>
        <Link href="/menu" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 font-medium">
          View Menu <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-5">
        {sortedItems.map((item, index) => (
          <div key={item.id} className="flex items-center gap-4">
            <span className="text-2xl w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl">
              {item.image}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-sm font-bold text-gray-900">{item.soldToday}</span>
                  <span className="text-xs text-gray-400">sold</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === 0 ? 'bg-primary-500' :
                    index === 1 ? 'bg-canteen-orange' :
                    index === 2 ? 'bg-canteen-green' :
                    index === 3 ? 'bg-canteen-purple' :
                    'bg-canteen-yellow'
                  }`}
                  style={{ width: `${(item.soldToday / maxSold) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
