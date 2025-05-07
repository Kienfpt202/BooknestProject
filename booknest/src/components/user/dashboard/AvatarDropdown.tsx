"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@context/usercontext";
import { auth } from "@lib/firebase";
import { signOut } from "firebase/auth";

const AvatarDropdown = () => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Đăng xuất khỏi Firebase
      logout();            // Xóa localStorage & context
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (!currentUser) return null;

  const avatarSrc = currentUser.avatar?.trim() || "/avatar.png";

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="focus:outline-none">
        <Image
          src={avatarSrc}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full cursor-pointer border border-gray-300 hover:border-orange-500 transition duration-300"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
          <div className="flex items-center space-x-3 border-b pb-3">
            <Image
              src={avatarSrc}
              alt="User Avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{currentUser.name}</h3>
              <p className="text-sm text-green-600">{currentUser.email}</p>
              <div className="w-full bg-gray-200 h-1 mt-1 rounded-full">
                <div className="bg-green-500 h-1 rounded-full w-2/3"></div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Activities</h4>
            {[1].map((_, index) => (
              <div key={index} className="flex items-center space-x-3 mb-2">
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                  Hot
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Review New Books</p>
                  <p className="text-xs text-gray-500">post new review</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-3 text-center">
            <button
              onClick={handleLogout}
              className="text-orange-700 text-sm font-semibold hover:text-orange-900 transition duration-300"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
