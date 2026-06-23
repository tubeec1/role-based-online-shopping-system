import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../features/order/orderSlice";
import Toaster, { toast } from "react-hot-toast";
import { FiEye, FiEdit, FiX, FiUser, FiPhone, FiMapPin } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusOptions = [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const Orders = () => {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.orders);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [detailsModal, setDetailsModal] = useState(false);

  const [statusModal, setStatusModal] = useState(false);

  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const openDetailsModal = (order) => {
    setSelectedOrder(order);
    setDetailsModal(true);
  };

  const openStatusModal = (order) => {
    setSelectedOrder(order);
    setStatus(order.status);
    setStatusModal(true);
  };

  const handleUpdateStatus = async () => {
    try {
      await dispatch(
        updateOrderStatus({
          id: selectedOrder.order_id,
          status,
        }),
      ).unwrap();

      toast.success("Order Status Updated Successfully");

      dispatch(getAllOrders());

      setStatusModal(false);
    } catch (error) {
      toast.error(error?.message || "Failed To Update Status");
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold text-slate-900">Orders</h1>

        <p className="text-gray-500 mt-1">
          Manage customer orders and update statuses
        </p>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-6 py-4">Order ID</th>
                <th className="text-left px-6 py-4">Customer</th>
                <th className="text-left px-6 py-4">Phone</th>
                <th className="text-left px-6 py-4">Address</th>
                <th className="text-left px-6 py-4">Items</th>
                <th className="text-left px-6 py-4">Total</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-left px-6 py-4">Date</th>
                <th className="text-center px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-10">
                    Loading...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-10">
                    No Orders Found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.order_id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-semibold">
                      #{order.order_id}
                    </td>

                    <td className="px-6 py-4">
                      <div>
                        <h4 className="font-semibold">
                          {order.customer?.full_name}
                        </h4>

                        <p className="text-sm text-gray-500">
                          {order.customer?.email}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">{order.phone}</td>

                    <td className="px-6 py-4">{order.address}</td>

                    <td className="px-6 py-4">{order.total_items} item(s)</td>

                    <td className="px-6 py-4 font-bold text-green-600">
                      ${order.total_amount}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          statusColors[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">{order.created_at}</td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => openDetailsModal(order)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEye size={18} />
                        </button>

                        <button
                          onClick={() => openStatusModal(order)}
                          className="text-orange-600 hover:text-orange-800"
                        >
                          <FiEdit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* DETAILS MODAL */}

      {detailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">
                Order #{selectedOrder.order_id}
              </h2>

              <button onClick={() => setDetailsModal(false)}>
                <FiX size={22} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* CUSTOMER INFO */}

              <div className="grid md:grid-cols-3 gap-4">
                <div className="border rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiUser />
                    <h3 className="font-semibold">Customer</h3>
                  </div>

                  <p>{selectedOrder.customer?.full_name}</p>
                  <p className="text-gray-500 text-sm">
                    {selectedOrder.customer?.email}
                  </p>
                </div>

                <div className="border rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiPhone />
                    <h3 className="font-semibold">Phone</h3>
                  </div>

                  <p>{selectedOrder.phone}</p>
                </div>

                <div className="border rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiMapPin />
                    <h3 className="font-semibold">Address</h3>
                  </div>

                  <p>{selectedOrder.address}</p>
                </div>
              </div>

              {/* ORDER INFO */}

              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-orange-50 rounded-2xl p-4">
                  <h4 className="text-sm text-gray-500">Total Amount</h4>

                  <p className="font-bold text-green-600 text-xl">
                    ${selectedOrder.total_amount}
                  </p>
                </div>

                <div className="bg-orange-50 rounded-2xl p-4">
                  <h4 className="text-sm text-gray-500">Items</h4>

                  <p className="font-bold text-xl">
                    {selectedOrder.total_items}
                  </p>
                </div>

                <div className="bg-orange-50 rounded-2xl p-4">
                  <h4 className="text-sm text-gray-500">Status</h4>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      statusColors[selectedOrder.status]
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>

                <div className="bg-orange-50 rounded-2xl p-4">
                  <h4 className="text-sm text-gray-500">Date</h4>

                  <p className="font-semibold">{selectedOrder.created_at}</p>
                </div>
              </div>

              {/* PRODUCTS */}

              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <FiShoppingBag />
                  Ordered Products
                </h3>

                <div className="space-y-4">
                  {selectedOrder.items?.map((item) => (
                    <div
                      key={item.order_item_id}
                      className="border rounded-2xl p-4 flex items-center gap-4"
                    >
                      <img
                        src={`http://localhost/online-shopping-system/backend/public/${item.product_image}`}
                        alt={item.product_name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <h4 className="font-semibold">{item.product_name}</h4>

                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>

                        <p className="text-sm text-gray-500">
                          Price: ${item.price}
                        </p>
                      </div>

                      <div className="font-bold text-green-600">
                        ${item.subtotal}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE STATUS MODAL */}

      {statusModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Update Order Status</h2>

              <button onClick={() => setStatusModal(false)}>
                <FiX size={22} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block mb-2 font-medium">Order ID</label>

                <input
                  value={selectedOrder.order_id}
                  readOnly
                  className="w-full border rounded-xl px-4 py-3 bg-gray-100"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Customer</label>

                <input
                  value={selectedOrder.customer?.full_name}
                  readOnly
                  className="w-full border rounded-xl px-4 py-3 bg-gray-100"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Total Amount</label>

                <input
                  value={`$${selectedOrder.total_amount}`}
                  readOnly
                  className="w-full border rounded-xl px-4 py-3 bg-gray-100"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Status</label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  {statusOptions.map((item) => (
                    <option key={item} value={item}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleUpdateStatus}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
