import { useState } from "react"
import { Plus } from "lucide-react"

const InvoiceCreate = () => {
  const [formData, setFormData] = useState({
    senderName: "red",
    senderAddress: "red",
    phoneNumber: "red",
    bankName: "red",
    accountNo: "red",
    ifscCode: "red",
    upiId: "red",
    invoiceNumber: "red",
    issueDate: "red",
    dueDate: "red",
    status: "red",
    products: [
      {
        name: "PLATFORM EARNINGS",
        description: "TOTAL AMOUNT EARNED FROM SALES",
        amount: "₹20,000"
      },
      {
        name: "SELLER COMMISSION",
        description: "10% COMMISSION ON EARNINGS.",
        amount: "₹2,000"
      },
      {
        name: "TAX (18% GST)",
        description: "18% GST ON THE EARNINGS AND COMMISSION.",
        amount: "₹3,600"
      },
      {
        name: "TOTAL PAYABLE",
        description: "FINAL AMOUNT TO BE PAID TO THE SELLER",
        amount: "₹25,600"
      }
    ]
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log("Invoice data:", formData)
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Invoice Details</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sender Name
                </label>
                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Number
                </label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sender Full Address
                </label>
                <textarea
                  name="senderAddress"
                  value={formData.senderAddress}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Date
                </label>
                <input
                  type="text"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="text"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account No
                  </label>
                  <input
                    type="text"
                    name="accountNo"
                    value={formData.accountNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-2 gap-6">
                {formData.products.map((product, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-sm font-medium">
                        Product {index + 1}
                      </h3>

                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-gray-500">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.description}
                      </div>
                      <div className="text-sm font-medium">
                        {product.amount}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="mt-2 text-xs text-gray-500"
                    >
                      Add Layer
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <div className="space-x-4">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Show Preview
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default InvoiceCreate
