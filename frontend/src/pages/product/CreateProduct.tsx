import { useState, useEffect } from 'react';
import { Box, Trash2,Pencil } from 'lucide-react';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';
// import { components } from 'react-select';

interface ProductFormData {
  name: string;
  brand: string;
  gender: string;
  weight: string;
  size: string[];
  colors: string[];
  description: string;
  tax: string;
  gstNumber: string;
  price: string;
  discount: string;
  stock: string;
  images: string[];
  category: string;
}

const CreateProduct = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    brand: '',
    gender: '',
    weight: '',
    size: [],
    colors: [],
    description: '',
    tax: '',
    gstNumber: '',
    price: '',
    discount: '',
    stock: '',
    images: [],
    category: ''
  });

  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [updatedImages, setUpdatedImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);

  const sizes = ['S', 'M', 'L', 'XL', '2XL'];
  const colors = ['#FFFFFF', '#FFB4B4', '#B4FFB4', '#FFE4B4', '#B4B4FF', '#B4FFFF', '#000000'];

  useEffect(() => {
    setUpdatedImages(formData.images);
  }, [formData.images]);

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      const formatted = res.data.map((cat: any) => ({
        value: cat._id,
        label: cat.name
      }));
      setCategories(formatted);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  fetchCategories();
}, []);

 const CustomOption = (props: any) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 text-sm"
      >
        <span>{data.label}</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={async (e) => {
              e.stopPropagation();
              const newName = prompt('Edit category name:', data.label);
              if (!newName) return;
              const slug = newName.toLowerCase().replace(/\s+/g, '-');
              try {
                await axios.put(`http://localhost:5000/api/categories/${data.value}`, {
                  name: newName,
                  slug
                });
                setCategories((prev) =>
                  prev.map((cat) =>
                    cat.value === data.value ? { ...cat, label: newName } : cat
                  )
                );
              } catch (err) {
                console.error('Update failed:', err);
              }
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <Pencil size={14} />
          </button>
          <button
            type="button"
            onClick={async (e) => {
              e.stopPropagation();
              if (!window.confirm(`Delete ${data.label}?`)) return;
              try {
                await axios.delete(`http://localhost:5000/api/categories/${data.value}`);
                setCategories((prev) => prev.filter((cat) => cat.value !== data.value));
                if (formData.category === data.value) {
                  setFormData((prev) => ({ ...prev, category: '' }));
                }
              } catch (err) {
                console.error('Delete failed:', err);
              }
            }}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSizeToggle = (size: string) => {
    setFormData(prev => ({
      ...prev,
      size: prev.size.includes(size)
        ? prev.size.filter(s => s !== size)
        : [...prev.size, size]
    }));
  };

  const handleColorToggle = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formDataImg = new FormData();
    formDataImg.append('image', files[0]);

    try {
      const response = await axios.post('http://localhost:5000/api/upload/product-image', formDataImg, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const imageUrl = response.data.imageUrl;
      setFormData(prev => ({ ...prev, images: [...prev.images, imageUrl] }));
      setUpdatedImages(prev => [...prev, imageUrl]);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Image upload failed');
    }
  };

  const handleReplaceImage = async (index: number, file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload/product-image', formData);
      const newImageUrl = response.data.imageUrl;

      const oldImage = updatedImages[index];
      setRemovedImages(prev => [...prev, oldImage]);

      const newImages = [...updatedImages];
      newImages[index] = newImageUrl;
      setUpdatedImages(newImages);
    } catch (err) {
      console.error('Image replacement failed:', err);
      alert('Failed to replace image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      images: updatedImages,
      removedImages
    };

    try {
      const response = await axios.post('http://localhost:5000/api/products/create', payload);
      alert('Product saved successfully!');
      console.log('Server response:', response.data);

      setFormData({
        name: '',
        brand: '',
        gender: '',
        weight: '',
        size: [],
        colors: [],
        description: '',
        tax: '',
        gstNumber: '',
        price: '',
        discount: '',
        stock: '',
        images: [],
        category: ''
      });
      setUpdatedImages([]);
      setRemovedImages([]);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Create Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Product Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight
                  </label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <CreatableSelect
                    isClearable
                    placeholder="Choose or create a category"
                    value={categories.find(cat => cat.value === formData.category) || null}
                    onChange={(selected) => {
                      setFormData(prev => ({
                        ...prev,
                        category: selected ? selected.value : ''
                      }));
                    }}
                    onCreateOption={async (inputValue) => {
                      const slug = inputValue.toLowerCase().replace(/\s+/g, '-');
                      try {
                        const res = await axios.post('http://localhost:5000/api/categories/create', {
                          name: inputValue,
                          slug
                        });
                        const newCat = {
                          value: res.data._id,
                          label: res.data.name
                        };
                        setCategories(prev => [...prev, newCat]);
                        setFormData(prev => ({ ...prev, category: newCat.value }));
                      } catch (err) {
                        console.error('Failed to create category:', err);
                        alert('Failed to create category.');
                      }
                    }}
                    options={categories}
                    components={{ Option: CustomOption }}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                  
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeToggle(size)}
                        className={`px-4 py-2 rounded-lg border ${
                          formData.size.includes(size)
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Colors
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleColorToggle(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          formData.colors.includes(color)
                            ? 'border-blue-500'
                            : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Short Description About The Product"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax
                  </label>
                  <input
                    type="text"
                    name="tax"
                    value={formData.tax}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GST Number
                  </label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Pricing Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount
                  </label>
                  <input
                    type="text"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="text"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Upload Product Images</h3>
                <button type="button" className="text-gray-500">
                  <Trash2 size={20} />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
               <label className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <Box className="text-gray-400" size={32} />
              </label>
                {updatedImages.map((image, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg relative group overflow-hidden">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <label className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs cursor-pointer rounded-lg">
                    Replace
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleReplaceImage(index, e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;