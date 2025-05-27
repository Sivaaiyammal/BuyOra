import { createContext, useContext, useState } from "react"

const SidebarContext = createContext(undefined)

export const SidebarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <SidebarContext.Provider value={{ collapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
