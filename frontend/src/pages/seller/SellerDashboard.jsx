import React from "react"
import { ArrowLeft, Mail, Phone, Edit } from "lucide-react"
import { Button } from "../../components/ui/button"
import EditSellerDialog from "./EditSellerDialog"

const SellerDashboard = () => {
  const products = [
    {
      id: "0001",
      name: "New Samsung Galaxy Watch4",
      variants: "4",
      stock: "10",
      date: "10/04/2025",
      category: "Electronic",
      status: "Published",
      image: "/lovable-uploads/placeholder-product.jpg"
    },
    {
      id: "0002",
      name: "Laptop",
      variants: "",
      stock: "",
      date: "10/04/2025",
      category: "Electronic",
      status: "Published",
      image: "/lovable-uploads/placeholder-product.jpg"
    },
    {
      id: "0003",
      name: "Product Name",
      variants: "",
      stock: "",
      date: "10/04/2025",
      category: "Electronic",
      status: "Pending",
      image: "/lovable-uploads/placeholder-product.jpg"
    },
    {
      id: "0004",
      name: "Product Name",
      variants: "",
      stock: "",
      date: "10/04/2025",
      category: "Fashion",
      status: "Published",
      image: "/lovable-uploads/placeholder-product.jpg"
    },
    {
      id: "0005",
      name: "Product Name",
      variants: "",
      stock: "",
      date: "10/04/2025",
      category: "Fashion",
      status: "Published",
      image: "/lovable-uploads/placeholder-product.jpg"
    }
  ]

  const categoryImages = [
    { name: "Watch", image: "/lovable-uploads/placeholder-category.jpg" },
    { name: "Laptop", image: "/lovable-uploads/placeholder-category.jpg" },
    { name: "Headphones", image: "/lovable-uploads/placeholder-category.jpg" },
    { name: "Gaming", image: "/lovable-uploads/placeholder-category.jpg" },
    { name: "Accessories", image: "/lovable-uploads/placeholder-category.jpg" },
    { name: "Fashion", image: "/lovable-uploads/placeholder-category.jpg" },
    { name: "Pants", image: "/lovable-uploads/placeholder-category.jpg" },
    { name: "Suits", image: "/lovable-uploads/placeholder-category.jpg" },
    { name: "Shoes", image: "/lovable-uploads/placeholder-category.jpg" },
    { name: "Dress", image: "/lovable-uploads/placeholder-category.jpg" },
    { name: "Women", image: "/lovable-uploads/placeholder-category.jpg" },
    { name: "Bags", image: "/lovable-uploads/placeholder-category.jpg" },
    { name: "Model", image: "/lovable-uploads/placeholder-category.jpg" },
    { name: "Accessories", image: "/lovable-uploads/placeholder-category.jpg" },
    { name: "Add More", image: "/lovable-uploads/placeholder-category.jpg" }
  ]

  const handleEdit = productId => {
    console.log("Edit product:", productId)
    // Add edit functionality here
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">
            Seller ID :- SLR1001
          </h1>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-600">ZARA</span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Name :- (Leo)
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>zarafashionworld@dayrep.com</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>812-801-9335</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">www.zarafashion.co</p>

              <div className="mt-3 flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Electrical</div>
                  <div className="w-16 h-2 bg-orange-400 rounded-full mt-1"></div>
                  <div className="text-xs text-gray-500 mt-1">12</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">men Fashion</div>
                  <div className="w-20 h-2 bg-orange-400 rounded-full mt-1"></div>
                  <div className="text-xs text-gray-500 mt-1">32</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">women fashion</div>
                  <div className="w-14 h-2 bg-orange-400 rounded-full mt-1"></div>
                  <div className="text-xs text-gray-500 mt-1">21</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-bold text-gray-900">
                ZARA International
              </h3>
              <EditSellerDialog sellerId="SLR1001" />
            </div>
            <p className="text-sm text-gray-600">(Fashion ,Electrical)</p>

            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-gray-500">Item Stock</div>
                <div className="text-lg font-bold">65</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Sells</div>
                <div className="text-lg font-bold">+5k</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Happy Client</div>
                <div className="text-lg font-bold">10</div>
              </div>
            </div>

            <div className="mt-4 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg p-4 text-white">
              <div className="text-right">
                <div className="text-xs">Accounting Revenue</div>
                <div className="text-sm mb-1">
                  Accounting revenue refers to the income earned by a company
                </div>
                <div className="text-2xl font-bold">₹1,000</div>
                <div className="text-xs">10 Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto mb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  ID
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Product Name & Size
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Adding Date
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Category
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Items Published
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm">{product.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-6 bg-gray-400 rounded"></div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {product.name}
                        </div>
                        {product.variants && (
                          <div className="text-xs text-gray-500">
                            Variants : {product.variants} Stock :{" "}
                            {product.stock}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{product.date}</td>
                  <td className="py-3 px-4 text-sm">{product.category}</td>
                  <td className="py-3 px-4">
                    <Button
                      size="sm"
                      variant={
                        product.status === "Published" ? "default" : "outline"
                      }
                      className={
                        product.status === "Published"
                          ? "bg-gray-600 hover:bg-gray-700"
                          : ""
                      }
                    >
                      {product.status}
                    </Button>
                  </td>
                  <td className="py-3 px-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(product.id)}
                      className="flex items-center space-x-1"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Product Category
          </h3>
          <div className="grid grid-cols-5 gap-4">
            {categoryImages.map((category, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center"
              >
                {category.name === "Add More" ? (
                  <div className="text-center text-gray-500">
                    <div className="w-8 h-8 bg-gray-300 rounded mx-auto mb-1"></div>
                    <div className="text-xs">{category.name}</div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-300 rounded-lg"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerDashboard
