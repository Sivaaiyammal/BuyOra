import React from 'react';

const CustomerStats: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Total Customer</h3>
      
      <div className="flex items-center justify-around">
        {/* Mobile Customers */}
        <div className="relative">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="#e0e7ff" />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#4338ca"
              strokeWidth="6"
              strokeDasharray="339.29"
              strokeDashoffset="84.82"
              transform="rotate(-90 60 60)"
            />
            <text x="60" y="65" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#374151">122</text>
          </svg>
          <div className="absolute top-0 left-0 right-0 flex justify-center">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Mobile</span>
          </div>
        </div>
        
        {/* Website Customers */}
        <div className="relative">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="#fef3c7" />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="6"
              strokeDasharray="339.29"
              strokeDashoffset="254.47"
              transform="rotate(-90 60 60)"
            />
            <text x="60" y="65" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#374151">20</text>
          </svg>
          <div className="absolute top-0 left-0 right-0 flex justify-center">
            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Website</span>
          </div>
        </div>
        
        {/* Dashboard Customers */}
        <div className="relative">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="#d1fae5" />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#10b981"
              strokeWidth="6"
              strokeDasharray="339.29"
              strokeDashoffset="305.36"
              transform="rotate(-90 60 60)"
            />
            <text x="60" y="65" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#374151">10</text>
          </svg>
          <div className="absolute top-0 left-0 right-0 flex justify-center">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Dashboard</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerStats;