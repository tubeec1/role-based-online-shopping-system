import React, { useState, useMemo } from "react";
import {
  FiPlus,
  FiMinus,
  FiTrash2,
  FiShoppingCart,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const initialCartItems = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "Noise-cancelling, 30hr battery life",
    price: 129.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400",
  },
  {
    id: 2,
    name: "Minimalist Leather Backpack",
    description: "Water-resistant, padded laptop sleeve",
    price: 89.0,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400",
  },
];

let Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // ✅ Optimized calculations
  const { subtotal, shipping, total } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    const shipping = subtotal > 200 ? 0 : 15;
    return {
      subtotal,
      shipping,
      total: subtotal + shipping,
    };
  }, [cartItems]);

  const updateQuantity = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (type === "inc") return { ...item, quantity: item.quantity + 1 };
        if (type === "dec" && item.quantity > 1)
          return { ...item, quantity: item.quantity - 1 };

        return item;
      }),
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ EMPTY STATE
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-3xl shadow-md p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingCart className="text-gray-300 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-blue-950 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Start adding products to see them here.
          </p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-950">
            Shopping Cart
          </h1>
          <span className="text-gray-500 text-sm">
            {cartItems.length} item(s)
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-5 hover:shadow-md transition"
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-950">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* QUANTITY */}
                    <div className="flex items-center bg-gray-50 rounded-lg border">
                      <button
                        onClick={() => updateQuantity(item.id, "dec")}
                        disabled={item.quantity === 1}
                        className="px-3 py-2 text-gray-500 hover:text-orange-500 disabled:opacity-40"
                      >
                        <FiMinus />
                      </button>

                      <span className="px-4 text-sm font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, "inc")}
                        className="px-3 py-2 text-gray-500 hover:text-orange-500"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    {/* PRICE + REMOVE */}
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-blue-950">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* CONTINUE SHOPPING */}
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* SUMMARY */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit lg:sticky top-24">
            <h2 className="text-lg font-bold text-blue-950 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-blue-950">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span
                  className={
                    shipping === 0
                      ? "text-green-600 font-medium"
                      : "text-blue-950 font-medium"
                  }
                >
                  {shipping === 0 ? "Free" : `$${shipping}`}
                </span>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-orange-500 bg-orange-50 px-3 py-2 rounded-md">
                  Add ${(200 - subtotal).toFixed(2)} more to get free shipping
                </p>
              )}

              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-bold text-blue-950">Total</span>
                <span className="text-2xl font-extrabold text-blue-950">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* EXTRA INFO */}
            <p className="text-xs text-center text-gray-400 mt-4">
              Taxes and discounts calculated at checkout
            </p>

            {/* 🔥 PREMIUM CHECKOUT BUTTON */}
            <Link
              to="/checkout"
              className="group relative mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 
              bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl 
              shadow-lg shadow-orange-500/30 
              hover:shadow-orange-500/50 hover:scale-[1.02] 
              active:scale-[0.98] 
              transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Proceed to Checkout
                <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>

              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></span>
            </Link>

            {/* SECURITY NOTE */}
            <p className="text-xs text-center text-gray-400 mt-4">
              Secure checkout • SSL encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
