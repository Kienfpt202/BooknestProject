"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@lib/firebase";

export type User = {
  uid: string;
  email: string;
  name: string;
  avatar: string;
  role: "admin" | "user";
  displayName?: string;
};

type UserContextType = {
  isAuthenticated: boolean;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
  loading: boolean;
  isAdmin: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === "admin";

  // Theo dõi trạng thái người dùng từ Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const docRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            const user: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || "",
              name: userData.name || "",
              avatar: userData.avatar || "",
              role: userData.role || "user",
              displayName: firebaseUser.displayName || "",
            };
            setUserState(user);
            localStorage.setItem("booknest-user", JSON.stringify(user));
          } else {
            console.warn("No user document found in Firestore");
            setUserState(null);
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          setUserState(null);
        }
      } else {
        setUserState(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
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
    localStorage.removeItem("booknest-pending-path");
    setUserState(null);
    auth.signOut();
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        logout,
        loading,
        isAuthenticated,
        isAdmin,
      }}
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
