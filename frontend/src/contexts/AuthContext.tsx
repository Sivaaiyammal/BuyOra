import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<'otp' | 'success'>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<'otp' | 'success'> => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      if (response.data.message === 'OTP sent') {
        return 'otp';
      }

      const user: User = {
        username: response.data.username,
        email: response.data.email
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', response.data.token);
      return 'success';
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      const user = { username: res.data.username, email: res.data.email };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', res.data.token);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string, newPassword: string) => {
    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', {
        email,
        newPassword
      });
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Reset failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, resetPassword, verifyOtp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
