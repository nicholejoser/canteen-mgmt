"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Users,
  Download,
  FileText,
  Calendar,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { weeklySales, orders, menuItems } from "@/public/data/mockdata";
import Header from "../components/Header";
import SalesChart from "../components/SalesChart";
import { User } from "../types/user";
import { toast } from "sonner";

export default function ReportsPage() {
  const totalWeeklyRevenue = weeklySales.reduce((acc, d) => acc + d.sales, 0);
  const totalWeeklyOrders = weeklySales.reduce((acc, d) => acc + d.orders, 0);
  const avgOrderValue = totalWeeklyRevenue / totalWeeklyOrders;
  //   const topCategory = "Main Course";
  const [users, setUsers] = useState<User[]>([]);
  const hasFetchUser = useRef<boolean>(false);
  useEffect(() => {
    if (hasFetchUser.current) return;
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users", { method: "GET" });
        const data = await res.json();
        setUsers(data);
        toast.success("Users fetched successfully");
      } catch (error) {
        toast.error("Unable to fetch users.");
        console.log(error);
      }
    };
    fetchUsers();
    hasFetchUser.current = true;
  }, []);
  const categoryBreakdown = menuItems.reduce(
    (acc, item) => {
      acc[item.category] =
        (acc[item.category] || 0) + item.soldToday * item.price;
      return acc;
    },
    {} as Record<string, number>,
  );

  const paymentBreakdown = orders.reduce(
    (acc, order) => {
      acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + order.total;
      return acc;
    },
    {} as Record<string, number>,
  );

  const categoryColors: Record<string, string> = {
    "Main Course": "bg-blue-500",
    Sides: "bg-orange-500",
    Salads: "bg-green-500",
    Beverages: "bg-purple-500",
    Desserts: "bg-pink-500",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Reports & Analytics"
        subtitle="Comprehensive insights into your canteen operations"
      />

      <div className="p-8">
        {/* Report Actions */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <Calendar className="w-4 h-4" />
              This Week
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <Calendar className="w-4 h-4" />
              This Month
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-primary">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <FileText className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-linear-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Weekly Revenue</p>
                <p className="text-3xl font-bold mt-1">
                  ${totalWeeklyRevenue.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    +12.5% vs last week
                  </span>
                </div>
              </div>
              <DollarSign className="w-12 h-12 text-green-200" />
            </div>
          </div>

          <div className="card bg-linear-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Weekly Orders</p>
                <p className="text-3xl font-bold mt-1">{totalWeeklyOrders}</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    +8.3% vs last week
                  </span>
                </div>
              </div>
              <ShoppingCart className="w-12 h-12 text-blue-200" />
            </div>
          </div>

          <div className="card bg-linear-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Avg Order Value</p>
                <p className="text-3xl font-bold mt-1">
                  ${avgOrderValue.toFixed(2)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    +3.7% vs last week
                  </span>
                </div>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-200" />
            </div>
          </div>

          <div className="card bg-linear-to-br from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Active Users</p>
                <p className="text-3xl font-bold mt-1">
                  {users.filter((u) => u.status === "active").length}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    -1.2% vs last week
                  </span>
                </div>
              </div>
              <Users className="w-12 h-12 text-orange-200" />
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>

          {/* Category Breakdown */}
          <div className="card">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-gray-900">
                Revenue by Category
              </h3>
            </div>
            <div className="space-y-4">
              {Object.entries(categoryBreakdown)
                .sort(([, a], [, b]) => b - a)
                .map(([category, revenue]) => {
                  const totalCatRevenue = Object.values(
                    categoryBreakdown,
                  ).reduce((a, b) => a + b, 0);
                  const percentage = (revenue / totalCatRevenue) * 100;
                  return (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">
                            ${revenue.toFixed(0)}
                          </span>
                          <span className="text-xs text-gray-400">
                            ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${categoryColors[category] || "bg-gray-500"}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <div className="card">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-gray-900">
                Payment Methods
              </h3>
            </div>
            <div className="space-y-4">
              {Object.entries(paymentBreakdown).map(([method, amount]) => (
                <div
                  key={method}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        method === "cash"
                          ? "bg-green-100"
                          : method === "card"
                            ? "bg-blue-100"
                            : "bg-purple-100"
                      }`}
                    >
                      <DollarSign
                        className={`w-5 h-5 ${
                          method === "cash"
                            ? "text-green-600"
                            : method === "card"
                              ? "text-blue-600"
                              : "text-purple-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 capitalize">
                        {method}
                      </p>
                      <p className="text-xs text-gray-500">
                        {
                          orders.filter((o) => o.paymentMethod === method)
                            .length
                        }{" "}
                        transactions
                      </p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    ${amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Breakdown */}
          <div className="card">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-gray-900">
                Daily Breakdown
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 rounded-l-lg">
                      Day
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                      Sales
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                      Orders
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600 rounded-r-lg">
                      Avg/Order
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {weeklySales.map((day) => (
                    <tr key={day.day} className="border-b border-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {day.day}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-900">
                        ${day.sales.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600">
                        {day.orders}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600">
                        ${(day.sales / day.orders).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-bold">
                    <td className="py-3 px-4 text-gray-900 rounded-bl-lg">
                      Total
                    </td>
                    <td className="py-3 px-4 text-right text-primary-600">
                      ${totalWeeklyRevenue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-primary-600">
                      {totalWeeklyOrders}
                    </td>
                    <td className="py-3 px-4 text-right text-primary-600 rounded-br-lg">
                      ${avgOrderValue.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
