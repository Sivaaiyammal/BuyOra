import React, { useState } from "react"
import { Eye, EyeOff, RotateCw } from "lucide-react"

const Security = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [security, setSecurity] = useState({
    twoFactor: true,
    currentPassword: "l123GD5Y",
    newPassword: ""
  })

  const handleSubmit = e => {
    e.preventDefault()
    console.log("Security settings saved:", security)
  }

  const handleGenerateOTP = () => {
    console.log("Generating OTP...")
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Two-factor Authentication
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              Enable Or Disable Two Factor Authentication
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={security.twoFactor}
                onChange={e =>
                  setSecurity({ ...security, twoFactor: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Change Password
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={security.currentPassword}
                  onChange={e =>
                    setSecurity({
                      ...security,
                      currentPassword: e.target.value
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={security.newPassword}
                  onChange={e =>
                    setSecurity({ ...security, newPassword: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleGenerateOTP}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-2"
              >
                <span>Generate OTP</span>
                <RotateCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
              Terms and conditions
            </a>
          </div>
          <div>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
              FAQ
            </a>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default Security
