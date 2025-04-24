"use client";
import { FaSearch } from "react-icons/fa";
import AvatarDropdown from "@components/user/dashboard/AvatarDropdown";
import NotificationDropdown from "@components/user/dashboard/NotificationDropdown";
import Logo from "@components/Logo";
import Link from "next/link";
import { useAuth } from "@context/usercontext";

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <nav className="w-full flex items-center bg-[#F5F1EB] border-b px-6 py-3 fixed top-0 left-0 z-50 h-16">
      {/* Logo */}
      <div className="flex items-center mr-4">
        <Logo />
      </div>
      <div className="flex items-center mr-6 text-gray-800 font-semibold text-xl">
        <span className="text-[#A7824B]">BookNest</span>
      </div>

      {/* Search Bar */}
      <div className="relative w-1/3 mr-auto">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-4 pr-10 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A7824B] shadow-inner transition"
        />
        <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-[#A7824B] transition duration-300" />
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {currentUser ? (
          <>
            <NotificationDropdown />
            <AvatarDropdown />
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-semibold text-[#A7824B] hover:text-white hover:bg-[#A7824B] border border-[#A7824B] rounded transition"
            >
              Đăng nhập
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 text-sm font-semibold text-[#A7824B] hover:text-white hover:bg-[#A7824B] border border-[#A7824B] rounded transition"
            >
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
