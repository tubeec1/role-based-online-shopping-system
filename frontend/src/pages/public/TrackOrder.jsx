import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../features/order/orderSlice";
import {
  FiPackage,
  FiCalendar,
  FiMapPin,
  FiPhone,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const TrackOrder = () => {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.orders);

  const [openOrder, setOpenOrder] = useState(null);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-purple-100 text-purple-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-orange-500 text-lg font-semibold">
          Loading orders...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-950">My Orders</h1>

          <p className="text-gray-500 mt-2">Track and manage all your orders</p>
        </div>

        {orders?.length === 0 ? (
          <div className="bg-white rounded-2xl border p-12 text-center">
            <FiPackage className="mx-auto text-5xl text-gray-300 mb-4" />

            <h2 className="text-2xl font-bold text-blue-950">
              No Orders Found
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders?.map((order) => (
              <div
                key={order.order_id}
                className="bg-white rounded-2xl border shadow-sm overflow-hidden"
              >
                {/* Header */}
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-xl text-blue-950">
                        Order #{order.order_id}
                      </h3>

                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <FiCalendar />
                          {order.created_at}
                        </div>

                        <div className="flex items-center gap-2">
                          <FiPhone />
                          {order.phone}
                        </div>

                        <div className="flex items-center gap-2">
                          <FiMapPin />
                          {order.address}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>

                      <div className="text-right">
                        <p className="text-gray-500 text-sm">Total Amount</p>

                        <h4 className="text-xl font-bold text-orange-500">
                          ${order.total_amount}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500">Order ID</p>

                      <h4 className="font-bold">#{order.order_id}</h4>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500">Total Items</p>

                      <h4 className="font-bold">{order.total_items}</h4>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500">Status</p>

                      <h4 className="font-bold capitalize">{order.status}</h4>
                    </div>
                  </div>

                  {/* Toggle */}
                  <button
                    onClick={() =>
                      setOpenOrder(
                        openOrder === order.order_id ? null : order.order_id,
                      )
                    }
                    className="mt-6 flex items-center gap-2 text-orange-500 font-semibold"
                  >
                    {openOrder === order.order_id ? (
                      <>
                        Hide Details
                        <FiChevronUp />
                      </>
                    ) : (
                      <>
                        View Details
                        <FiChevronDown />
                      </>
                    )}
                  </button>
                </div>

                {/* Items */}
                {openOrder === order.order_id && (
                  <div className="border-t bg-gray-50 p-6">
                    <h4 className="font-bold text-lg text-blue-950 mb-4">
                      Order Items
                    </h4>

                    <div className="space-y-4">
                      {order.items?.map((item) => (
                        <div
                          key={item.order_item_id}
                          className="bg-white rounded-xl p-4 border flex flex-col md:flex-row gap-4 md:items-center justify-between"
                        >
                          <div className="flex gap-4 items-center">
                            <img
                              src={`http://localhost/online-shopping-system/backend/public/${item.product_image}`}
                              alt={item.product_name}
                              className="w-20 h-20 object-cover rounded-lg border"
                            />

                            <div>
                              <h5 className="font-semibold text-blue-950">
                                {item.product_name}
                              </h5>

                              <p className="text-sm text-gray-500">
                                Quantity: {item.quantity}
                              </p>

                              <p className="text-sm text-gray-500">
                                Unit Price: ${item.price}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-500">Subtotal</p>

                            <h5 className="font-bold text-orange-500">
                              ${item.subtotal}
                            </h5>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 text-right">
                      <h3 className="text-2xl font-bold text-orange-500">
                        Total: ${order.total_amount}
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
