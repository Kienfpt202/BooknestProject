"use client";
import { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";

const notifications = [
  { id: 1, sender: "Hoang Huy", text: "Huy have reacted your review about the ... book", time: "Just Now" },
  { id: 2, sender: "Tuong Tran", text: "Tuong have commented your review about the ... book", time: "Just Now" },
  { id: 3, sender: "System", text: "Your join club request has accepted", time: "Just Now" },
  { id: 4, sender: "System", text: "You have upcoming discussion in group about ... in ....", time: "Just Now" },
];

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <FaBell className="text-gray-700 text-xl hover:text-orange-600 transition duration-300" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
          {notifications.length}
        </span>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-72 bg-white shadow-lg rounded-lg p-4 z-50">
          {/* Header */}
          <h3 className="text-orange-700 font-serif text-lg font-semibold">Notification</h3>
          <hr className="my-2 border-t border-gray-300" />

          <div className="max-h-60 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition"
              >
                {/* Avatar */}
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{notification.sender}</p>
                  <p className="text-gray-600 text-sm truncate">{notification.text}</p>
                </div>

                <p className="text-gray-500 text-xs">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
