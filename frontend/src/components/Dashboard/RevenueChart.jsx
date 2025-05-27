import React from "react"

const RevenueChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Revenue</h3>

      <div className="h-40 flex items-end space-x-4 mt-4 mb-2 px-4">
        <div className="flex-1 h-1/4 bg-gray-200 rounded-t-md"></div>
        <div className="flex-1 h-3/4 bg-gray-200 rounded-t-md"></div>
        <div className="flex-1 h-1/3 bg-gray-200 rounded-t-md"></div>
        <div className="flex-1 h-full bg-teal-400 rounded-t-md relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-gray-800 font-medium text-sm">
            ₹12,500
          </div>
        </div>
        <div className="flex-1 h-1/2 bg-gray-200 rounded-t-md"></div>
        <div className="flex-1 h-2/3 bg-gray-200 rounded-t-md"></div>
      </div>

      <div className="flex justify-between text-xs text-gray-500 px-4">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>June</span>
      </div>
    </div>
  )
}

export default RevenueChart
