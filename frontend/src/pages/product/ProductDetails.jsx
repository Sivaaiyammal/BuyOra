import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { HexColorPicker } from "react-colorful";
import { Plus, Trash } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [activeColor, setActiveColor] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColor, setCustomColor] = useState("#000000");

  useEffect(() => {
    // Fetch brands and categories
    const fetchData = async () => {
      const [brandRes, catRes] = await Promise.all([
        axios.get("http://localhost:5000/api/brands"),
        axios.get("http://localhost:5000/api/categories"),
      ]);
      setBrands(brandRes.data);
      setCategories(catRes.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        // console.log("Fetched Product:", response.data); // Log the fetched product
        setProduct(response.data);
        
        if (response.data?.colors?.length > 0) {
          setActiveColor(response.data.colors[0]); 
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    
    fetchProduct();
  }, [id]);

  const getBrandName = (brandId) => {
    const match = brands.find((b) => String(b._id) === String(brandId));
    return match ? match.name : "Unknown";
  };
  const getCategoryName = (catId) => {
    const match = categories.find((c) => String(c._id) === String(catId));
    return match ? match.name : "Unknown";
  };

  const handleEdit = () => {
    if (isEditing) {
      console.log("Saving changes:", product);
      setShowColorPicker(false);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setProduct({ ...product, [field]: value });
  };

  const handleStockChange = (sizeName, newStock) => {
    const newSizes = product?.sizeStock?.map(size =>
      size.size === sizeName ? { ...size, stock: newStock } : size
    );
    setProduct({
      ...product,
      sizeStock: newSizes
    });
  };

  const addCustomColor = () => {
    if (product?.colors && !product.colors.includes(customColor)) {
      const newColors = [...product.colors, customColor];
      setProduct({
        ...product,
        colors: newColors
      });
      setActiveColor(customColor);
    }
    setShowColorPicker(false);
  };

  const removeColor = (color) => {
    const updatedColors = product?.colors?.filter(c => c !== color);
    setProduct({
      ...product,
      colors: updatedColors
    });
  };

  const removeSize = (size) => {
    const updatedSizes = product?.sizeStock?.filter(s => s.size !== size);
    setProduct({
      ...product,
      sizeStock: updatedSizes
    });
  };

  if (!product) return <div>Loading...</div>; // Handle loading state

  // Safely access colors and sizeStock, provide fallback empty arrays
  const colors = product?.colors || [];
  const sizes = product?.sizeStock || [];

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-square rounded-md overflow-hidden">
            <img
              src={product.images[0]}  // Display first image as the main image
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images?.map((thumb, index) => (
              <div
                key={index}
                className="aspect-square border-2 border-gray-200 rounded-md overflow-hidden"
              >
                <img
                  src={thumb}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <div className="text-gray-600">ID: {product.itemcode}</div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Product Name:</label>
            {isEditing ? (
              <input
                type="text"
                value={product.name}
                onChange={e => handleInputChange("name", e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <h1 className="text-xl md:text-2xl font-bold text-blue-800">{product.name}</h1>
            )}
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Brand Name:</label>
            {isEditing ? (
                <select
                  value={product.brand}
                  onChange={e => handleInputChange("brand", e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Brand</option>
                  {brands.map(brand => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="text-lg">{getBrandName(product.brand)}</div>
              )}
            </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Price:</label>
            {isEditing ? (
              <input
                type="number"
                value={product.price}
                onChange={e => handleInputChange("price", e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="text-lg">${product.price}</div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Category:</label>
              {isEditing ? (
                <select
                  value={product.category}
                  onChange={e => handleInputChange("category", e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="text-gray-700">{getCategoryName(product.category)}</div>
              )}
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Item Weight:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={product.weight}
                  onChange={e => handleInputChange("weight", e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="text-gray-700">{product.weight}g</div>
              )}
            </div>
          </div>

          {/* Stock Details */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Stock Details</h3>

            <div className="mb-6">
              <label className="block text-gray-600 text-sm mb-2">Colors:</label>
              <div className="flex flex-wrap gap-3 mb-4">
                {isEditing ? (
                  <>
                    {colors.length > 0 ? (
                      colors.map(color => (
                        <span key={color} className="color-badge-wrapper">
                          <button
                            type="button"
                            className={`color-badge-circle${activeColor === color ? " active" : ""}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setActiveColor(color)}
                          />
                          <button
                            type="button"
                            className="color-badge-x"
                            aria-label="Remove color"
                            onClick={() => removeColor(color)}
                          >
                            ×
                          </button>
                        </span>
                      ))
                    ) : (
                      <div>No colors available</div>
                    )}
                 <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="color-badge-circle bg-gray-500 text-white flex items-center justify-center text-2xl font-bold"
                    aria-label="Add color"
                  >
                    +
                </button>
                  </>
                ) : (
                  <div className="flex gap-2">
                    {colors.length > 0 ? (
                      colors.map(color => (
                        <div
                          key={color}
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))
                    ) : (
                      <div>No colors available</div>
                    )}
                  </div>
                )}
              </div>

              {isEditing && showColorPicker && (
                <div className="mb-4">
                  <HexColorPicker color={customColor} onChange={setCustomColor} />
                  <button
                    onClick={addCustomColor}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add Color
                  </button>
                </div>
              )}
            </div>

            {/* Sizes */}
            <div className="space-y-4">
              {sizes.map(sizeData => (
              <div key={sizeData.size} className="grid grid-cols-3 md:grid-cols-4 items-center gap-4">
                <div>
                  <div className="font-medium">{sizeData.size}</div>
                </div>

              <div>
                {isEditing ? (
                  <input
                    type="number"
                    value={sizeData?.stock || 0}
                    onChange={e => handleStockChange(sizeData.size, parseInt(e.target.value))}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div>{sizeData?.stock || 0} In Stock</div>
                )}
              </div>
              <div>
                <button
                  onClick={() => removeSize(sizeData.size)}
                  className="text-red-600 hover:underline"
                >
                  <Trash size={12} />
                </button>
              </div>
            </div>
          ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">{product.name} Party Dress with Jacket – For Girls</h2>

          <div className="space-y-4">
            {isEditing ? (
              <textarea
                value={product?.description || "No description available"} // Provide fallback text
                onChange={e => handleInputChange("description", e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            ) : (
              <p className="text-gray-700">{product?.description || "No description available"}</p>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-green-600 font-medium flex items-center mb-4">
            <span className="mr-2">•</span> Care Instructions:
          </h3>
          <div className="space-y-2">
            {product?.careInstructions?.map((instruction, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={instruction}
                      onChange={e => {
                        const newInstructions = [
                          ...product.careInstructions
                        ];
                        newInstructions[index] = e.target.value;
                        setProduct({
                          ...product,
                          careInstructions: newInstructions
                        });
                      }}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter care instruction"
                    />
                  ) : (
                    <div className="text-gray-700">• {instruction}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Discount:</h3>
          <div className="text-gray-700">
            {isEditing ? (
              <input
                type="text"
                value={product?.discount?.text || ''} // Provide fallback for undefined discount text
                onChange={e => {
                  setProduct({
                    ...product,
                    discount: {
                      ...product.discount,
                      text: e.target.value
                    }
                  });
                }}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p>{product?.discount?.text || "No discount available"}</p> // Provide fallback for undefined discount text
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          {!isEditing ? (
            <button
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
               onClick={() => setIsEditing(false)}
            >
              Close
            </button>
          )}
          <button
            onClick={handleEdit}
            className={`px-6 py-2 rounded-md transition-colors ${
              isEditing
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isEditing ? "Save Changes" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
}
