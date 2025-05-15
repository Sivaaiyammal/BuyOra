import { Link, useLocation } from 'react-router-dom';
import {  Users, ShoppingBag, ShoppingCart, CreditCard, BarChart2, Tag, UserRound, LogOut } from 'lucide-react'; //LayoutDashboard,
import { motion } from 'framer-motion';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar = ({ collapsed }: SidebarProps) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: <img src="/icons/dashboard.png" alt="Dashboard" className="w-5 h-5" />, label: 'Dashboard', path: '/' },
    { icon: <Users size={20} />, label: 'Admin Manager', path: '/admin' },
    { icon: <Users size={20} />, label: 'Seller', path: '/seller', hasSubmenu: true },
    { icon: <ShoppingBag size={20} />, label: 'Product', path: '/product', hasSubmenu: true },
    { icon: <ShoppingCart size={20} />, label: 'Order', path: '/orders' },
    { icon: <CreditCard size={20} />, label: 'Payment', path: '/payment', hasSubmenu: true },
    { icon: <BarChart2 size={20} />, label: 'Report', path: '/report' },
    { icon: <Tag size={20} />, label: 'Discount', path: '/discount' },
    { icon: <UserRound size={20} />, label: 'Customer', path: '/customer' },
    { icon: <LogOut size={20} />, label: 'Log Out', path: '/logout' },
  ];

  return (
    <motion.aside 
      className={`bg-[#333333] text-white flex flex-col ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out z-10`}
      initial={false}
      animate={{ width: collapsed ? 64 : 256 }}
    >
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => ( 
            <li key={index}>
              <Link 
                to={item.path}
                className={`flex items-center px-4 py-3 ${collapsed ? 'justify-center' : 'space-x-3'} ${
                  location.pathname === item.path ? 'bg-[#444] text-white' : 'text-gray-300 hover:bg-[#444] hover:text-white'
                } transition-colors duration-200`}
              >
                <span>{item.icon}</span>
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {!collapsed && item.hasSubmenu && (
                  <span className="ml-auto">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;