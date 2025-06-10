import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  BarChart2,
  Tag,
  UserRound,
  LogOut
} from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "../../contexts/AuthContext"

const Sidebar = ({ collapsed }) => {
  const location = useLocation()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(null)

  const toggleMenu = label => {
    setOpenMenu(prev => (prev === label ? null : label))
  }

  const handleLogout = () => {
    logout() // Clear session
    navigate("/login") // Redirect to login
  }

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/" },
    {
      icon: <Users size={20} />,
      label: "Admin Manager",
      path: "/adminmanager"
    },
    {
      icon: <Users size={20} />,
      label: "Seller",
      path: "/seller",
      submenu: [
        { label: "Create", path: "/seller/create" },
        { label: "Seller List", path: "/seller/list" }
      ]
    },
    {
      icon: <ShoppingBag size={20} />,
      label: "Product",
      path: "/product/category",
      submenu: [
        { label: "Category", path: "/product/category" },
        { label: "New Product Create", path: "/product/create" },
        { label: "Edit", path: "/product/edit" }
      ]
    },
    { icon: <ShoppingCart size={20} />, label: "Order", path: "/orders" },
    {
      icon: <CreditCard size={20} />,
      label: "Payment",
      path: "/payment",
      submenu: [{ label: "Create Invoice", path: "/payment/invoice/create" }]
    },
    { icon: <BarChart2 size={20} />, label: "Report", path: "/report" },
    { icon: <Tag size={20} />, label: "Discount", path: "/discount" },
    { icon: <UserRound size={20} />, label: "Customer", path: "/customer" },
    { icon: <LogOut size={20} />, label: "Log Out", path: "/logout" }
  ]

  return (
    <motion.aside
      className={`bg-[#333333] text-white flex flex-col ${
        collapsed ? "w-16" : "w-64"
      } transition-all duration-300 ease-in-out z-10`}
      initial={false}
      animate={{ width: collapsed ? 64 : 256 }}
    >
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.submenu ? (
                <div>
                  <div
                    onClick={() => {
                      navigate(item.path)
                      toggleMenu(item.label)
                    }}
                    className={`flex items-center px-4 py-3 cursor-pointer ${
                      collapsed ? "justify-center" : "space-x-3"
                    } ${
                      location.pathname.startsWith(item.path)
                        ? "bg-[#444] text-white"
                        : "text-gray-300 hover:bg-[#444] hover:text-white"
                    } transition-colors duration-200`}
                  >
                    <span>{item.icon}</span>
                    {!collapsed && (
                      <>
                        <span className="text-sm font-medium flex-1">
                          {item.label}
                        </span>
                        <span
                          className={`transform transition-transform duration-200 ${
                            openMenu === item.label ? "rotate-180" : ""
                          }`}
                        >
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </>
                    )}
                  </div>
                  {!collapsed && openMenu === item.label && (
                    <ul className="ml-12 mt-2 space-y-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.path}
                            className={`block px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                              location.pathname === subItem.path
                                ? "text-white bg-[#444]"
                                : "text-gray-300 hover:text-white hover:bg-[#444]"
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : item.label === "Log Out" ? (
                <button
                  onClick={handleLogout}
                  className={`flex items-center w-full text-left px-4 py-3 ${
                    collapsed ? "justify-center" : "space-x-3"
                  } text-gray-300 hover:bg-[#444] hover:text-black transition-colors duration-200`}
                >
                  <span>{item.icon}</span>
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </button>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 ${
                    collapsed ? "justify-center" : "space-x-3"
                  } ${
                    location.pathname === item.path
                      ? "bg-[#444] text-white"
                      : "text-gray-300 hover:bg-[#444] hover:text-white"
                  } transition-colors duration-200`}
                >
                  <span>{item.icon}</span>
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  )
}

export default Sidebar
