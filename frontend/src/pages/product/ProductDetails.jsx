import { useState } from "react"
import { useParams } from "react-router-dom"

const ProductDetails = () => {
  const { id } = useParams()
  console.log("Product ID:", id)
  const [selectedColor, setSelectedColor] = useState("Blue")
  const [quantities, setQuantities] = useState({})

  const product = {
    id: "#ID5002",
    name: "Elegant Blue Blossom",
    brand: "zara",
    category: "Kids Fashion",
    age: "1-3year",
    weight: "500 G",
    originalPrice: 2499,
    offerPrice: 1800,
    colors: ["Blue", "Red", "Green"],
    sizes: [
      { name: "S", label: "Small", stock: 2 },
      { name: "M", label: "Medium", stock: 5 },
      { name: "L", label: "Large", stock: 3 }
    ],
    images: [
      "https://images.pexels.com/photos/1719641/pexels-photo-1719641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1719641/pexels-photo-1719641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1719641/pexels-photo-1719641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1719641/pexels-photo-1719641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Elegant Blue Blossom Party Dress with Jacket – For Girls",
    careInstructions: ["Gentle Hand Wash Recommended", "Do Not Bleach"],
    discount: {
      text: "Get 10% Instant Discount on select Bank Debit Cards,",
      details: "up to ₹400 on orders of ₹800 and above"
    }
  }

  const handleQuantityChange = (size, value) => {
    setQuantities(prev => ({
      ...prev,
      [size]: Math.max(0, value)
    }))
  }

  const handleRequest = size => {
    console.log(`Requested ${quantities[size]} items of size ${size}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full aspect-square object-cover rounded-lg"
          />
          <div className="grid grid-cols-4 gap-4 mt-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="w-full aspect-square object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              ID: {product.id}
            </h1>
            <h2 className="text-xl font-semibold mt-2">
              Product Name: {product.name}
            </h2>
            <p className="text-lg mt-2">Brand Name: {product.brand}</p>
            <p className="text-gray-600 mt-2">
              {product.category} {product.age}
            </p>
            <p className="text-gray-600">Item Weight: {product.weight}</p>
          </div>

          <div className="mb-6">
            <p className="text-lg text-gray-500 line-through">
              Original Price: ₹{product.originalPrice}
            </p>
            <p className="text-2xl font-bold text-gray-900">
              Offer Price: ₹{product.offerPrice} Only
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Stock Details</h3>
            <div className="flex gap-2 mb-4">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedColor === color
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {product.sizes.map(size => (
                <div
                  key={size.name}
                  className="flex items-center justify-between"
                >
                  <div className="w-24">
                    <p className="font-medium">{size.name}</p>
                    <p className="text-sm text-gray-500">{size.label}</p>
                  </div>
                  <p className="text-sm text-gray-600">{size.stock} In Stock</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          size.name,
                          (quantities[size.name] || 0) - 1
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center border rounded-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantities[size.name] || 0}
                      onChange={e =>
                        handleQuantityChange(
                          size.name,
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-16 text-center border rounded-lg"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          size.name,
                          (quantities[size.name] || 0) + 1
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center border rounded-lg"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRequest(size.name)}
                      className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Discount</h3>
            <p className="text-gray-600">{product.discount.text}</p>
            <p className="text-gray-600">{product.discount.details}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">{product.description}</h3>
            <p className="text-gray-600 mb-2">
              Sky Blue Tailored Jacket, Floral Printed Dress, Comfort Meets
              Style
            </p>
            <p className="text-gray-600 mb-4">
              Perfect For: Special occasions, family celebrations, photo shoots,
              or as a standout gift.
            </p>

            <h4 className="font-medium mb-2">Care Instructions:</h4>
            <ul className="list-disc list-inside text-gray-600">
              {product.careInstructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex space-x-4">
            <button className="flex-1 px-6 py-3 bg-red-100 text-red-800 rounded-lg font-medium">
              Reject
            </button>
            <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium">
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
