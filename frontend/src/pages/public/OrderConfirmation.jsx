import React from "react";
import {
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiMail,
  FiMapPin,
  FiUser,
  FiPhone,
  FiSmartphone,
  FiArrowRight,
} from "react-icons/fi";

const order = {
  id: "ORD-784512",
  customer: {
    name: "Mohamed Ali",
    email: "mo@example.com",
    phone: "0612345678",
    address: "Mogadishu, Somalia",
  },
  items: [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 129.99,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=100&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Leather Backpack",
      price: 89.0,
      qty: 2,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=100&auto=format&fit=crop",
    },
  ],
  subtotal: 307.99,
  shipping: 15.0,
  total: 322.99,
  paymentMethod: "EVC Plus",
  status: "Pending",
};

let OrderConfirmation = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-5">
            <FiCheckCircle className="w-10 h-10 text-green-500" />
          </div>

          <h1 className="text-3xl font-extrabold text-blue-950">
            Order Submitted Successfully
          </h1>

          <p className="text-gray-500 mt-2">
            Your order is waiting for payment verification
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
            <FiClock className="text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">
              Payment Pending
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-5 gap-8 mb-8">
          {/* LEFT - ORDER INFO */}
          <div className="lg:col-span-3 bg-white p-6 rounded-2xl border">
            <h2 className="text-xl font-bold text-blue-950 mb-6">
              Order Details
            </h2>

            <div className="space-y-5 text-sm">
              {/* ORDER ID */}
              <InfoItem
                icon={<FiSmartphone />}
                label="Order ID"
                value={order.id}
              />

              <InfoItem
                icon={<FiUser />}
                label="Customer Name"
                value={order.customer.name}
              />

              <InfoItem
                icon={<FiMail />}
                label="Email"
                value={order.customer.email}
              />

              <InfoItem
                icon={<FiPhone />}
                label="Phone"
                value={order.customer.phone}
              />

              <InfoItem
                icon={<FiMapPin />}
                label="Address"
                value={order.customer.address}
              />

              <InfoItem
                icon={<FiSmartphone />}
                label="Payment Method"
                value={order.paymentMethod}
              />
            </div>
          </div>

          {/* RIGHT - SUMMARY */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border">
            <h2 className="text-xl font-bold text-blue-950 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-blue-950">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                  </div>
                  <p className="text-sm font-bold">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2 text-sm">
              <Row label="Subtotal" value={order.subtotal} />
              <Row label="Shipping" value={order.shipping} />

              <div className="flex justify-between font-bold text-blue-950 pt-3 text-lg">
                <span>Total</span>
                <span className="text-orange-500">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PROCESS STEPS */}
        <div className="bg-blue-950 text-white p-8 rounded-2xl mb-8">
          <h2 className="text-xl font-bold mb-6">What happens next?</h2>

          <div className="grid sm:grid-cols-3 gap-6 text-center text-sm">
            <Step
              icon={<FiClock />}
              title="Verification"
              desc="We verify your EVC Plus payment manually."
            />

            <Step
              icon={<FiMail />}
              title="Confirmation"
              desc="You will receive confirmation via WhatsApp or Email."
            />

            <Step
              icon={<FiTruck />}
              title="Delivery"
              desc="Your order will be delivered after approval."
            />
          </div>
        </div>

        {/* NOTICE */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-8 text-sm text-amber-700">
          ⏳ Verification usually takes <b>5–15 minutes</b>. Please keep your
          phone available.
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`/track-order`}
            className="px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl flex items-center justify-center gap-2"
          >
            Track Order <FiArrowRight />
          </a>

          <a
            href="/"
            className="px-6 py-4 border rounded-xl font-bold text-blue-950 hover:bg-gray-100 text-center"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

/* SMALL COMPONENTS */

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 border-b pb-3">
    <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-semibold text-blue-950">{value}</p>
    </div>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <span>${value.toFixed(2)}</span>
  </div>
);

const Step = ({ icon, title, desc }) => (
  <div>
    <div className="w-12 h-12 mx-auto mb-3 bg-white/10 rounded-full flex items-center justify-center">
      {icon}
    </div>
    <h3 className="font-semibold">{title}</h3>
    <p className="text-xs text-blue-200 mt-1">{desc}</p>
  </div>
);

export default OrderConfirmation;
