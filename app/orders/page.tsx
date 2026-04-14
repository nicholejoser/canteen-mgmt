'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import OrdersTable from '@/components/OrdersTable';
import { orders as initialOrders, Order } from '@/data/mockData';
import { ShoppingCart, Clock, CheckCircle, XCircle, Plus } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleUpdateStatus = (id: string, status: Order['status']) => {
    setOrders(orders.map(o =>
      o.id === id ? { ...o, status } : o
    ));
  };

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const preparingCount = orders.filter(o => o.status === 'preparing').length;
  const completedCount = orders.filter(o => o.status === 'completed').length;
  const cancelledCount = orders.filter(o => o.status === 'cancelled').length;
  const totalRevenue = orders.filter(o => o.status === 'completed').reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Order Management" subtitle="Track and manage all canteen orders" />

      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              <p className="text-xs text-gray-500">Total Orders</p>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{preparingCount}</p>
              <p className="text-xs text-gray-500">Preparing</p>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{cancelledCount}</p>
              <p className="text-xs text-gray-500">Cancelled</p>
            </div>
          </div>
        </div>

        {/* Revenue Banner */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 mb-8 text-white flex items-center justify-between">
          <div>
            <p className="text-primary-200 text-sm">Total Revenue from Completed Orders</p>
            <p className="text-4xl font-bold mt-1">${totalRevenue.toFixed(2)}</p>
          </div>
          <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            New Order
          </button>
        </div>

        {/* Orders Table */}
        <OrdersTable orders={orders} onUpdateStatus={handleUpdateStatus} />
      </div>
    </div>
  );
}