import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Simulated user credentials - in a real app, this would be in a secure database
// const VALID_CREDENTIALS = {
//   email: 'admin@buyora.com',
//   password: 'admin123',
//   username: 'Admin'
// };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  
  const resetPassword = async (email: string, newPassword: string) => {
  try {
    await axios.post('http://localhost:3001/reset-password', {
      email,
      newPassword
    });
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Reset failed');
  }
};


  // const login = async (email: string, password: string) => {
  //   // Simulate API call delay
  //   await new Promise(resolve => setTimeout(resolve, 1000));

  //   if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
  //     const user = {
  //       username: VALID_CREDENTIALS.username,
  //       email: VALID_CREDENTIALS.email
  //     };
  //     setUser(user);
  //     localStorage.setItem('user', JSON.stringify(user));
  //   } else {
  //     throw new Error('Invalid email or password');
  //   }
  // };

  // const logout = () => {
  //   setUser(null);
  //   localStorage.removeItem('user');
  // };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      const user: User = {
        username: response.data.username,
        email: response.data.email
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, resetPassword }}>
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