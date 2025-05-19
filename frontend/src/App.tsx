import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Settings from './pages/Settings';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Seller from './pages/seller/Seller';
import Product from './pages/product/Product';
import Category from './pages/product/Category';
import CreateProduct from './pages/product/CreateProduct';
import EditProduct from './pages/product/EditProduct';
import ProductDetails from './pages/product/ProductDetails';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AdminManager from './pages/AdminManager';
import Payment from './pages/payment/Payment';
import InvoiceCreate from './pages/payment/InvoiceCreate';
import Report from './pages/report/Report';
import Layout from './components/Layout/Layout';
// import './index.css';


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
}

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const renderWithLayout = (component: React.ReactNode) => (
    <Layout sidebarCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar}>
      {component}
    </Layout>
  );

  return (
    <AuthProvider>
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
              <ProtectedRoute>
                {renderWithLayout(<Orders />)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                {renderWithLayout(<Profile />)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                {renderWithLayout(<Chat />)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/product"
            element={
              <ProtectedRoute>
                {renderWithLayout(<Product />)}
              </ProtectedRoute>
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
              <ProtectedRoute>
                {renderWithLayout(<Seller />)}
              </ProtectedRoute>
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
              <ProtectedRoute>
                {renderWithLayout(<Payment />)}
              </ProtectedRoute>
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
              <ProtectedRoute>
                {renderWithLayout(<Report />)}
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
