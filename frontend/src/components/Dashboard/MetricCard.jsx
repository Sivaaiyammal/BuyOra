import React from "react"

const MetricCard = ({ title, value, bgColor, icon, trend }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-lg p-8 ${bgColor} text-white`}
    >
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <div className="flex items-end justify-between mt-auto">
          <span className="text-4xl font-bold">{value}</span>
          {trend && (
            <div
              className={`flex items-center text-sm ${
                trend.positive ? "text-green-300" : "text-red-300"
              }`}
            >
              <span className="mr-1">{trend.positive ? "↑" : "↓"}</span>
              <span>{trend.value}</span>
            </div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-32 opacity-10">{icon}</div>
      <div className="absolute top-1/2 right-4 w-20 h-20 rounded-full bg-white opacity-10"></div>
      <div className="absolute bottom-2 right-16 w-10 h-10 rounded-full bg-white opacity-10"></div>
    </div>
  )
}

export default MetricCard
