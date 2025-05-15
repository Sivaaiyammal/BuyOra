import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: ''
  });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle password reset logic here
  //   console.log('Reset password attempt:', formData);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.emailOrPhone || !formData.password || !formData.confirmPassword) {
    alert("All fields are required.");
    return;
  }

  if (formData.password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    await resetPassword(formData.emailOrPhone, formData.password);
    alert("Password reset successful!");
    navigate("/login");
    // Optionally redirect to login or clear form
  } catch (err: any) {
    alert(err.message || "Something went wrong");
  }
};

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side with illustration */}
      <div className="lg:flex-1" style={{
        background: 'linear-gradient(to bottom right, #e28552, #e0844d)'
      }}>
        <div className="w-full h-full">
          <img 
            src="/forget.png" 
            alt="Shopping illustration" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>


      {/* Right side with form */}
      <div className="lg:flex-1 p-8 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img
                  src="/logo.png" 
                  alt="Buy Ora Logo"
                  className="mx-auto mb-3"
                  style={{ maxWidth: "250px" }}
                />
            <h2 className="text-2xl font-bold text-gray-800">Welcome to BUY-ORA SHOP</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Enter Your Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Enter Your Mobile No or Email ID</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email or phone"
                value={formData.emailOrPhone}
                onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">New Password (At Least 6 Letter)</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;