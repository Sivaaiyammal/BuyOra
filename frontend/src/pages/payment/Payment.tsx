import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

interface Payment {
  paymentId: string;
  shopName: string;
  emailId: string;
  dateTime: string;
  method: string;
  amount: string;
  status: 'Success' | 'Pending' | 'Failed';
  invoice: string;
}

interface Transaction {
  id: string;
  userName: string;
  date: string;
  amount: string;
  paymentMethod: string;
  type: string;
  status: 'Success' | 'Pending' | 'Failed';
}

const Payment = () => {
  const [payments] = useState<Payment[]>([
    {
      paymentId: 'PAY12345678',
      shopName: 'FashionVilla',
      emailId: 'FashionVilla@.com',
      dateTime: 'Feb 12,2025 3:12 pm',
      method: 'UPI',
      amount: '₹1,000',
      status: 'Success',
      invoice: 'view / Resend'
    },
    {
      paymentId: 'PAY87654321',
      shopName: 'GadgetHub',
      emailId: 'rockey@gmail.com',
      dateTime: 'Feb 22,2025 3:12 pm',
      method: 'UPI',
      amount: '₹10,000',
      status: 'Pending',
      invoice: '--'
    },
    {
      paymentId: 'PAY23456789',
      shopName: 'Kid Fashion',
      emailId: 'meena@gmail.com',
      dateTime: 'Feb 23,2025 2:00 pm',
      method: 'UPI',
      amount: '₹80',
      status: 'Failed',
      invoice: 'view / Resend Invoice'
    }
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: 'TXN123456',
      userName: 'Priya',
      date: '2025-05-01',
      amount: '₹1,000',
      paymentMethod: 'UPI',
      type: 'Product Purchase',
      status: 'Success'
    },
    {
      id: 'TXN123457',
      userName: 'Akash Mehta',
      date: '2025-05-01',
      amount: '₹500',
      paymentMethod: 'Net Banking',
      type: 'Wallet Recharge',
      status: 'Pending'
    },
    {
      id: 'TXN123458',
      userName: 'Rohan',
      date: '2025-04-29',
      amount: '₹800',
      paymentMethod: 'UPI',
      type: 'Subscription',
      status: 'Failed'
    }
  ]);

  return (
    <div className="space-y-8 p-6">
      {/* Seller Payments */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              Seller Payments
              <ArrowUpDown size={20} className="text-gray-500" />
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shop Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.paymentId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.paymentId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.shopName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.emailId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.dateTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.method}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        payment.status === 'Success' ? 'bg-green-100 text-green-800' :
                        payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{payment.invoice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      {payment.status === 'Pending' ? 'view / Retry' : 'view / Resend Invoice'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Transactions */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              User Transactions
              <ArrowUpDown size={20} className="text-gray-500" />
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{transaction.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{transaction.userName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{transaction.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{transaction.paymentMethod}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{transaction.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        transaction.status === 'Success' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      view / {transaction.status === 'Pending' ? 'Retry' : 'edit'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;