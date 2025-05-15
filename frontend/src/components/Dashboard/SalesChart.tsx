import React from 'react';

const SalesChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">Sales Details</h3>
        
        <div className="relative">
          <select 
            className="appearance-none bg-white border border-gray-200 rounded px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>March 2025</option>
            <option>February 2025</option>
            <option>January 2025</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="h-64 w-full">
        {/* This is a simplified representation of the chart - in a real implementation, you'd use a chart library */}
        <div className="relative h-full w-full">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
            <span>100%</span>
            <span>80%</span>
            <span>60%</span>
            <span>40%</span>
            <span>20%</span>
          </div>
          
          {/* Chart area - this would be replaced with a real chart */}
          <div className="absolute left-10 right-0 top-0 bottom-0">
            <svg viewBox="0 0 1000 400" className="w-full h-full">
              {/* Green line */}
              <path 
                d="M0,200 C100,100 200,300 300,150 C400,50 500,200 600,250 C700,300 800,200 900,100 C950,50 1000,100 1000,150" 
                fill="none" 
                stroke="#4ade80" 
                strokeWidth="3"
              />
              <path 
                d="M0,200 C100,100 200,300 300,150 C400,50 500,200 600,250 C700,300 800,200 900,100 C950,50 1000,100 1000,150" 
                fill="url(#greenGradient)" 
                fillOpacity="0.2" 
                stroke="none"
              />
              
              {/* Blue line */}
              <path 
                d="M0,250 C100,200 200,100 300,200 C400,300 500,250 600,200 C700,150 800,250 900,300 C950,350 1000,300 1000,250" 
                fill="none" 
                stroke="#60a5fa" 
                strokeWidth="3"
              />
              
              {/* Orange line */}
              <path 
                d="M0,300 C100,250 200,200 300,100 C400,150 500,300 600,200 C700,100 800,150 900,250 C950,300 1000,250 1000,200" 
                fill="none" 
                stroke="#f97316" 
                strokeWidth="3"
              />
              
              {/* Pink line */}
              <path 
                d="M0,150 C100,200 200,250 300,300 C400,250 500,100 600,200 C700,350 800,300 900,350 C950,380 1000,350 1000,300" 
                fill="none" 
                stroke="#ec4899" 
                strokeWidth="3"
              />
              
              {/* Gradients for fill */}
              <defs>
                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4ade80" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* X-axis labels */}
          <div className="absolute left-10 right-0 bottom-0 flex justify-between text-xs text-gray-500">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;