import { useState } from 'react';
import { Heart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  size: string;
  stock: number;
  status: 'Approved' | 'reject';
  hotDeal?: boolean;
}

const Product = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Online Shopping",
      subtitle: "Fashion SALE"
    },
    {
      image: "https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Summer Collection",
      subtitle: "New Arrivals"
    },
    {
      image: "https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Special Deals",
      subtitle: "Limited Time"
    }
  ];

  const topSellingProducts: Product[] = [
    {
      id: "XM13T",
      name: "Xiaomi 13T PRO 5G",
      brand: "zara",
      category: "Electronics",
      image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 24599,
      originalPrice: 53200,
      discount: 0,
      size: "L, Xl",
      stock: 10,
      status: "Approved",
      hotDeal: true
    },
    {
      id: "MB001",
      name: "Men's Blazer",
      brand: "zara",
      category: "Men Fashion",
      image: "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 600,
      originalPrice: 1700,
      discount: 77,
      size: "L, Xl",
      stock: 15,
      status: "Approved",
      hotDeal: true
    },
    {
      id: "CFC001",
      name: "Casual Fashion Coat",
      brand: "zara",
      category: "Men Fashion",
      image: "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 800,
      originalPrice: 1899,
      discount: 77,
      size: "M, L, Xl",
      stock: 8,
      status: "Approved",
      hotDeal: true
    }
  ];

  const newArrivals = [
    {
      id: "#ID5030",
      image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Men's Oxford Shirt",
      brand: "zara",
      category: "Men Fashion",
      price: 400,
      originalPrice: 1799,
      discount: 77,
      size: "M,L,Xl",
      stock: 18
    },
    {
      id: "#ID5002",
      image: "https://images.pexels.com/photos/1719641/pexels-photo-1719641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Elegant Blue Blossom",
      brand: "zara",
      category: "Kids Fashion",
      price: 1800,
      originalPrice: 2299,
      discount: 60,
      size: "1-3M",
      stock: 8
    },
    {
      id: "#ID5044",
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Fire-Boltt Phoenix Smart Watch",
      brand: "Fire-Boltt",
      category: "Electronics",
      price: 1099,
      originalPrice: 1799,
      discount: 77,
      size: "",
      stock: 5
    }
  ];

  return (
    <div className="space-y-6">
      {/* Banner Carousel */}
      <div className="relative h-64 rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={banners[currentSlide].image}
            alt={banners[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent">
            <div className="p-8 text-white">
              <h1 className="text-4xl font-bold">{banners[currentSlide].title}</h1>
              <p className="text-2xl mt-2">{banners[currentSlide].subtitle}</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Top Selling Products */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Top 10 Selling Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topSellingProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm">
                  <Heart size={20} className="text-gray-400" />
                </button>
                {product.hotDeal && (
                  <span className="absolute bottom-2 left-2 px-2 py-1 bg-green-500 text-white text-xs rounded">
                    Hot Deal!
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">₹{product.originalPrice}</p>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-gray-500">Size: {product.size}</span>
                  {product.discount > 0 && (
                    <span className="text-green-600">{product.discount}% Off</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      <div>
        <h2 className="text-xl font-semibold mb-4">New Arrival</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price/Discount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {newArrivals.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900">{product.brand}</span>
                          </div>
                          <div className="text-sm text-gray-500">{product.name}</div>
                          <div className="text-xs text-gray-400">{product.category}</div>
                          <div className="text-xs text-gray-400">Size: {product.size}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{product.price}</div>
                      <div className="text-xs text-green-600">{product.discount}% Off</div>
                      <div className="text-xs text-gray-400 line-through">₹{product.originalPrice}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock} Item
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
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
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">Showing 3 Results</p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-orange-500 text-white rounded">1</button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">2</button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">3</button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">→</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
