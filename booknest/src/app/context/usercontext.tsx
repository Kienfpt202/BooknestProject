"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type User = {
  uid: string;
  email: string;
  name: string;
  avatar: string;
  displayName?: string;
};

type UserContextType = {
  isAuthenticated: boolean;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!currentUser;

  useEffect(() => {
    const storedUser = localStorage.getItem("booknest-user");
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }
    setLoading(false);
  }, []);

  const setCurrentUser = (user: User | null) => {
    if (user) {
      localStorage.setItem("booknest-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("booknest-user");
    }
    setUserState(user);
  };

  const logout = () => {
    localStorage.removeItem("booknest-user");
    localStorage.removeItem("booknest-pending-path"); // 👈 Xóa luôn pending path
    setUserState(null);
  };

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, logout, loading, isAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};
