'use client';

import React, { useState } from 'react';
import { Order } from '@/data/mockData';
import { Search, Clock, CheckCircle2, XCircle, ChefHat, Package, Eye, Filter } from 'lucide-react';

interface OrdersTableProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: Order['status']) => void;
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock },
  preparing: { label: 'Preparing', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: ChefHat },
  ready: { label: 'Ready', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Package },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
};

export default function OrdersTable({ orders, onUpdateStatus }: OrdersTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {['all', 'pending', 'preparing', 'ready', 'completed', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm rounded-l-lg">Order ID</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Customer</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Items</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Total</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Payment</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Type</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Status</th>
              <th className="text-center py-4 px-4 font-semibold text-gray-600 text-sm rounded-r-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;
              return (
                <React.Fragment key={order.id}>
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-bold text-primary-600 text-sm">{order.id}</span>
                      <p className="text-xs text-gray-400 mt-0.5">{order.timestamp}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900 text-sm">{order.customerName}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">{order.items.length} item(s)</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-gray-900">${order.total.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="badge bg-gray-100 text-gray-600 capitalize">{order.paymentMethod}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`badge ${order.orderType === 'dine-in' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                        {order.orderType}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
                        className={`badge border ${status.color} cursor-pointer focus:outline-none text-xs`}
                      >
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-400 hover:text-blue-500" />
                      </button>
                    </td>
                  </tr>
                  {expandedOrder === order.id && (
                    <tr>
                      <td colSpan={8} className="px-4 py-4 bg-gray-50">
                        <div className="pl-4 border-l-4 border-primary-500">
                          <h4 className="font-semibold text-gray-900 text-sm mb-2">Order Details</h4>
                          <div className="space-y-1">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span className="text-gray-600">{item.name} × {item.quantity}</span>
                                <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
                              </div>
                            ))}
                            <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-200 mt-2">
                              <span className="text-gray-900">Total</span>
                              <span className="text-primary-600">${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No orders found</p>
        </div>
      )}
    </div>
  );
}