import { useEffect, useState } from "react";
import apiRequest from "../../utils/apiRequest";

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await apiRequest({
        url: "/api/orders",
        method: "GET",
      });
      setOrders(res.data.docs || []);
      setLoading(false);
    } catch (err) {
      // console.log(err);
      setError("Failed to fetch orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await apiRequest({
        url: `/api/orders/${id}`,
        method: "DELETE",
      });
      setOrders(orders.filter((order) => order._id !== id));
    } catch (err) {
      setError("Failed to delete order");
    }
  };

  // Handle edit click
  const handleEdit = (order) => {
    setEditingOrder(order._id);
    setFormData({
      isPaid: order.isPaid,
      isDelivered: order.isDelivered,
    });
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle save
  const handleSave = async (id) => {
    try {
      const res = await apiRequest({
        url: `/api/orders/${id}`,
        method: "PATCH",
        data: formData,
      });
      setOrders(
        orders.map((order) =>
          order._id === id ? res.data.data : order
        )
      );
      setEditingOrder(null);
    } catch (err) {
      setError("Failed to update order");
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      {error && <p className="text-red-600">{error}</p>}

      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Paid</th>
            <th className="p-2 border">Delivered</th>
            <th className="p-2 border">Delivery Date</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="text-center">
              <td className="p-2 border">{order._id}</td>
              <td className="p-2 border">{order.user}</td>
              <td className="p-2 border">₹ {order.totalPrice}</td>

              {/* Edit Paid */}
              <td className="p-2 border">
                {editingOrder === order._id ? (
                  <select
                    name="isPaid"
                    value={formData.isPaid}
                    onChange={handleChange}
                    className="border p-1 rounded"
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                ) : order.isPaid ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </td>

              {/* Edit Delivered */}
              <td className="p-2 border">
                {editingOrder === order._id ? (
                  <select
                    name="isDelivered"
                    value={formData.isDelivered}
                    onChange={handleChange}
                    className="border p-1 rounded"
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                ) : order.isDelivered ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </td>

              {/* Delivery Date Column */}
              <td className="p-2 border" onChange={handleChange}>
                {order.isDelivered && !order.deliveredAt
                  ? new Date().toLocaleDateString()
                  : ""}
              </td>

              {/* Actions */}
              <td className="p-2 border flex justify-center gap-2">
                {editingOrder === order._id ? (
                  <>
                    <button
                      onClick={() => handleSave(order._id)}
                      className="bg-lime-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingOrder(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(order)}
                      className="bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersScreen;
