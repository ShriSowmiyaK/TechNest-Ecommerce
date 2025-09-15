import apiRequest from "../../utils/apiRequest";
import ErrorDialogbox from "../components/ErrorDialogbox";
import { useState, useEffect, useCallback } from "react";
import Product from "../components/Product";

const ProductsScreen = ()=>{

    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [find,setFind] = useState("");
    const [totalPages,setTotpages] = useState(1);
    const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    rating: "",
    countInStock: false,
    });

    //to clear filters
    const clearFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      rating: "",
      countInStock: false,
    });
    setFind("");
    setPage(1);
    // fetchProducts();
    };

    //fetch products
    const fetchProducts = async () => {
      // console.log(filters);
    let query = [];
    if (filters.minPrice) query.push(`price[gte]=${filters.minPrice}`);
    if (filters.maxPrice) query.push(`price[lte]=${filters.maxPrice}`);
    if (filters.rating) query.push(`rating[gte]=${filters.rating}`);
    if (filters.countInStock) query.push(`countInStock[gt]=0`);
    query.push(`page=${page}`);
    query.push(`find=${find}`);    
    const queryString = query.length ? "?" + query.join("&") : "";
    try {
      const res = await apiRequest({
        url: `/api/products${queryString}`,
        method: "GET",
      });
      setTotpages(Math.ceil(res.totalDocs/4));        
    
      const newProducts = res.data.docs;
      setProducts(newProducts);
    }
    catch (err) {
      setError(err.message);
    }
  };

  //debounce function for the filters  
  useEffect(()=>{
    let handler = setTimeout(()=>{
      fetchProducts();
    },3000);
    return ()=>{
      clearTimeout(handler);
    }
  },[filters,find]);

  //initial products fetch
  useEffect(()=>{
    fetchProducts();
  },[page]);


return (
    <div className="p-5">
      {/* Filter Section */}
        <div className="flex flex-wrap gap-4 mb-6 bg-gray-100 p-4 rounded-lg shadow">
                <input
                type="text"
                placeholder="Search Product"
                value={find}
                onChange={(e) =>{
                  setFind(e.target.value);
                }
                }
                className="border p-2 rounded"
                />
                <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) =>{
                    setFilters({...filters,minPrice:e.target.value});
                }
                }
                className="border p-2 rounded"
                />
                <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) =>{
                    setFilters({...filters,maxPrice:e.target.value});
                }
                }
                className="border p-2 rounded"
                />
                <select
                value={filters.rating}
                onChange={(e) =>{
                    setFilters({...filters,rating:e.target.value});
                }
                }
                className="border p-2 rounded"
                >
                <option value="">Customer Rating</option>
                <option value="1">⭐ 1+</option>
                <option value="2">⭐ 2+</option>
                <option value="3">⭐ 3+</option>
                <option value="4">⭐ 4+</option>
                <option value="5">⭐ 5</option>
                </select>
                <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={filters.countInStock}
                    onChange={(e) =>{
                        setFilters({...filters,countInStock:e.target.checked});
                    }
                    }
                />
                In Stock Only
                </label>
                <button
                onClick={() => {clearFilters();
                }}
                className="p-2 bg-fuchsia-800 hover:bg-fuchsia-950 text-white rounded-xl shadow"
                >
                Clear Filters
                </button>
        </div>

      {/* Products List */}
        <div className="flex px-8 flex-wrap py-5 gap-4 justify-center">
            {error && <ErrorDialogbox setError={setError} message={error} />}
            {products.map((product) => (
            <div key={product._id}>
                <Product item={product} />
            </div>
            ))}
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({length:totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 rounded ${
                page === num
                  ? "bg-fuchsia-800 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
    </div> 
    

  );
};

export default ProductsScreen;
