import React, { useEffect } from "react";
import {
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiDollarSign,
  FiArrowUpRight,
  FiLayers,
  FiTruck,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { getDashboardStatistics } from "../../features/dashboard/dashboardSlice";

import StatsCard from "../../components/dashboard/StatsCard";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { statistics, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardStatistics());
  }, [dispatch]);

  const stats = [
    {
      title: "Users",
      value: statistics?.total_users || 0,
      icon: FiUsers,
      color: "blue",
    },

    {
      title: "Categories",
      value: statistics?.total_categories || 0,
      icon: FiLayers,
      color: "green",
    },

    {
      title: "Products",
      value: statistics?.total_products || 0,
      icon: FiBox,
      color: "orange",
    },

    {
      title: "Orders",
      value: statistics?.total_orders || 0,
      icon: FiShoppingCart,
      color: "purple",
    },
  ];

  const orderStats = [
    {
      title: "Pending Orders",
      value: statistics?.pending_orders || 0,
      icon: FiShoppingCart,
      color: "orange",
    },

    {
      title: "Delivered",
      value: statistics?.delivered_orders || 0,
      icon: FiTruck,
      color: "green",
    },

    {
      title: "Cancelled",
      value: statistics?.cancelled_orders || 0,
      icon: FiShoppingCart,
      color: "red",
    },

    {
      title: "Revenue",
      value: `$${statistics?.total_revenue || 0}`,
      icon: FiDollarSign,
      color: "purple",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome Back,
            <span className="text-orange-500"> {user?.full_name}</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor your store performance and statistics.
          </p>
        </div>

        {user?.role_id === 1 && (
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition">
            View Reports
            <FiArrowUpRight />
          </button>
        )}
      </div>

      {/* Main Statistics */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          General Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {stats.map((item) => (
            <StatsCard
              key={item.title}
              title={item.title}
              value={item.value}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>
      </div>

      {/* Order Statistics */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Order Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {orderStats.map((item) => (
            <StatsCard
              key={item.title}
              title={item.title}
              value={item.value}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>
      </div>

      {/* Revenue Card */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 text-white shadow-xl">
        <h3 className="text-lg font-semibold opacity-90">Total Revenue</h3>

        <h2 className="text-5xl font-bold mt-3">
          ${statistics?.total_revenue || 0}
        </h2>

        <p className="mt-3 text-orange-100">
          Revenue generated from all completed orders.
        </p>
      </div>
    </div>
  );
}
