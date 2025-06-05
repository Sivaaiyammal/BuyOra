import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, Star } from "lucide-react";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2800]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const BASE_URL = "http://localhost:5000";


  // Fetch categories and brands on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      const [catRes, brandRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/categories`),
        axios.get(`${BASE_URL}/api/brands`)
      ]);
      setCategories(catRes.data);
      setBrands(brandRes.data);
      if (catRes.data.length > 0) {
        setSelectedCategory(catRes.data[0].name);
      }
    };
    fetchInitialData();
  }, []);

  // Fetch products when category changes
useEffect(() => {
  const fetchInitialData = async () => {
    try {
      const [catRes, brandRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/categories`),
        axios.get(`${BASE_URL}/api/brands`)
      ]);

      console.log("Fetched Categories:", catRes.data);
      console.log("Fetched Brands:", brandRes.data);

      // Safely set data
      if (Array.isArray(catRes.data)) {
        setCategories(catRes.data);
        if (catRes.data.length > 0) {
          setSelectedCategory(catRes.data[0].name);
        }
      }

      if (Array.isArray(brandRes.data)) {
        setBrands(brandRes.data);
      }
    } catch (error) {
      console.error("Error fetching categories/brands:", error);
    }
  };
  fetchInitialData();
}, []);

useEffect(() => {
  const fetchProducts = async () => {
    try {
          let url = `${BASE_URL}/api/products/filter?categoryName=${encodeURIComponent(selectedCategory)}`;
      if (selectedBrands.length > 0) {
        const brandQuery = selectedBrands.map(encodeURIComponent).join(',');
        url += `&brandNames=${brandQuery}`;
      }
        url += `&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;

      const res = await axios.get(url);
      setProducts(res.data);
    } catch (error) {
      console.error("Product fetch error:", error.response?.data || error.message);
    }
  };

  fetchProducts();
}, [selectedCategory, selectedBrands, priceRange]);

const handlePriceChange = (e) => {
  const value = parseInt(e.target.value);
  setPriceRange([0, value]);
};

const toggleBrand = (brandName) => {
  setSelectedBrands((prev) =>
    prev.includes(brandName)
      ? prev.filter((b) => b !== brandName)
      : [...prev, brandName]
  );
};

const getBrandName = (brandId) => {
  const match = brands.find((b) => String(b._id) === String(brandId));
  return match ? match.name : "Unknown";
};

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 border-r border-gray-200 min-h-screen">
        <div className="mb-6">
          <button className="flex items-center text-blue-600 mb-4">
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <h2 className="text-lg font-medium mb-2">Category</h2>
          <div className="space-y-2">
            {categories.map(cat => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`w-full text-left px-3 py-2 rounded-lg ${
                  selectedCategory === cat.name
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Price Range</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={priceRange[0]}
                className="w-20 px-2 py-1 border rounded"
                readOnly
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange[1]}
                className="w-20 px-2 py-1 border rounded"
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setPriceRange([priceRange[0], value]);
                }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="2800"
              value={priceRange[1]}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setPriceRange([priceRange[0], value]);}}
              className="w-full"
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Brand ({brands.length})</h2>
            <div className="space-y-2">
              {brands.map((brand) => (
                <label key={brand._id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.name)}
                    onChange={() => toggleBrand(brand.name)}
                  />
                  <span>{brand.name}</span>
                </label>
              ))}
            </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Rating</h2>
          <div className="space-y-2">
            {[2, 3, 4, 5].map(rating => (
              <button
                key={rating}
                onClick={() => setSelectedRating(rating)}
                className={`flex items-center space-x-1 ${
                  selectedRating === rating
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              >
                <span>{rating}</span>
                <Star size={16} fill="currentColor" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div
              key={product._id}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">
                    {getBrandName(product.brand)}
                </p>
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">
                    Price: ₹{product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
