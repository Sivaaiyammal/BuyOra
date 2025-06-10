import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "lucide-react";

const Seller = () => {
  const [selectedView, setSelectedView] = useState("main");
  const [stats, setStats] = useState({ approved: 0, pending: 0, rejected: 0 });
  const [sellers, setSellers] = useState([]);

  // Fetch sellers and stats from the backend
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sellers");
        setSellers(response.data);

        // Calculate stats
        const approved = response.data.filter((seller) => seller.status === "Approved").length;
        const pending = response.data.filter((seller) => seller.status === "Pending").length;
        const rejected = response.data.filter((seller) => seller.status === "Rejected").length;
        setStats({ approved, pending, rejected });
      } catch (err) {
        console.error("Failed to fetch sellers:", err);
      }
    };

    fetchSellers();
  }, []);

  const renderMainView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <Box className="text-green-600" size={24} />
            <span className="text-2xl font-bold text-green-600">{stats.approved}</span>
          </div>
          <h3 className="mt-4 text-lg font-medium text-green-800">Approved</h3>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <Box className="text-yellow-600" size={24} />
            <span className="text-2xl font-bold text-yellow-600">{stats.pending}</span>
          </div>
          <h3 className="mt-4 text-lg font-medium text-yellow-800">Pending</h3>
        </div>
        <div className="bg-red-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <Box className="text-red-600" size={24} />
            <span className="text-2xl font-bold text-red-600">{stats.rejected}</span>
          </div>
          <h3 className="mt-4 text-lg font-medium text-red-800">Rejected</h3>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium">Sellers List ({sellers.length})</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {sellers.map((seller) => (
            <div key={seller.sellerId} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{seller.brandName}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-600">4★</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  {seller.company} ({seller.productCategories})
                </p>
                <p className="text-sm mt-1">Seller ID: {seller.sellerId}</p>
                <a
                  href={`https://${seller.website}`}
                  className="text-sm text-blue-600 hover:underline block mt-1"
                >
                  {seller.website || "N/A"}
                </a>
                <p className="text-sm text-gray-600 mt-1">{seller.email}</p>
                <p className="text-sm mt-1">Name: {seller.sellerName}</p>
                <p className="text-sm font-medium mt-1">{seller.mobileNumber}</p>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{seller.itemStock || "N/A"}</p>
                  <p className="text-xs text-gray-500">Item Stock</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">+{(seller.sells / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-gray-500">Sells</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{seller.happyClient || "N/A"}</p>
                  <p className="text-xs text-gray-500">Happy Client</p>
                </div>
              </div>
              <div className="mt-6 flex space-x-3">
                <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  View profile
                </button>
                <button className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Seller Management</h1>
        </div>
        {selectedView === "main" && renderMainView()}
      </div>
    </div>
  );
};

export default Seller;