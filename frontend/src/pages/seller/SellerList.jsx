import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft} from "lucide-react"
import { useNavigate } from "react-router-dom";

const SellerList = () => {
  const [sellers, setSellers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();

  // Fetch sellers from the backend
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sellers");
        setSellers(response.data);
      } catch (err) {
        console.error("Failed to fetch sellers:", err);
      }
    };

    fetchSellers();
  }, []);

  // Format date to "10 June 2025"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const monthName = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${monthName} ${year}`;
  };

  // Filter sellers based on search text and status
  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch = seller.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus ? seller.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const exportReport = () => {
  const headers = [
    "Seller ID",
    "Seller Name",
    "Brand Name",
    "E-mail ID",
    "Mobile Number",
    "Identity Verification",
    "GST Number",
    "Website",
    "Address",
    "Pin Code",
    "Bank Name",
    "Account Number",
    "IFSC Code",
    "Product Categories",
    "Status",
    "Created Date",
  ];

  const rows = filteredSellers.map((seller) => [
    seller.sellerId,
    seller.sellerName,
    seller.brandName,
    seller.email,
    seller.mobileNumber,
    seller.identityVerification,
    seller.gstNumber,
    seller.website || "N/A", // Handle empty fields
    seller.address,
    seller.pinCode,
    seller.bankName,
    seller.accountNumber,
    seller.ifscCode,
    `"${seller.productCategories}"`, // Wrap productCategories in double quotes
    seller.status,
    formatDate(seller.createdAt), // Format date for export
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "seller_report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex justify-between items-center space-x-3 mb-4">
          <div className="flex items-center space-x-3 mb-4 ">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                Seller List
              </h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={exportReport}>
              Export Report
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  E-mail ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aadhaar Card
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GST Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSellers.map((seller, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {seller.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      {seller.email}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      {seller.identityVerification}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      {seller.gstNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        seller.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : seller.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {seller.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(seller.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                    <button>Send message</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerList;