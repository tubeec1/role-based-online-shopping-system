import React, { useState } from "react";
import {
  FiSearch,
  FiClock,
  FiCreditCard,
  FiTruck,
  FiCheckCircle,
  FiUser,
  FiMail,
  FiPackage,
  FiAlertCircle,
} from "react-icons/fi";

const mockOrder = {
  id: "ORD-784512",
  customer: {
    name: "Mohamed Ali",
    email: "mo@example.com",
  },
  items: [
    { id: 1, name: "Wireless Headphones", qty: 1, price: 129.99 },
    { id: 2, name: "Leather Backpack", qty: 2, price: 89.0 },
  ],
  total: 322.99,
  currentStep: 1, // 0=pending,1=paid,2=shipped,3=delivered
};

const steps = [
  { icon: FiClock, title: "Pending" },
  { icon: FiCreditCard, title: "Paid" },
  { icon: FiTruck, title: "Shipped" },
  { icon: FiCheckCircle, title: "Delivered" },
];

let TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    if (orderId.trim().toUpperCase() === mockOrder.id) {
      setOrder(mockOrder);
      setNotFound(false);
    } else {
      setOrder(null);
      setNotFound(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-blue-950">
            Track Your Order
          </h1>
          <p className="text-gray-500 mt-2">
            Enter your Order ID to check status
          </p>
        </div>

        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          <div className="relative flex-1">
            <FiPackage className="absolute left-4 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="ORD-123456"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
            />
          </div>

          <button className="px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl flex items-center justify-center gap-2">
            <FiSearch />
            Track
          </button>
        </form>

        {/* ERROR */}
        {notFound && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex gap-3 mb-6">
            <FiAlertCircle className="text-red-500 mt-1" />
            <p className="text-sm text-red-600">
              Order not found. Check your ID (example: ORD-123456)
            </p>
          </div>
        )}

        {/* RESULT */}
        {order && (
          <div className="space-y-8">
            {/* STATUS */}
            <div className="bg-white p-6 rounded-2xl border">
              <h2 className="font-bold text-blue-950 mb-6">Order Status</h2>

              <div className="flex items-center justify-between relative">
                {/* LINE */}
                <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 z-0"></div>

                {steps.map((step, index) => {
                  const isActive = index === order.currentStep;
                  const isCompleted = index < order.currentStep;

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center z-10 flex-1"
                    >
                      <div
                        className={`w-12 h-12 flex items-center justify-center rounded-full border-2 
                        ${
                          isCompleted
                            ? "bg-blue-950 border-blue-950 text-white"
                            : isActive
                              ? "bg-orange-500 border-orange-500 text-white scale-110"
                              : "bg-white border-gray-300 text-gray-400"
                        }`}
                      >
                        <step.icon />
                      </div>

                      <p
                        className={`text-xs mt-2 font-semibold 
                        ${
                          isActive
                            ? "text-orange-500"
                            : isCompleted
                              ? "text-blue-950"
                              : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* CURRENT STATUS BADGE */}
              <div className="mt-6 text-center">
                <span className="px-4 py-2 bg-orange-50 text-orange-600 text-sm font-semibold rounded-full">
                  {steps[order.currentStep].title}
                </span>
              </div>
            </div>

            {/* DETAILS */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* ORDER */}
              <div className="bg-white p-6 rounded-2xl border">
                <h3 className="font-bold text-blue-950 mb-4">Order Details</h3>

                <p className="text-sm mb-4">
                  ID: <span className="font-bold">{order.id}</span>
                </p>

                <div className="space-y-2 text-sm">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.name} x{item.qty}
                      </span>
                      <span className="font-semibold">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-4 pt-4 border-t font-bold">
                  <span>Total</span>
                  <span className="text-orange-500">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* CUSTOMER */}
              <div className="bg-white p-6 rounded-2xl border">
                <h3 className="font-bold text-blue-950 mb-4">Customer Info</h3>

                <div className="space-y-4 text-sm">
                  <div className="flex gap-3 items-center">
                    <FiUser />
                    {order.customer.name}
                  </div>
                  <div className="flex gap-3 items-center">
                    <FiMail />
                    {order.customer.email}
                  </div>
                </div>
              </div>
            </div>

            {/* BACK */}
            <div className="text-center">
              <a href="/" className="text-orange-500 font-semibold">
                ← Back to Home
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
