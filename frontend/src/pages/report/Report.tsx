import { useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Eye, Pencil, Trash2 } from 'lucide-react';

interface CustomerReport {
  id: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  mobileNumber: string;
  createdOn: string;
  lastUpdated: string;
  status: 'Resolved' | 'In Progress' | 'Open';
  subject: string;
}

interface SellerReport {
  id: string;
  seller: {
    name: string;
    email: string;
    avatar?: string;
  };
  mobileNumber: string;
  createdOn: string;
  subject: string;
  category: string;
  status: 'Resolved' | 'In Progress' | 'Open';
}

const Report = () => {
  const [salesData] = useState([
    { name: 'Jan', revenue: 1000, sales: 800 },
    { name: 'Feb', revenue: 1200, sales: 900 },
    { name: 'Mar', revenue: 900, sales: 1000 },
    { name: 'Apr', revenue: 1500, sales: 1200 },
    { name: 'May', revenue: 1300, sales: 1100 },
    { name: 'Jun', revenue: 1400, sales: 1300 },
    { name: 'Jul', revenue: 1600, sales: 1400 },
    { name: 'Aug', revenue: 1800, sales: 1500 },
    { name: 'Sep', revenue: 1700, sales: 1600 },
    { name: 'Oct', revenue: 1900, sales: 1700 },
    { name: 'Nov', revenue: 2000, sales: 1800 },
    { name: 'Dec', revenue: 2200, sales: 1900 }
  ]);

  const customerReports: CustomerReport[] = [
    {
      id: '#1',
      user: {
        name: 'Alexander',
        email: 'Alexan@2020.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
      },
      mobileNumber: '9432342341',
      createdOn: 'Feb 22,2025',
      lastUpdated: '1 Hr Ago',
      status: 'Resolved',
      subject: 'Product damaged on arrival'
    },
    {
      id: '#2',
      user: {
        name: 'Alexander',
        email: 'Alexan@2020.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
      },
      mobileNumber: '9432342341',
      createdOn: 'Feb 22,2025',
      lastUpdated: '8 Hr Ago',
      status: 'In Progress',
      subject: 'Login Issue'
    },
    {
      id: '#3',
      user: {
        name: 'Alexander',
        email: 'Alexan@2020.com'
      },
      mobileNumber: '--------',
      createdOn: 'Feb 22,2025',
      lastUpdated: '5 Hr Ago',
      status: 'Open',
      subject: 'Refund not received'
    }
  ];

  const sellerReports: SellerReport[] = [
    {
      id: '#1',
      seller: {
        name: 'Vega Traders',
        email: 'Vega Traders@2020.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
      },
      mobileNumber: '9432342341',
      createdOn: 'Feb 22,2025',
      subject: 'Payment not received',
      category: 'Payment',
      status: 'Resolved'
    },
    {
      id: '#2',
      seller: {
        name: 'Royal Wear',
        email: 'Royal Wear@2020.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
      },
      mobileNumber: '9432342341',
      createdOn: 'Feb 22,2025',
      subject: 'Customer returned item',
      category: 'Returns/Refunds',
      status: 'In Progress'
    },
    {
      id: '#3',
      seller: {
        name: 'Alexander',
        email: 'Alexan@2020.com'
      },
      mobileNumber: '--------',
      createdOn: 'Feb 22,2025',
      subject: 'Account login issue',
      category: 'Account Access',
      status: 'Open'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Statistics</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm text-gray-600">Sales</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Sales Progress</h2>
            <button className="text-blue-600">Update</button>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-3xl font-semibold inline-block">75.55%</span>
                <span className="text-xs font-semibold inline-block text-green-600 ml-2">+10%</span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
              <div className="w-3/4 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
            </div>
            <p className="text-sm text-gray-600">
              You succeed earn <span className="font-semibold">₹240</span> today, its higher than yesterday
            </p>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Target</p>
                <p className="font-semibold">₹20k</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="font-semibold">₹16k</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Today</p>
                <p className="font-semibold">₹1.5k</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Customer Report</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Name - Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customerReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{report.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                        {report.user.avatar ? (
                          <img src={report.user.avatar} alt={report.user.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gray-300">
                            {report.user.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{report.user.name}</div>
                        <div className="text-sm text-gray-500">{report.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{report.mobileNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{report.createdOn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{report.lastUpdated}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      report.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      report.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{report.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={18} />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Pencil size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            View More
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Seller Report</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seller Name - Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sellerReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{report.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                        {report.seller.avatar ? (
                          <img src={report.seller.avatar} alt={report.seller.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gray-300">
                            {report.seller.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{report.seller.name}</div>
                        <div className="text-sm text-gray-500">{report.seller.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{report.mobileNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{report.createdOn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{report.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{report.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      report.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      report.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={18} />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Pencil size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;