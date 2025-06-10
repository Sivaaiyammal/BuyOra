import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import ResetPassword from "./pages/ResetPassword"
import Settings from "./pages/Settings"
import Orders from "./pages/Orders"
import Profile from "./pages/Profile"
import Chat from "./pages/Chat"
import Seller from "./pages/seller/Seller"
import SellerCreate from "./pages/seller/SellerCreate"
import SellerList from "./pages/seller/SellerList"
import Product from "./pages/product/Product"
import Category from "./pages/product/Category"
import CreateProduct from "./pages/product/CreateProduct"
import EditProduct from "./pages/product/EditProduct"
import ProductDetails from "./pages/product/ProductDetails"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import AdminManager from "./pages/AdminManager"
import Payment from "./pages/payment/Payment"
import InvoiceCreate from "./pages/payment/InvoiceCreate"
import Report from "./pages/report/Report"
import { UserProvider } from "./contexts/UserContext"
import Layout from "./components/Layout/Layout"
import Loader from "./components/loader/Loader" 

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return <Loader />
  if (!user) return <Navigate to="/login" />
  return <>{children}</>
}

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed)

  const renderWithLayout = component => (
    <Layout sidebarCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar}>
      {component}
    </Layout>
  )

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleLoad = () => setLoading(false)

    if (document.readyState === "complete") {
      setLoading(false)
    } else {
      window.addEventListener("load", handleLoad)
    }

    return () => window.removeEventListener("load", handleLoad)
  }, [])

  if (loading) return <Loader /> 

  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  {renderWithLayout(<Dashboard />)}
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  {renderWithLayout(<Settings />)}
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>{renderWithLayout(<Orders />)}</ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>{renderWithLayout(<Profile />)}</ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>{renderWithLayout(<Chat />)}</ProtectedRoute>
              }
            />
            <Route
              path="/product"
              element={
                <ProtectedRoute>{renderWithLayout(<Product />)}</ProtectedRoute>
              }
            />
            <Route
              path="/product/category"
              element={
                <ProtectedRoute>
                  {renderWithLayout(<Category />)}
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/create"
              element={
                <ProtectedRoute>
                  {renderWithLayout(<CreateProduct />)}
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/edit"
              element={
                <ProtectedRoute>
                  {renderWithLayout(<EditProduct />)}
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/details/:id"
              element={
                <ProtectedRoute>
                  {renderWithLayout(<ProductDetails />)}
                </ProtectedRoute>
              }
            />
            <Route
              path="/seller"
              element={
                <ProtectedRoute>{renderWithLayout(<Seller />)}</ProtectedRoute>
              }
            />
            <Route
              path="/seller/create"
              element={
                <ProtectedRoute>{renderWithLayout(<SellerCreate />)}</ProtectedRoute>
              }
            />
            <Route
              path="/seller/list"
              element={
                <ProtectedRoute>{renderWithLayout(<SellerList />)}</ProtectedRoute>
              }
            />
            <Route
              path="/adminmanager"
              element={
                <ProtectedRoute>
                  {renderWithLayout(<AdminManager />)}
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>{renderWithLayout(<Payment />)}</ProtectedRoute>
              }
            />
            <Route
              path="/report"
              element={
                <ProtectedRoute>
                  {renderWithLayout(<InvoiceCreate />)}
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment/invoice/create"
              element={
                <ProtectedRoute>{renderWithLayout(<Report />)}</ProtectedRoute>
              }
            />
            <Route
              path="/loader"
              element={
                <ProtectedRoute>{renderWithLayout(<Loader />)}</ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
