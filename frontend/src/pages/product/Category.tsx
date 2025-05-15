import { useState } from 'react';
import { ChevronLeft, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  image: string;
  inStock: number;
}

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState('Men Fashion');
  const [priceRange, setPriceRange] = useState([0, 2800]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const categories = ['Men Fashion', 'Women Fashion', 'kids Fashion', 'Electronics'];
  
  const brands = [
    'Zara',
    'Allen Solly',
    'Roadster',
    'Nike',
    'Adidas',
    'Hermes',
    'EssilorLuxottica'
  ];

  const menProducts: Product[] = [
    {
      id: '1',
      name: 'Casual Dress',
      image: 'https://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      inStock: 18
    },
    {
      id: '2',
      name: 'T-Shirt',
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      inStock: 18
    },
    {
      id: '3',
      name: 'Inner wear',
      image: 'https://images.pexels.com/photos/1661471/pexels-photo-1661471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      inStock: 18
    },
    {
      id: '4',
      name: 'Blazers & Suit',
      image: 'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      inStock: 18
    },
    {
      id: '5',
      name: 'cargo pants',
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      inStock: 18
    },
    {
      id: '6',
      name: 'ethinic wear',
      image: 'https://images.pexels.com/photos/2146344/pexels-photo-2146344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      inStock: 18
    }
  ];

  const womenProducts: Product[] = [
    {
      id: '7',
      name: 'Dress Materials',
      image: 'https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      inStock: 18
    },
    {
      id: '8',
      name: 'floral dress',
      image: 'https://images.pexels.com/photos/1631181/pexels-photo-1631181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      inStock: 18
    },
    {
      id: '9',
      name: 'saress',
      image: 'https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      inStock: 18
    },
    {
      id: '10',
      name: 'Lehenga',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      inStock: 18
    },
    {
      id: '11',
      name: 'webbing saress',
      image: 'https://images.pexels.com/photos/1087735/pexels-photo-1087735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      inStock: 18
    },
    {
      id: '12',
      name: 'chudidhar',
      image: 'https://images.pexels.com/photos/1078958/pexels-photo-1078958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      inStock: 18
    }
  ];

  const products = selectedCategory === 'Men Fashion' ? menProducts : womenProducts;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div className="flex">
      {/* Filters Sidebar */}
      <div className="w-64 bg-white p-4 border-r border-gray-200 min-h-screen">
        <div className="mb-6">
          <button className="flex items-center text-blue-600 mb-4">
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <h2 className="text-lg font-medium mb-2">Category</h2>
          <div className="space-y-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-lg ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {category}
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
                onChange={handlePriceChange}
              />
            </div>
            <input
              type="range"
              min="0"
              max="2800"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full"
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Brand({brands.length})</h2>
          <input
            type="text"
            placeholder="Search Brand"
            className="w-full px-3 py-2 border rounded-lg mb-2"
          />
          <div className="space-y-2">
            {brands.map(brand => (
              <label key={brand} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="rounded"
                />
                <span>{brand}</span>
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
                  selectedRating === rating ? 'text-yellow-500' : 'text-gray-400'
                }`}
              >
                <span>{rating}</span>
                <Star size={16} fill="currentColor" />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Availability</h2>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span>In-stock</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span>New Arrivals</span>
            </label>
          </div>
        </div>

        <div className="flex justify-between">
          <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">
            Rest
          </button>
          <button className="px-4 py-2 text-white bg-blue-600 rounded-lg">
            Save
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">
                    instock - {product.inStock}
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