import apiRequest from "../../utils/apiRequest";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../utils/slices/cartSlice";
import { useState, useEffect } from "react";
import ErrorDialogbox from "../components/ErrorDialogbox";
import Reviews from "../components/Reviews";

const ProductItem = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const count = useSelector((store) => store.cart.itemCount[product._id] || 0);
  const user = useSelector((store)=>store.user);
  // update in store 
  const handleAdd = () => {
    dispatch(addItem(product));
  };

  const handleRemove = () => {
    dispatch(removeItem(product));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await apiRequest({
          url: `/api/products/${id}`,
          method: "GET",
        });
        setProduct(res.data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          className="w-72 h-72 object-contain rounded-xl shadow-md"
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-gray-500">Brand: <span className="font-medium">{product.brand}</span></p>
        <p className="text-2xl font-semibold text-green-700">₹{product.price}</p>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
        <p className="text-gray-700">Stock: <span className="font-medium">{product.countInStock}</span></p>
        {/* Add/Remove Buttons */}
        {user.role!="admin" && <div className="flex items-center gap-3 mt-6">
          {count > 0 && (
            <div className="h-10 w-12 flex items-center justify-center font-bold text-lg text-gray-800 bg-gray-100 rounded-md">
              {count}
            </div>
          )}

          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition"
            onClick={handleAdd}
          >
            ADD TO CART +
          </button>

          {count > 0 && (
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition"
              onClick={handleRemove}
            >
              REMOVE -
            </button>
          )}
        </div>}

        <Reviews productId={id} initialReviews={product.reviews}/>        

      </div>
      {error && <ErrorDialogbox setError={setError} message={error}/>}
    </div>
  );
};

export default ProductItem;
