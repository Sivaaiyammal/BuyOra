import React from "react"

const ProductChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Product</h3>

      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg width="160" height="160" viewBox="0 0 160 160">
            {/* Blue slice (Kids fashion) - 25% */}
            <path d="M80 80 L80 0 A80 80 0 0 1 160 80 Z" fill="#3b82f6" />

            {/* Green slice (Men fashion) - 25% */}
            <path d="M80 80 L160 80 A80 80 0 0 1 80 160 Z" fill="#10b981" />

            {/* Pink slice (Women fashion) - 15% */}
            <path d="M80 80 L80 160 A80 80 0 0 1 32 128 Z" fill="#ec4899" />

            {/* Yellow slice (Electrical) - 35% */}
            <path d="M80 80 L32 128 A80 80 0 0 1 80 0 Z" fill="#f59e0b" />

            {/* Center white circle with percentage */}
            <circle cx="80" cy="80" r="40" fill="white" />
            <text
              x="80"
              y="85"
              textAnchor="middle"
              fontSize="18"
              fontWeight="bold"
              fill="#374151"
            >
              50%
            </text>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
          <span className="text-sm text-gray-600">electrical</span>
        </div>

        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
          <span className="text-sm text-gray-600">Men fashion</span>
        </div>

        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
          <span className="text-sm text-gray-600">Kids fashion</span>
        </div>

        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-pink-500 mr-2"></span>
          <span className="text-sm text-gray-600">women fashion</span>
        </div>
      </div>
    </div>
  )
}

export default ProductChart
