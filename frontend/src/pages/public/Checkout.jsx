import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiMapPin,
  FiSmartphone,
  FiShield,
  FiTruck,
  FiCopy,
} from "react-icons/fi";

import { createOrder } from "../../features/order/orderSlice";
import { clearCart } from "../../features/cart/cartSlice";
import { getMe } from "../../features/auth/authSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const { user, token } = useSelector((state) => state.auth);

  const { loading, success, error } = useSelector((state) => state.orders);

  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
  });

  // Check Login
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Load User
  useEffect(() => {
    if (token && !user) {
      dispatch(getMe());
    }
  }, [dispatch, token, user]);

  // Fill Form From User
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        phone: user.phone || "",
        address: user.address || "",
      }));
    }
  }, [user]);

  // Order Success
  useEffect(() => {
    if (success) {
      dispatch(clearCart());
      navigate("/track-orders");
    }
  }, [success, dispatch, navigate]);

  const { subtotal, shipping, total } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0,
    );

    const shipping = subtotal >= 200 ? 0 : 15;

    return {
      subtotal,
      shipping,
      total: subtotal + shipping,
    };
  }, [cartItems]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const copyNumber = () => {
    navigator.clipboard.writeText("618994037");

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.phone.trim()) {
      alert("Phone number is required");
      return;
    }

    if (!formData.address.trim()) {
      alert("Address is required");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orderData = {
      phone: formData.phone,
      address: formData.address,

      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    dispatch(createOrder(orderData));
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm";

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-10">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-2xl border">
            <h2 className="text-lg font-bold text-blue-950 mb-6 flex items-center gap-2">
              <FiMapPin className="text-orange-500" />
              Shipping Information
            </h2>

            <div className="grid gap-4">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className={inputStyle}
              />

              <textarea
                rows="4"
                name="address"
                placeholder="Full Address"
                value={formData.address}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border">
            <h2 className="text-lg font-bold text-blue-950 mb-6 flex items-center gap-2">
              <FiSmartphone className="text-orange-500" />
              EVC Plus Payment
            </h2>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Send payment to</p>

                <p className="text-xl font-bold text-orange-600">618994037</p>
              </div>

              <button
                type="button"
                onClick={copyNumber}
                className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg"
              >
                <FiCopy />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <p>1. Send payment via EVC Plus.</p>
              <p>2. Complete your order.</p>
              <p>3. Our team will verify payment.</p>
              <p>4. Order will be delivered.</p>
            </div>
          </div>
        </form>

        <div className="bg-white p-6 rounded-2xl border h-fit sticky top-24">
          <h2 className="font-bold text-lg text-blue-950 mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-3">
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

            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error.message || "Failed to create order"}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition shadow-lg disabled:opacity-50"
          >
            {loading
              ? "Creating Order..."
              : `Confirm Order • $${total.toFixed(2)}`}
          </button>

          <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <FiShield />
              Verified Payment
            </span>

            <span className="flex items-center gap-1">
              <FiTruck />
              Fast Delivery
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
