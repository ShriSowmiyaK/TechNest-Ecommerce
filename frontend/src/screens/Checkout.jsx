import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../utils/apiRequest"; 
import { emptyItems } from "../../utils/slices/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userid = useSelector((state) => state.user.id);
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        user: userid,
        orderItems: cart.items.map((item) => ({
          name: item.name,
          qty: cart.itemCount[item._id] || 1,
          image: item.image,
          price: item.price,
          product: item._id,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice: cart.cost,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: cart.cost,
      };

      const data = await apiRequest({
        url: "/api/orders",
        method: "POST",
        data: orderData,
      });

      alert("Order placed successfully!");
      dispatch(emptyItems());
      // console.log(data);
      navigate("/products");
    } catch (err) {
      alert("Error placing order!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Shipping & Payment</h2>

      <input
        type="text"
        name="address"
        value={shippingAddress.address}
        onChange={handleChange}
        placeholder="Address"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="city"
        value={shippingAddress.city}
        onChange={handleChange}
        placeholder="City"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="postalCode"
        value={shippingAddress.postalCode}
        onChange={handleChange}
        placeholder="Postal Code"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="country"
        value={shippingAddress.country}
        onChange={handleChange}
        placeholder="Country"
        className="w-full border p-2 rounded"
        required
      />

      <div>
        <label className="block mb-2 font-medium">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="PayPal">PayPal</option>
          <option value="Stripe">Stripe</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-fuchsia-800 hover:bg-fuchsia-950 text-white py-2 rounded-xl shadow"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
};

export default Checkout;
