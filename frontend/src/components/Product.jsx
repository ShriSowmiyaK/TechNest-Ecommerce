import { Link } from "react-router-dom";

const Product = ({ item }) => {
  
  return (
  <Link to={`/product/${item._id}`} className="flex gap-4 items-center w-[470px] rounded-lg bg-gray-100 hover:bg-gray-200">
      {/* Left side  */}
         <div>
          <img
            className="w-64 h-52 object-cover"
            src={item.image}
            alt={item.name}
          />
        </div>

        {/* Right side */}
        <div className="w-3/6">
            <p className="font-bold text-left text-lg underline">{item.name}</p>
            <p className="font-bold text-left text-base p-2"> ₹ {item.price}</p>
            <p className="text-left text-base text-green-700">Rating: {item.rating} ⭐ ({item.numReviews} reviews)</p>
            <p className="text-left text-base">Stock: {item.countInStock > 0 ? item.countInStock : "Out of Stock"}</p>
        </div>        
  </Link>
  );
};

export default Product;