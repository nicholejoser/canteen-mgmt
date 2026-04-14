'use client';

import React from 'react';
import { orders } from '@/data/mockData';
import { Clock, CheckCircle2, XCircle, ChefHat, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  preparing: { label: 'Preparing', color: 'bg-blue-100 text-blue-700', icon: ChefHat },
  ready: { label: 'Ready', color: 'bg-purple-100 text-purple-700', icon: Package },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: XCircle },
};

export default function RecentOrders() {
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
        <Link href="/orders" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 font-medium">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {recentOrders.map((order) => {
          const status = statusConfig[order.status];
          const StatusIcon = status.icon;
          return (
            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-sm">
                    {order.customerName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{order.id}</p>
                  <p className="text-gray-500 text-xs">{order.customerName} • {order.items.length} item(s)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-900">${order.total.toFixed(2)}</span>
                <span className={`badge ${status.color} flex items-center gap-1`}>
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}