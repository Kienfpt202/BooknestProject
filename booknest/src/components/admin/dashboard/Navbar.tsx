"use client";

import { useRouter } from "next/navigation";
import { auth } from "@lib/firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "@context/usercontext";

const Navbar = () => {
  const router = useRouter();
  const { logout } = useAuth(); // 👉 lấy hàm logout từ context

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout(); // 👉 gọi hàm logout từ context
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-[#F4ECE4] shadow-md container mx-auto">
      <button 
        onClick={handleLogout}
        className="bg-[#6B4226] text-white px-4 py-2 rounded-lg hover:bg-[#5B3A29] transition-colors"
      >
        Log out
      </button>
    </header>
  );
};

export default Navbar;
