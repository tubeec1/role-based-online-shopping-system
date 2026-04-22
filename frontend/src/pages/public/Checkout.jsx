import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiSmartphone,
  FiShield,
  FiTruck,
  FiCopy,
} from "react-icons/fi";

let Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  const Navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartItems = [
    { id: 1, name: "Wireless Headphones", price: 129.99, qty: 1 },
    { id: 2, name: "Leather Backpack", price: 89, qty: 2 },
  ];

  const subtotal = cartItems.reduce((a, i) => a + i.price * i.qty, 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copyNumber = () => {
    navigator.clipboard.writeText("618994037");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
    Navigate("/payment-instructions");
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm";

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
          {/* SHIPPING */}
          <div className="bg-white p-6 rounded-2xl border">
            <h2 className="text-lg font-bold text-blue-950 mb-6 flex items-center gap-2">
              <FiMapPin className="text-orange-500" /> Shipping Information
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                className={inputStyle}
              />
              <input
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                className={inputStyle}
              />
              <input
                name="city"
                placeholder="City"
                onChange={handleChange}
                className={inputStyle}
              />
              <input
                name="country"
                placeholder="Country"
                onChange={handleChange}
                className={inputStyle}
              />
              <input
                name="address"
                placeholder="Full Address"
                onChange={handleChange}
                className={`${inputStyle} sm:col-span-2`}
              />
            </div>
          </div>

          {/* PAYMENT - EVC PLUS */}
          <div className="bg-white p-6 rounded-2xl border">
            <h2 className="text-lg font-bold text-blue-950 mb-6 flex items-center gap-2">
              <FiSmartphone className="text-orange-500" /> EVC Plus Payment
            </h2>

            {/* NUMBER */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Send payment to</p>
                <p className="text-xl font-bold text-orange-600">618994037</p>
              </div>

              <button
                type="button"
                onClick={copyNumber}
                className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm"
              >
                <FiCopy />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* INSTRUCTIONS */}
            <div className="mt-6 space-y-3 text-sm text-gray-600">
              <p>1. Send the total amount via EVC Plus.</p>
              <p>2. Take a screenshot of the payment.</p>
              <p>3. Send screenshot to our WhatsApp.</p>
              <p>4. Include your email & name for confirmation.</p>
            </div>

            <div className="mt-4 text-xs text-gray-400">
              ⚠️ Your order will be confirmed after payment verification.
            </div>
          </div>
        </form>

        {/* RIGHT SIDE */}
        <div className="bg-white p-6 rounded-2xl border h-fit sticky top-24">
          <h2 className="font-bold text-lg text-blue-950 mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} x{item.qty}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className={shipping === 0 ? "text-green-600" : ""}>
                {shipping === 0 ? "Free" : `$${shipping}`}
              </span>
            </div>

            <div className="flex justify-between font-bold text-blue-950 text-lg pt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleSubmit}
            className="w-full mt-6 py-4 rounded-xl font-bold text-white 
            bg-gradient-to-r from-orange-500 to-orange-600 
            hover:from-orange-600 hover:to-orange-700 
            transition flex items-center justify-center gap-2 shadow-lg"
          >
            {isSubmitting
              ? "Processing..."
              : `Confirm Order • $${total.toFixed(2)}`}
          </button>

          {/* TRUST */}
          <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <FiShield /> Verified Payment
            </span>
            <span className="flex items-center gap-1">
              <FiTruck /> Fast Delivery
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
