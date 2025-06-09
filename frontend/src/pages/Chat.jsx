import { useRef, useState, useEffect } from "react"
import axios from "axios"
import { Search, Paperclip, Send } from "lucide-react"
import { io } from "socket.io-client";
import UserAvatar from "../components/common/UserAvatar"

const Chat = () => {
  const [message, setMessage] = useState("")
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [messages, setMessages] = useState([])
  const socket = useRef(null)

  // Fetch contacts on mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/employees").then(res => setContacts(res.data))
  }, [])

  useEffect(() => {
  socket.current = io("http://localhost:5000");

  socket.current.on("receive-message", msg => {
     const isForCurrentContact =
    selectedContact &&
    (msg.from === selectedContact._id || msg.to === selectedContact._id);

  if (isForCurrentContact) {
    const isFromMe = msg.from === currentUser._id;
    setMessages(prev => [...prev, { ...msg, fromMe: isFromMe }]);
  }
  
  });

  return () => socket.current.disconnect();
}, []);

  // Fetch messages when contact changes
  useEffect(() => {
    if (selectedContact) {
      axios
        .get(`http://localhost:5000/api/messages/${selectedContact._id}`)
        .then(res => setMessages(res.data))
    }
  }, [selectedContact])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!message.trim() || !selectedContact) return

    const newMsg = {
      to: selectedContact._id,
      text: message,
      time: new Date().toISOString(),
    }
    // Send to backend
    await axios.post("http://localhost:5000/api/messages", newMsg)
    socket.current.emit("send-message", newMsg);
    setMessages([...messages, { ...newMsg, fromMe: true }])
    setMessage("")
  }

  return (
    <div className="h-[calc(100vh-6rem)] flex overflow-hidden">
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* ...sidebar code... */}
        <div className="flex-1 overflow-y-auto">
          <ul className="divide-y divide-gray-100">
            {contacts.map(contact => (
              <li key={contact._id}>
                <button
                  className={`w-full px-4 py-3 flex items-start text-left ${selectedContact?._id === contact._id ? "bg-gray-100" : ""}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <UserAvatar imageUrl={contact.avatar} size="md" />
                  <div className="ml-3 flex-1">
                    <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={msg._id || idx} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-md p-3 mb-3 rounded-lg ${msg.fromMe ? "bg-blue-50" : "bg-white border"}`}>
                <span>{msg.text}</span>
                <div className="text-xs text-gray-500 mt-1">{new Date(msg.time).toLocaleTimeString()}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 bg-white">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Write a message..."
              className="flex-1 py-2 px-4 bg-gray-100 rounded-full"
              disabled={!selectedContact}
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded-full" disabled={!selectedContact}>
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat