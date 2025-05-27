import { useState } from "react"
import { Box, Users, List } from "lucide-react"

const Seller = () => {
  const [selectedView, setSelectedView] = useState("main")

  const stats = {
    approved: 8,
    pending: 12,
    rejected: 7
  }

  const sellers = [
    {
      id: "SLR1001",
      name: "Leo",
      company: "ZARA International",
      category: "Fashion,electronic",
      website: "www.zarafashion.co",
      email: "zarafashionworld@dayrep.com",
      contact: "812-801-9335",
      itemStock: 265,
      sells: 5000,
      happyClient: 99
    }
  ]

  const renderMainView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <Box className="text-green-600" size={24} />
            <span className="text-2xl font-bold text-green-600">
              {stats.approved}
            </span>
          </div>
          <h3 className="mt-4 text-lg font-medium text-green-800">Approved</h3>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <Box className="text-yellow-600" size={24} />
            <span className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </span>
          </div>
          <h3 className="mt-4 text-lg font-medium text-yellow-800">Pending</h3>
        </div>
        <div className="bg-red-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <Box className="text-red-600" size={24} />
            <span className="text-2xl font-bold text-red-600">
              {stats.rejected}
            </span>
          </div>
          <h3 className="mt-4 text-lg font-medium text-red-800">Reject</h3>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium">Sellers List (1)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {sellers.map(seller => (
            <div
              key={seller.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">ZARA</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-600">4★</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  {seller.company} ({seller.category})
                </p>
                <p className="text-sm mt-1">Seller ID:- {seller.id}</p>
                <a
                  href={`https://${seller.website}`}
                  className="text-sm text-blue-600 hover:underline block mt-1"
                >
                  {seller.website}
                </a>
                <p className="text-sm text-gray-600 mt-1">{seller.email}</p>
                <p className="text-sm mt-1">Name:- ({seller.name})</p>
                <p className="text-sm font-medium mt-1">{seller.contact}</p>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{seller.itemStock}</p>
                  <p className="text-xs text-gray-500">Item Stock</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    +{(seller.sells / 1000).toFixed(1)}k
                  </p>
                  <p className="text-xs text-gray-500">Sells</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{seller.happyClient}</p>
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
  )

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Seller Management
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedView("main")}
              className={`inline-flex items-center px-4 py-2 rounded-lg ${
                selectedView === "main"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Users className="mr-2" size={20} />
              Sellers
            </button>
            <button
              onClick={() => setSelectedView("create")}
              className={`inline-flex items-center px-4 py-2 rounded-lg ${
                selectedView === "create"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Box className="mr-2" size={20} />
              Create
            </button>
            <button
              onClick={() => setSelectedView("list")}
              className={`inline-flex items-center px-4 py-2 rounded-lg ${
                selectedView === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <List className="mr-2" size={20} />
              Seller List
            </button>
          </div>
        </div>

        {selectedView === "main" && renderMainView()}
        {selectedView === "create" && <SellerCreate />}
        {selectedView === "list" && <SellerList />}
      </div>
    </div>
  )
}

const SellerCreate = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium mb-6">Add Seller (Basic Details)</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seller ID
              </label>
              <input
                type="text"
                value="SLR 1001"
                disabled
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seller Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-Mail ID
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Identity Verification
              </label>
              <input
                type="text"
                placeholder="Government ID (Aadhaar, PAN, Passport.)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GST Number
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pin Code
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Box className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Drop Your Images Here, Or Click To Browse</span>
                    <input type="file" className="sr-only" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Categories
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Choose A Categories</option>
            </select>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IFSC Code
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Documents Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Identity Proof
                </p>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Upload
                </button>
                <button className="mt-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 w-full">
                  View
                </button>
              </div>
              <div className="text-center">
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Address Proof
                </p>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Upload
                </button>
                <button className="mt-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 w-full">
                  View
                </button>
              </div>
              <div className="text-center">
                <p className="mb-2 text-sm font-medium text-gray-700">
                  GST Or Business Doc
                </p>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Upload
                </button>
                <button className="mt-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 w-full">
                  View
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const SellerList = () => {
  const sellers = [
    {
      name: "yuvaraj",
      email: "Validated",
      aadhaar: "View file",
      gst: "View file",
      status: "Approved",
      date: "1/2/2025"
    },
    {
      name: "Robert",
      email: "Validated",
      aadhaar: "View file",
      gst: "View file",
      status: "Approved",
      date: "12/1/2025"
    },
    {
      name: "Alexander",
      email: "Validated",
      aadhaar: "View file",
      gst: "View file",
      status: "Approved",
      date: "4/4/2025"
    },
    {
      name: "Jon",
      email: "Validated",
      aadhaar: "View file",
      gst: "View file",
      status: "Approved",
      date: "9/2/2024"
    },
    {
      name: "reo",
      email: "Validated",
      aadhaar: "View file",
      gst: "View file",
      status: "Approved",
      date: "5/2/2025"
    },
    {
      name: "max",
      email: "Validated",
      aadhaar: "View file",
      gst: "View file",
      status: "Approved",
      date: "7/2/2025"
    },
    {
      name: "raj kumar",
      email: "Validated",
      aadhaar: "View file",
      gst: "View file",
      status: "Approved",
      date: "5/3/2025"
    },
    {
      name: "krish",
      email: "Validated",
      aadhaar: "View file",
      gst: "View file",
      status: "Approved",
      date: "8/3/25"
    },
    {
      name: "Ronald",
      email: "Validated",
      aadhaar: "View file",
      gst: "View file",
      status: "Approved",
      date: "7/2/2025"
    },
    {
      name: "Elean",
      email: "Validated",
      aadhaar: "View file",
      gst: "View file",
      status: "Approved",
      date: "8/2/2025"
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Seller List (10)</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="search text"
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Approved</option>
              <option>Pending</option>
              <option>Reject</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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
              {sellers.map((seller, index) => (
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
                      {seller.aadhaar}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      {seller.gst}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {seller.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {seller.date}
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
  )
}

export default Seller
