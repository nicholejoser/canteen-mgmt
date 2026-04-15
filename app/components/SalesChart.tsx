'use client';

import { weeklySales } from '@/public/data/mockdata';
import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function SalesChart() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Weekly Sales Overview</h3>
          <p className="text-sm text-gray-500 mt-1">Revenue and order trends</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
            <span className="text-xs text-gray-500">Sales ($)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-canteen-orange rounded-full"></div>
            <span className="text-xs text-gray-500">Orders</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={weeklySales}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '14px',
            }}
          />
          <Area type="monotone" dataKey="sales" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
          <Area type="monotone" dataKey="orders" stroke="#f97316" fillOpacity={1} fill="url(#colorOrders)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}