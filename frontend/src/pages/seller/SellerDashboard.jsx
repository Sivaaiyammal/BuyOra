import React from "react"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Mail, Phone, Edit } from "lucide-react"
import { Button } from "../../components/ui/button"
import EditSellerDialog from "./EditSellerDialog"

const SellerDashboard = () => {
  const { id } = useParams();
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
  const fetchSeller = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/sellers/${id}`);
      setSeller(res.data);
    } catch (error) {
      console.error("Failed to fetch seller data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchSeller();
}, [id]);

if (loading) {
  return <div className="p-8">Loading seller information...</div>;
}

if (!seller) {
  return <div className="p-8 text-red-600">Seller not found</div>;
}

const handleStatusChange = async (newStatus, reason = "") => {
  try {
    await axios.put(`http://localhost:5000/api/sellers/${seller.sellerId}/status`, {
      status: newStatus,
      reason
    });

    setSeller((prev) => ({ ...prev, status: newStatus }));
    setShowRejectReason(false);
    setRejectionReason("");
  } catch (err) {
    console.error("Failed to update status", err);
  }
};

  const handleEdit = productId => {
    console.log("Edit product:", productId)
    // Add edit functionality here
  }



  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => navigate("/seller")} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900">
            Seller ID :- {seller.sellerId}
          </h2>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-600">ZARA</span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Name :- {seller.sellerName}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{seller.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>{seller.mobileNumber}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{seller.website}</p>

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
                {seller.companyName}
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
          <div className="flex flex-col space-y-2">
  {(seller.status === "Pending" || seller.status === "Rejected") && (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => handleStatusChange("Approved")}
        className="bg-transparent hover:bg-lime-500 text-lime-700 font-semibold hover:text-white py-2 px-4 border border-lime-500 hover:border-transparent rounded"
      >
        Approve
      </button>

      {seller.status === "Pending" ? (
        <>
          <button
            onClick={() => setShowRejectReason(true)}
            className="bg-transparent hover:bg-rose-400 text-rose-500 font-semibold hover:text-white py-2 px-4 border border-rose-400 hover:border-transparent rounded"
          >
            Reject
          </button>
          {showRejectReason && (
            <div className="mt-4 w-full">
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejection"
                className="w-full border border-red-500 rounded p-2 text-sm"
                rows={3}
              />
              <button
                onClick={() => handleStatusChange("Rejected", rejectionReason)}
                className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
              >
                Confirm Reject
              </button>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={() => handleStatusChange("Pending")}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded"
        >
          Set to Pending
        </button>
      )}
    </div>
  )}
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
