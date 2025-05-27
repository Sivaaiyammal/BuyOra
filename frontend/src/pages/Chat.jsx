import { useState } from "react"
import { Search, Paperclip, Send } from "lucide-react"
import UserAvatar from "../components/common/UserAvatar"

const Chat = () => {
  const [message, setMessage] = useState("")

  const contacts = [
    {
      id: 1,
      name: "Blue2",
      role: "Staff Assistant",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      lastSeen: "5m",
      date: "21-04-25"
    },
    {
      id: 2,
      name: "Blue2",
      role: "Staff Assistant",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      lastSeen: "5m",
      date: "21-04-25"
    },
    {
      id: 3,
      name: "Blue3",
      role: "Fashion tex",
      avatar:
        "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      lastSeen: "yesterday",
      date: ""
    }
  ]

  const handleSubmit = e => {
    e.preventDefault()
    if (!message.trim()) return

    console.log("Message sent:", message)
    setMessage("")
  }

  return (
    <div className="h-[calc(100vh-6rem)] flex overflow-hidden">
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UserAvatar
              imageUrl="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              size="sm"
            />
            <div>
              <h3 className="font-semibold text-gray-800">Red1</h3>
              <p className="text-xs text-gray-500">red@1gmail.com</p>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ul className="divide-y divide-gray-100">
            {contacts.map(contact => (
              <li
                key={contact.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <button className="w-full px-4 py-3 flex items-start text-left">
                  <UserAvatar imageUrl={contact.avatar} size="md" />
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-semibold text-gray-800">
                        {contact.name}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {contact.lastSeen}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{contact.role}</p>
                    <div className="mt-1 border-t border-gray-100 pt-1">
                      <p className="text-xs text-right text-gray-400">
                        {contact.date}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-center">April 21</h3>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {/* Chat messages would go here */}
          <div className="flex justify-end">
            <div className="max-w-md p-3 mb-3 rounded-lg bg-blue-50 text-gray-800">
              <img
                src="https://images.pexels.com/photos/8171696/pexels-photo-8171696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Document preview"
                className="w-full h-64 rounded-lg object-cover mb-2"
              />
              <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                <span>21:17</span>
                <span className="text-blue-600">✓</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-white">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Write a message..."
              className="flex-1 py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat
