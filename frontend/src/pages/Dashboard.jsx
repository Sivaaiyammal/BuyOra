import React from "react"
import {
  Truck,
  ShoppingCart,
  Wallet2,
  ArrowUpRight
} from "lucide-react"
import MetricCard from "../components/Dashboard/MetricCard"
import SalesChart from "../components/Dashboard/SalesChart"
import CustomerStats from "../components/Dashboard/CustomerStats"
import SellerStats from "../components/Dashboard/SellerStats"
import ProductChart from "../components/Dashboard/ProductChart"
import RevenueChart from "../components/Dashboard/RevenueChart"
import WalletCard from "../components/Dashboard/Wallet"
import TopProducts from "../components/Dashboard/TopProducts"
import Comments from "../components/Dashboard/Comments"
import "./dashboard.css"

// Helper Wrapper to DRY up the grid logic
const MetricCardWrapper = ({ colSpan, title, value, icon, color, trend }) => {
  const bgMap = {
    blue: "bg-gradient-to-br from-blue-500 to-blue-600",
    purple: "bg-gradient-to-br from-purple-500 to-purple-600",
    green: "bg-gradient-to-br from-green-500 to-green-600",
    pink: "bg-gradient-to-br from-pink-400 to-pink-500",
    red: "bg-gradient-to-br from-red-400 to-red-500",
    orange: "bg-gradient-to-br from-orange-400 to-orange-500"
  }

  return (
    <div className={`sm:col-span-1 ${colSpan}`}>
      <MetricCard
        title={title}
        value={value}
        bgColor={bgMap[color]}
        icon={React.cloneElement(icon, { className: "h-full w-full text-white" })}
        trend={trend}
      />
    </div>
  )
}

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {/* Row 1 - Metrics */}
      <MetricCardWrapper
        colSpan="xl:col-span-2"
        title="Orders Shipped"
        value="60"
        icon={<Truck />}
        color="blue"
      />
      <MetricCardWrapper
        colSpan="xl:col-span-2"
        title="New orders"
        value="50"
        icon={<ShoppingCart />}
        color="purple"
      />
      <MetricCardWrapper
        colSpan="xl:col-span-2"
        title="Earnings"
        value="₹22k"
        icon={<Wallet2 />}
        color="green"
        trend={{ value: "+25%", positive: true }}
      />

      {/* Sales Chart - Full Width */}
      <div className="col-span-full">
        <SalesChart />
      </div>

      {/* Row 2 - Orders/Payments */}
      <MetricCardWrapper
        colSpan="xl:col-span-2"
        title="Pending orders"
        value="19"
        icon={<ShoppingCart />}
        color="pink"
      />
      <MetricCardWrapper
        colSpan="xl:col-span-2"
        title="Pending Payment"
        value="120"
        icon={<Wallet2 />}
        color="red"
      />
      <MetricCardWrapper
        colSpan="xl:col-span-2"
        title="Orders Re-tend"
        value="17"
        icon={<ArrowUpRight />}
        color="orange"
      />

      {/* Stats & Charts */}
      <div className="col-span-full xl:col-span-3">
        <CustomerStats />
      </div>
      <div className="col-span-full xl:col-span-3">
        <ProductChart />
      </div>
      <div className="col-span-full xl:col-span-3">
        <SellerStats />
      </div>
      <div className="col-span-full xl:col-span-3">
        <RevenueChart />
      </div>
      <div className="col-span-full xl:col-span-3">
        <WalletCard />
      </div>
      <div className="col-span-full xl:col-span-3">
        <TopProducts />
      </div>

      {/* Comments Section */}
      <div className="col-span-full">
        <Comments />
      </div>
    </div>
  )
}

export default Dashboard
