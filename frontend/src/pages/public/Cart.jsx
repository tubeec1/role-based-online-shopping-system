import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../features/cart/cartSlice";

import {
  FiPlus,
  FiMinus,
  FiTrash2,
  FiShoppingCart,
  FiArrowRight,
} from "react-icons/fi";

import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const imageUrl = (image) => {
    if (!image) {
      return "https://via.placeholder.com/400x400";
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `http://localhost/online-shopping-system/backend/public/${image}`;
  };

  const { subtotal, shipping, total } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.quantity),
      0,
    );

    const shipping = subtotal > 200 ? 0 : 15;

    return {
      subtotal,
      shipping,
      total: subtotal + shipping,
    };
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        {" "}
        <div className="bg-white rounded-3xl shadow-md p-10 text-center max-w-md w-full">
          {" "}
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            {" "}
            <FiShoppingCart className="text-gray-300 text-3xl" />{" "}
          </div>
          <h2 className="text-2xl font-bold text-blue-950 mb-2">
            Your Cart Is Empty
          </h2>
          <p className="text-gray-500 mb-6">
            Start adding products to see them here.
          </p>
          <Link
            to="/"
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
      {" "}
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-950">
            Shopping Cart
          </h1>

          <span className="text-gray-500 text-sm">
            {cartItems.length} Item(s)
          </span>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}

          <div className="lg:col-span-2 space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-5 hover:shadow-md transition"
              >
                {/* Image */}

                <img
                  src={imageUrl(item.image)}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                {/* Content */}

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-950 text-lg">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-400 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}

                    <div className="flex items-center bg-gray-50 rounded-lg border">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        disabled={item.quantity === 1}
                        className="px-3 py-2 text-gray-500 hover:text-orange-500 disabled:opacity-40"
                      >
                        <FiMinus />
                      </button>

                      <span className="px-4 text-sm font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="px-3 py-2 text-gray-500 hover:text-orange-500"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    {/* Price */}

                    <div className="flex items-center gap-4">
                      <span className="font-bold text-blue-950">
                        $
                        {(Number(item.price) * Number(item.quantity)).toFixed(
                          2,
                        )}
                      </span>

                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}

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

            <p className="text-xs text-center text-gray-400 mt-4">
              Taxes and discounts calculated at checkout
            </p>

            <Link
              to="/checkout"
              className="group relative mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Proceed To Checkout
                <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>

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
