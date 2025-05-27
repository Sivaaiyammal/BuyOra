import { useNavigate } from "react-router-dom"
import { Search, MessageSquare, Menu, ChevronLeft } from "lucide-react"
import UserAvatar from "../common/UserAvatar"
import Logo from "./Logo"
import Notification from "../common/Notification"
import { useUser } from "../../contexts/UserContext"

const DEFAULT_AVATAR = "/user-profile.avif"

const Header = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate()
  const { user } = useUser()

  const avatar =
    user?.avatar && typeof user.avatar === "string" && user.avatar.trim() !== ""
      ? user.avatar
      : DEFAULT_AVATAR

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
        <Logo collapsed={false} />
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-800">
            Welcome Back Admin...
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center relative w-64 lg:w-96">
        <Search size={18} className="absolute left-3 text-gray-400" />
        <input
          type="search"
          placeholder="search text"
          className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Notification />
        <button
          onClick={() => navigate("/chat")}
          className="relative text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <MessageSquare size={20} />
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="focus:outline-none"
        >
          <UserAvatar imageUrl={avatar} size="md" />
        </button>
      </div>
    </header>
  )
}

export default Header
