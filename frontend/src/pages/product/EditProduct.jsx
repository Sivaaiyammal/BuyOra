import { useState, useEffect } from 'react';
import { Eye, Download, Search, Calendar } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from 'axios';

const EditProduct = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        if (Array.isArray(res.data)) {
          setProducts(res.data);
          console.log("Fetched products from backend:", res.data);

        } else {
          console.error("Expected array but got:", res.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
  axios.get('http://localhost:5000/api/brands').then(res => setBrands(res.data));
  axios.get('http://localhost:5000/api/categories').then(res => setCategories(res.data));
}, []);
  
  const handleRowClick = (id) => {
    navigate(`/product/details/${id}`);
  };

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchText.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchText.toLowerCase())
  );

  const getBrandName = (brandId) => {
    const match = brands.find(b => String(b._id) === String(brandId));
    return match ? match.name : "Unknown";
  };

const getCategoryName = (categoryId) => {
  const match = categories.find(c => String(c._id) === String(categoryId));
  return match ? match.name : "Unknown";
};

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="search text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Calendar size={16} />
              <span>Select Dates</span>
            </button>
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Download size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Product ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price/Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map(product => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50"
                  onClick={() => handleRowClick(product._id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* {product._id?.slice(-6).toUpperCase()} */}
                    <div className="text-sm text-gray-400">
                      {product.itemcode || 'No Code'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={product.image || product.images?.[0] || 'https://via.placeholder.com/60'}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">
                              {getBrandName(product.brand)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {getCategoryName(product.category)}
                        </div>
                        {product.size && (
                          <div className="text-xs text-gray-400">
                            Size: {product.size}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₹{product.price}
                    </div>
                    <div className="text-xs text-green-600">
                      {product.discount}% Off
                    </div>
                    <div className="text-xs text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500">
                        {Array.isArray(product.sizeStock)
                          ? product.sizeStock.map(s => `${s.size}: ${s.stock}`).join(', ')
                          : 'N/A'}
                      </span>
                      <button className="ml-2 text-gray-400 hover:text-gray-600">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
                        Approved
                      </button>
                      <button className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-xs font-medium">
                        reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {filteredProducts.length} Results
          </div>
        </div>
        {/* <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">Showing 3 Results</div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-orange-500 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              2
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              3
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              →
            </button>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default EditProduct
