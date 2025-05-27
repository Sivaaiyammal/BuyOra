import { useState, useEffect } from "react"
import axios from "axios"
import { Pencil } from "lucide-react"
import { useUser } from "../contexts/UserContext"

const Profile = () => {
  const [activeTab, setActiveTab] = useState("edit")
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    dob: "",
    phone: "",
    role: "",
    presentAddress: "",
    permanentAddress: "",
    city: "",
    postalCode: "",
    country: "",
    about: "",
    avatar: ""
  })

  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { setUser } = useUser()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userStr = localStorage.getItem("user")
        if (!userStr) {
          alert("User not logged in.")
          return
        }

        const user = JSON.parse(userStr)
        const email = user.email

        if (!email) {
          alert("Logged in user has no email.")
          return
        }

        const url = `http://localhost:5000/api/profile/by-email/${email}`
        const res = await axios.get(url)
        const profile = res.data

        setFormData({
          name: profile.name || "",
          username: profile.username || "",
          email: profile.email || "",
          dob: profile.dob || "",
          phone: profile.phone || "",
          role: profile.role || "",
          presentAddress: profile.presentAddress || "",
          permanentAddress: profile.permanentAddress || "",
          city: profile.city || "",
          postalCode: profile.postalCode || "",
          country: profile.country || "",
          about: profile.aboutMe || "",
          avatar: profile.avatar || ""
        })
      } catch (err) {
        if (axios.isAxiosError(err)) {
          alert(
            "Failed to load profile: " +
              (err.response?.data?.message || err.message)
          )
        } else {
          alert("An unexpected error occurred.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      const fileURL = URL.createObjectURL(e.target.files[0])
      setFormData(prev => ({ ...prev, avatar: fileURL }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const userStr = localStorage.getItem("user")
      if (!userStr) {
        alert("User not logged in.")
        return
      }

      const user = JSON.parse(userStr)
      const email = user.email

      setSaving(true)
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("username", formData.username)
      formDataToSend.append("dob", formData.dob)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("presentAddress", formData.presentAddress)
      formDataToSend.append("permanentAddress", formData.permanentAddress)
      formDataToSend.append("postalCode", formData.postalCode)
      formDataToSend.append("city", formData.city)
      formDataToSend.append("country", formData.country)
      formDataToSend.append("aboutMe", formData.about)
      formDataToSend.append("role", formData.role)
      if (selectedFile) {
        formDataToSend.append("avatar", selectedFile)
      }

      const res = await axios.put(
        `http://localhost:5000/api/profile/by-email/${email}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      alert(" " + res.data.message)
      // window.location.reload();
      if (res.data.avatar) {
        const updatedAvatar = res.data.avatar.startsWith("http")
          ? res.data.avatar
          : `http://localhost:5000${res.data.avatar}`

        const updatedUser = { ...formData, avatar: updatedAvatar }
        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(
          "Failed to update profile: " +
            (error.response?.data?.message || error.message)
        )
      } else {
        alert("An unexpected error occurred.")
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-20">Loading profile...</div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {["edit", "preferences", "security"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === tab
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-10">
              <div className="md:w-1/4 flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-blue-100 border-4 border-white shadow-lg">
                    <img
                      src={
                        formData.avatar
                          ? formData.avatar.startsWith("blob:")
                            ? formData.avatar
                            : `http://localhost:5000${formData.avatar}`
                          : "https://via.placeholder.com/150"
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="profile-upload"
                  />
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    <Pencil size={16} />
                  </label>
                </div>
              </div>

              <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Your Name", name: "name" },
                  { label: "User Name", name: "username" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone", name: "phone" },
                  { label: "Role", name: "role" },
                  { label: "Date of Birth", name: "dob" },
                  { label: "Present Address", name: "presentAddress" },
                  { label: "Permanent Address", name: "permanentAddress" },
                  { label: "City", name: "city" },
                  { label: "Postal Code", name: "postalCode" },
                  { label: "Country", name: "country" }
                ].map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About Me
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className={`px-6 py-2 rounded-lg text-white transition-colors ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
