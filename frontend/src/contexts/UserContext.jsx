import React, { createContext, useContext, useState, useEffect } from "react"

const UserContext = createContext(undefined)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userStr = localStorage.getItem("user")
    if (userStr) {
      const parsedUser = JSON.parse(userStr)
      fetch(`http://localhost:5000/api/profile/by-email/${parsedUser.email}`)
        .then(res => res.json())
        .then(profile => {
          setUser({
            ...parsedUser,
            ...profile,
            avatar: profile.avatar?.startsWith("http")
              ? profile.avatar
              : `http://localhost:5000${profile.avatar}`
          })
        })
        .catch(() => setUser(parsedUser))
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error("useUser must be used within a UserProvider")
  return context
}
