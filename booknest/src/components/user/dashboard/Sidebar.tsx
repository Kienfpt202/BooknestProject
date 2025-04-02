"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaBook, FaUsers, FaUser, FaCog, FaDashcube } from "react-icons/fa"; // Updated icons

const menuItems = [
  { name: "Dashboard", icon: <FaDashcube />, path: "/user/dashboard" }, // Assuming "/" is the dashboard
  { name: "Home", icon: <FaHome />, path: "/user" },
  { name: "Book", icon: <FaBook />, path: "/user/book" },
  { name: "Club", icon: <FaUsers />, path: "/user/club" },
  { name: "Profile", icon: <FaUser />, path: "/user/profile" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-gray-100 shadow-md fixed left-0 top-0 flex flex-col p-6">
      {/* Logo */}
      <div className="flex items-center text-gray-800 font-semibold text-xl mb-8">
        <span className="font-bold text-2xl mr-1">Book</span>
        <span className="text-orange-500">Nest</span>
      </div>

      {/* Menu Items */}
      <ul className="flex-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <li key={item.name} className="mb-2">
              <Link href={item.path}>
                <div
                  className={`flex items-center px-4 py-3 rounded-md cursor-pointer transition-all ${
                    isActive
                      ? "bg-orange-100 text-amber-950 font-semibold shadow-sm"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  {item.name}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Setting */}
      <div className="border-t pt-4">
        <Link href="/settings">
          <div className="flex items-center px-4 py-3 rounded-md cursor-pointer text-gray-700 hover:bg-gray-200 transition-all">
            <FaCog className="text-lg mr-3" />
            Setting
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;