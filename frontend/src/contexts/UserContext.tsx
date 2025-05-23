import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  name?: string;
  email: string;
  avatar?: string;
  [key: string]: any;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const parsedUser = JSON.parse(userStr);
      fetch(`http://localhost:5000/api/profile/by-email/${parsedUser.email}`)
        .then(res => res.json())
        .then(profile => {
          setUser({
            ...parsedUser,
            ...profile,
            avatar: profile.avatar?.startsWith("http") ? profile.avatar : `http://localhost:5000${profile.avatar}`
          });
        })
        .catch(() => setUser(parsedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
