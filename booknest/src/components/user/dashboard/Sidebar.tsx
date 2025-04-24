"use client";
import { usePathname, useRouter } from "next/navigation";
import { FaHome, FaBook, FaUsers, FaUser, FaDashcube } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "@context/usercontext";

const menuItems = [
  { name: "Dashboard", icon: <FaDashcube />, path: "/user/dashboard", protected: true },
  { name: "Home", icon: <FaHome />, path: "/user", protected: false },
  { name: "Book", icon: <FaBook />, path: "/user/book", protected: false },
  { name: "Club", icon: <FaUsers />, path: "/user/club", protected: true },
  { name: "Profile", icon: <FaUser />, path: "/user/profile", protected: true },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [pendingPath, setPendingPath] = useState("");

  const handleClick = (path: string, isProtected: boolean) => {
    if (isProtected && !currentUser) {
      setPendingPath(path);
      setShowDialog(true);
    } else {
      router.push(path);
    }
  };

  return (
    <>
      <div className="w-64 h-screen bg-gray-100 shadow-md fixed left-0 top-0 flex flex-col p-6 z-40">
        <div className="flex items-center text-gray-800 font-semibold text-xl mb-8">
          <span className="font-bold text-2xl mr-1">Book</span>
          <span className="text-orange-500">Nest</span>
        </div>

        <ul className="flex-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name} className="mb-2">
                <button
                  onClick={() => handleClick(item.path, item.protected)}
                  className={`w-full text-left flex items-center px-4 py-3 rounded-md transition-all ${
                    isActive
                      ? "bg-orange-100 text-amber-950 font-semibold shadow-sm"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[320px] text-center space-y-4">
            <h3 className="text-lg font-semibold">
              Bạn cần đăng nhập để xem phần này. Đăng nhập ngay?
            </h3>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                onClick={() => {
                  localStorage.setItem("booknest-pending-path", pendingPath);
                  setShowDialog(false);
                  router.push("/auth/login");
                }}
              >
                Đăng nhập
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => {
                  setShowDialog(false);
                  setPendingPath("");
                }}
              >
                Không phải lúc này
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
