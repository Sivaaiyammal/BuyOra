import React, { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      )

      if (response.data.message === "OTP sent") {
        return "otp"
      }

      const user = {
        username: response.data.username,
        email: response.data.email
      }
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("token", response.data.token)
      return "success"
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOtp = async (email, otp) => {
    setIsLoading(true)
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp }
      )
      const user = { username: res.data.username, email: res.data.email }
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("token", res.data.token)
    } catch (err) {
      throw new Error(err.response?.data?.message || "OTP verification failed")
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (email, newPassword) => {
    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        newPassword
      })
    } catch (err) {
      throw new Error(err.response?.data?.message || "Reset failed")
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoading, resetPassword, verifyOtp }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
