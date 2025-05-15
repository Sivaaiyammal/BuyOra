import React from 'react';
import { Truck, ShoppingCart, Wallet2, ArrowUpRight } from 'lucide-react';
import MetricCard from '../components/Dashboard/MetricCard';
import SalesChart from '../components/Dashboard/SalesChart';
import CustomerStats from '../components/Dashboard/CustomerStats';
import SellerStats from '../components/Dashboard/SellerStats';
import ProductChart from '../components/Dashboard/ProductChart';
import RevenueChart from '../components/Dashboard/RevenueChart';
import WalletCard from '../components/Dashboard/Wallet';
import TopProducts from '../components/Dashboard/TopProducts';
import Comments from '../components/Dashboard/Comments';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      {/* First row - Metric cards */}
      <div className="sm:col-span-1 lg:col-span-2">
        <MetricCard 
          title="Orders Shipped" 
          value="60" 
          bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
          icon={<Truck className="h-full w-full text-white" />}
        />
      </div>
      <div className="sm:col-span-1 lg:col-span-2">
        <MetricCard 
          title="New orders" 
          value="50" 
          bgColor="bg-gradient-to-br from-purple-500 to-purple-600" 
          icon={<ShoppingCart className="h-full w-full text-white" />}
        />
      </div>
      <div className="sm:col-span-2 lg:col-span-2">
        <MetricCard 
          title="Earnings" 
          value="₹22k" 
          bgColor="bg-gradient-to-br from-green-500 to-green-600"
          icon={<Wallet2 className="h-full w-full text-white" />}
          trend={{ value: "+25%", positive: true }}
        />
      </div>
      
      {/* Sales chart */}
      <div className="col-span-full">
        <SalesChart />
      </div>
      
      {/* Pending orders, payments, etc */}
      <div className="sm:col-span-1 lg:col-span-2">
        <MetricCard 
          title="Pending orders" 
          value="19" 
          bgColor="bg-gradient-to-br from-pink-400 to-pink-500" 
          icon={<ShoppingCart className="h-full w-full text-white" />}
        />
      </div>
      <div className="sm:col-span-1 lg:col-span-2">
        <MetricCard 
          title="Pending Payment" 
          value="120" 
          bgColor="bg-gradient-to-br from-red-400 to-red-500" 
          icon={<Wallet2 className="h-full w-full text-white" />}
        />
      </div>
      <div className="sm:col-span-2 lg:col-span-2">
        <MetricCard 
          title="Orders Re-tend" 
          value="17" 
          bgColor="bg-gradient-to-br from-orange-400 to-orange-500" 
          icon={<ArrowUpRight className="h-full w-full text-white" />}
        />
      </div>
      
      {/* Charts and Stats */}
      <div className="sm:col-span-2 lg:col-span-3">
        <CustomerStats />
      </div>
      <div className="sm:col-span-2 lg:col-span-3">
        <ProductChart />
      </div>
      
      <div className="sm:col-span-2 lg:col-span-3">
        <SellerStats />
      </div>
      <div className="sm:col-span-2 lg:col-span-3">
        <RevenueChart />
      </div>
      
      <div className="sm:col-span-2 lg:col-span-3">
        <WalletCard />
      </div>
      <div className="sm:col-span-2 lg:col-span-3">
        <TopProducts />
      </div>
      
      <div className="col-span-full">
        <Comments />
      </div>
    </div>
  );
};

export default Dashboard;