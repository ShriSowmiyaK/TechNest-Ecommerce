import { Link } from "react-router-dom";
import Product from "../components/Product";
import { useSelector } from "react-redux";

const CartScreen = () => {
  const cartState = useSelector((store) => store.cart);
  const products = cartState.items;
  const itemCount = cartState.itemCount;
  const totalItems = cartState.count;
  const totalCost = cartState.cost;

  return (
    <div className="flex flex-col md:flex-row py-5 gap-6 px-6">
      
      {/* Left: Cart Items */}
      <div className="flex flex-col gap-4 flex-1">
        {products.length === 0 ? (
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
        ) : (
          products.map((product) => (
            <div key={product._id}>
              <Product item={product} />
              <p className="text-sm text-gray-500 mt-1">
                Quantity: {itemCount[product._id] || 1}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Right: Summary */}
      <div className="w-full md:w-1/3 bg-white shadow-md rounded-2xl p-6 h-fit">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">
          Order Summary
        </h2>

        <div className="flex justify-between mb-3">
          <span className="text-gray-700">Total Items</span>
          <span className="font-medium">{totalItems}</span>
        </div>

        <div className="space-y-2 mb-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex justify-between text-sm text-gray-600"
            >
              <span>{product.name}</span>
              <span>x {itemCount[product._id] || 1}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-lg font-semibold border-t pt-3">
          <span>Total Cost</span>
          <span>₹{totalCost}</span>
        </div>

        <Link to="/checkout" className="mt-5 w-full bg-fuchsia-800 hover:bg-fuchsia-950 text-white py-2 rounded-xl shadow text-center block">
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartScreen;
