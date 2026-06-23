import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStatistics } from "../../features/dashboard/dashboardSlice";
import { getAllOrders } from "../../features/order/orderSlice";
import { getProducts } from "../../features/products/productSlice";
import { getCategories } from "../../features/category/categorySlice";

import {
  FiDollarSign,
  FiShoppingCart,
  FiBox,
  FiLayers,
  FiClock,
} from "react-icons/fi";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Reports = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { statistics } = useSelector((state) => state.dashboard);

  const { orders, loading: ordersLoading } = useSelector(
    (state) => state.orders,
  );

  const { products } = useSelector((state) => state.products);

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getDashboardStatistics());
    dispatch(getAllOrders());
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  if (user?.role_id !== 1 && user?.role_id !== 2) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
      </div>
    );
  }

  const statusData = [
    {
      name: "Pending",
      value: statistics?.pending_orders || 0,
    },
    {
      name: "Paid",
      value: statistics?.paid_orders || 0,
    },
    {
      name: "Processing",
      value: statistics?.processing_orders || 0,
    },
    {
      name: "Delivered",
      value: statistics?.delivered_orders || 0,
    },
    {
      name: "Cancelled",
      value: statistics?.cancelled_orders || 0,
    },
  ];

  const COLORS = ["#f97316", "#10b981", "#3b82f6", "#8b5cf6", "#ef4444"];

  const lowStockProducts = products.filter(
    (product) => Number(product.stock) < 10,
  );

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  const topCustomers = useMemo(() => {
    const customerMap = {};

    orders.forEach((order) => {
      const customerName = order.customer?.full_name || "Unknown";

      if (!customerMap[customerName]) {
        customerMap[customerName] = {
          name: customerName,
          orders: 0,
          spent: 0,
        };
      }

      customerMap[customerName].orders += 1;
      customerMap[customerName].spent += Number(order.total_amount);
    });

    return Object.values(customerMap)
      .sort((a, b) => b.spent - a.spent)
      .slice(0, 5);
  }, [orders]);

  const cards = [
    {
      title: "Revenue",
      value: `$${statistics?.total_revenue || 0}`,
      icon: FiDollarSign,
      color: "bg-green-500",
    },

    {
      title: "Orders",
      value: statistics?.total_orders || 0,
      icon: FiShoppingCart,
      color: "bg-orange-500",
    },

    {
      title: "Products",
      value: products.length,
      icon: FiBox,
      color: "bg-blue-500",
    },

    {
      title: "Categories",
      value: categories.length,
      icon: FiLayers,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Reports & Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor business performance and insights.
        </p>
      </div>

      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-3xl p-6 border shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">{card.title}</p>

                  <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
                </div>

                <div className={`${card.color} text-white p-4 rounded-2xl`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* PIE */}

        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <h2 className="text-xl font-bold mb-6">Orders By Status</h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}

        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <h2 className="text-xl font-bold mb-6">Status Distribution</h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT ORDERS */}

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Recent Orders</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-4">Order ID</th>

                <th className="text-left px-6 py-4">Customer</th>

                <th className="text-left px-6 py-4">Amount</th>

                <th className="text-left px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.order_id} className="border-b">
                  <td className="px-6 py-4">#{order.order_id}</td>

                  <td className="px-6 py-4">{order.customer?.full_name}</td>

                  <td className="px-6 py-4">${order.total_amount}</td>

                  <td className="px-6 py-4">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TOP CUSTOMERS */}

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Top Customers</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-4">Customer</th>

                <th className="text-left px-6 py-4">Orders</th>

                <th className="text-left px-6 py-4">Total Spent</th>
              </tr>
            </thead>

            <tbody>
              {topCustomers.map((customer) => (
                <tr key={customer.name} className="border-b">
                  <td className="px-6 py-4">{customer.name}</td>

                  <td className="px-6 py-4">{customer.orders}</td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    ${customer.spent.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LOW STOCK PRODUCTS */}

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Low Stock Products</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-4">Product</th>

                <th className="text-left px-6 py-4">Stock</th>

                <th className="text-left px-6 py-4">Price</th>
              </tr>
            </thead>

            <tbody>
              {lowStockProducts.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-8">
                    No Low Stock Products
                  </td>
                </tr>
              ) : (
                lowStockProducts.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="px-6 py-4">{product.name}</td>

                    <td className="px-6 py-4 text-red-500 font-semibold">
                      {product.stock}
                    </td>

                    <td className="px-6 py-4">${product.price}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
