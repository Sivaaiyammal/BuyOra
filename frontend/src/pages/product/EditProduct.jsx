import { useState, useEffect } from 'react';
import { Eye, Download, Search, Calendar, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import namer from 'color-namer';

const EditProduct = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, endDate] = dateRange;

  const getColorName = (hex) => {
  if (!hex) return "";
  try {
    const names = namer(hex);
    return names.basic[0]?.name || hex;
  } catch {
    return hex;
  }
};

 const handleDownload = () => {
  const sizeLabels = ["S", "M", "L", "XL", "2XL"];
  const dataToExport = filteredProducts.map(product => {
    // Map sizeStock to an object: { S: 10, M: 5, ... }
    const sizeMap = {};
    if (Array.isArray(product.sizeStock)) {
      product.sizeStock.forEach(s => {
        sizeMap[s.size] = s.stock;
      });
    }

    const colorNames = Array.isArray(product.colors)
      ? product.colors.map(getColorName).join(", ")
      : "";

    return {
      Name: product.name,
      Brand: getBrandName(product.brand),
      Category: getCategoryName(product.category),
      Price: product.price,
      Discount: product.discount,
      Color: Array.isArray(product.colors) ? product.colors.join(", ") : "",
      ...sizeLabels.reduce((acc, size) => {
        acc[size] = sizeMap[size] || "";
        return acc;
      }, {})
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "products.xlsx");
};

const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      alert("Failed to delete product.");
    }
  }
};

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


  const getBrandName = (brandId) => {
    const match = brands.find(b => String(b._id) === String(brandId));
    return match ? match.name : "Unknown";
  };

const getCategoryName = (categoryId) => {
  const match = categories.find(c => String(c._id) === String(categoryId));
  return match ? match.name : "Unknown";
};

const filteredProducts = products.filter(product => {
  const productName = product.name ? product.name.toLowerCase() : "";
  const brandName = getBrandName(product.brand) ? getBrandName(product.brand).toLowerCase() : "";
  const search = searchText.toLowerCase();

  const matchesSearch = !search
    || productName.includes(search)
    || brandName.includes(search);

  if (startDate && endDate && product.createdAt) {
    const created = new Date(product.createdAt);
    const createdDay = new Date(created.getFullYear(), created.getMonth(), created.getDate());
    const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    return (
      matchesSearch &&
      createdDay >= startDay &&
      createdDay <= endDay
    );
  }
  return matchesSearch;
});

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
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50" onClick={() => setShowCalendar(!showCalendar)}>
              <Calendar size={16} />
              <span>
                {startDate && endDate
                  ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                  : "Select Dates"}
              </span>
            </button>
            {showCalendar && (
              <div className="absolute z-50 mt-2">
                <DatePicker
                  selected={startDate}
                  onChange={(update) => setDateRange(update)}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  onClickOutside={() => setShowCalendar(false)}
                  className="bg-white border border-gray-300 rounded-lg shadow-lg p-4"
                />
              </div>
            )}
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700" onClick={handleDownload}>
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
                  <td className="px-6 py-4 whitespace-nowrap align-top">
                    <div className="flex items-center">
                      {Array.isArray(product.sizeStock) && product.sizeStock.length > 0 ? (
                        <table className="text-sm text-gray-500">
                          <tbody>
                            {product.sizeStock.map(s => (
                              <tr key={s.size}>
                                <td className="pr-2">{s.size}</td>
                                <td>:</td>
                                <td className="pl-2">{s.stock}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <span className="text-sm text-gray-500">N/A</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium flex items-center"
                          onClick={e => {
                            e.stopPropagation();
                            handleRowClick(product._id);
                          }}
                        >
                          <Eye size={16} className="mr-1" /> View
                        </button>
                        <button
                          className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-xs font-medium flex items-center"
                          onClick={e => {
                            e.stopPropagation();
                            handleDelete(product._id);
                          }}
                        >
                          <Trash2 size={16} className="mr-1" /> Delete
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
      </div>
    </div>
  )
}

export default EditProduct
