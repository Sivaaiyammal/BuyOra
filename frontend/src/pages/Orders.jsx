import { useState } from "react"
import {
  ChevronDown,
  Download,
  Search,
  Calendar,
  Eye,
  Edit,
  Trash2
} from "lucide-react"
// import Card from '../components/common/Card';
import UserAvatar from "../components/common/UserAvatar"

const Orders = () => {
  const [] = useState("all")

  // Sample orders data
  const orders = [
    {
      id: "ORD10001",
      number: "#01",
      customer: {
        name: "raja",
        avatar:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      qty: 2,
      product: "Men Fashion",
      price: "$253.82",
      date: "April 12, 2025",
      status: "New"
    },
    {
      id: "ORD10002",
      number: "#2",
      customer: {
        name: "Alexander",
        avatar:
          "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      qty: 3,
      product: "Electronic",
      price: "$915.26",
      date: "April 12, 2025",
      status: "Cancelled"
    },
    {
      id: "ORD10003",
      number: "#2",
      customer: {
        name: "Wilson",
        avatar:
          "https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      qty: 1,
      product: "Women Fashion",
      price: "$556.24",
      date: "April 12, 2025",
      status: "Processing"
    },
    {
      id: "ORD10004",
      number: "#4",
      customer: {
        name: "karthi",
        avatar:
          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      qty: 3,
      product: "Electronic",
      price: "$675.51",
      date: "April 12, 2025",
      status: "New"
    },
    {
      id: "ORD10005",
      number: "#5",
      customer: {
        name: "mic",
        avatar:
          "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      qty: 4,
      product: "Kid Fashion",
      price: "$910.71",
      date: "April 12, 2025",
      status: "New"
    },
    {
      id: "ORD10006",
      number: "#6",
      customer: {
        name: "reo",
        avatar:
          "https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      qty: 2,
      product: "Women Fashion",
      price: "$897.90",
      date: "Apr 27, 2020",
      status: "New"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <nav className="flex">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ChevronDown className="rotate-90 mr-1" size={16} />
            <span>Back</span>
          </button>
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="search text"
                className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-60"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              <Calendar size={16} />
              <span>Select Dates</span>
            </button>
          </div>
          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Download size={18} />
            </button>
            <select className="pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option>New Orders</option>
              <option>Processing</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product View
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserAvatar imageUrl={order.customer.avatar} size="sm" />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.qty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {order.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "New"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye size={18} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">Showing 1 Of 50 Results</div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium bg-orange-500 text-white rounded">
              1
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              2
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              3
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
