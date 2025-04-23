// context/UserContext.tsx
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
  name: string;
  email: string;
  avatar: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Đọc user từ localStorage khi app load
  useEffect(() => {
    const storedUser = localStorage.getItem("booknest-user");
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
    }
    setLoading(false);
  }, []);

  // Cập nhật user và lưu vào localStorage
  const setUser = (user: User | null) => {
    if (user) {
      localStorage.setItem("booknest-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("booknest-user");
    }
    setUserState(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
