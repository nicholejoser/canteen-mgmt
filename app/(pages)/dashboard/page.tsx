'use client';

import Header from '@/app/components/Header';
import PopularItems from '@/app/components/PopularItems';
import RecentOrders from '@/app/components/RecentOrder';
import SalesChart from '@/app/components/SalesChart';
import StatsCard from '@/app/components/StatsCard';
import {
  DollarSign,
  ShoppingCart,
  Users,
  UtensilsCrossed,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-lexend">
      <Header title="Dashboard" subtitle="Welcome back! Here's what's happening in your canteen today." />

      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Today's Revenue"
            value="$2,847"
            change={12.5}
            icon={DollarSign}
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <StatsCard
            title="Total Orders"
            value="156"
            change={8.2}
            icon={ShoppingCart}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatsCard
            title="Active Users"
            value="1,024"
            change={3.1}
            icon={Users}
            color="text-purple-600"
            bgColor="bg-purple-100"
          />
          <StatsCard
            title="Menu Items"
            value="48"
            change={-2.4}
            icon={UtensilsCrossed}
            color="text-orange-600"
            bgColor="bg-orange-100"
          />
        </div>

        {/* Quick Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-xs text-gray-500">Pending Orders</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs text-gray-500">Preparing</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">136</p>
              <p className="text-xs text-gray-500">Completed Today</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-xs text-gray-500">Low Stock Items</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <SalesChart />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentOrders />
          <PopularItems />
        </div>
      </div>
    </div>
  );
}