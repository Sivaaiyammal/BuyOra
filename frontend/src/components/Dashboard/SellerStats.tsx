import React from 'react';
import { ChevronRight, Package, CheckCircle, XCircle } from 'lucide-react';

const SellerStats: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Total Seller</h3>
      
      <div className="flex">
        <div className="flex-1 relative">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="#e0e7ff" />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#10b981"
              strokeWidth="12"
              strokeDasharray="502.65"
              strokeDashoffset="427.25"
              transform="rotate(-90 100 100)"
            />
            <text x="100" y="110" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#374151">44</text>
          </svg>
        </div>
        
        <div className="flex flex-col justify-center space-y-4">
          {/* Pending */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-amber-500" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600">pending</div>
              <div className="text-base font-semibold">8</div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
          
          {/* Approved */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600">Approved</div>
              <div className="text-base font-semibold">12</div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
          
          {/* Reject */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-500" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600">Reject</div>
              <div className="text-base font-semibold">7</div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerStats;