// import { useState } from 'react';
import { Eye, Download, Search, Calendar } from "lucide-react"
import { useNavigate } from "react-router-dom"

const EditProduct = () => {
  const navigate = useNavigate()
  const products = [
    {
      id: "#ID5030",
      image:
        "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Men's Oxford Shirt",
      brand: "zara",
      category: "Men Fashion",
      size: "M,L,Xl",
      price: 400,
      originalPrice: 1799,
      discount: 77,
      stock: 18,
      status: "Approved"
    },
    {
      id: "#ID5002",
      image:
        "https://images.pexels.com/photos/1719641/pexels-photo-1719641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Elegant Blue Blossom",
      brand: "zara",
      category: "Kids Fashion",
      size: "1-3M",
      price: 1800,
      originalPrice: 2299,
      discount: 60,
      stock: 8,
      status: "Approved"
    },
    {
      id: "#ID5044",
      image:
        "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Fire-Boltt Phoenix Smart Watch",
      brand: "Fire-Boltt",
      category: "Electronics",
      size: "",
      price: 1099,
      originalPrice: 1799,
      discount: 77,
      stock: 5,
      status: "Approved"
    }
  ]

  const handleRowClick = id => {
    const cleanId = id.replace("#", "")
    navigate(`/product/details/${cleanId}`)
  }

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
              {products.map(product => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50"
                  onClick={() => handleRowClick(product.id)}
                >
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
                          <span className="font-medium text-gray-900">
                            {product.brand}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {product.category}
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
                        {product.stock} Item
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
        </div>
      </div>
    </div>
  )
}

export default EditProduct
