import { JSX } from "react";
import { FaUser, FaBook, FaUsers, FaStar, FaComments, FaHome } from "react-icons/fa";

interface SidebarItemProps {
  icon: JSX.Element;  // Chỉ định kiểu cho icon là JSX.Element
  label: string;      // Chỉ định kiểu cho label là string
  active?: boolean;   // Tham số active là kiểu boolean và có thể không truyền
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active = false }) => (
  <li
    className={`flex items-center p-4 ${
      active ? "bg-[#C49A6C]" : "hover:bg-[#7A5230]"
    }`}
  >
    <span className="mr-2">{icon}</span>
    {label}
  </li>
);

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#5B3B1D] text-white h-screen flex flex-col">
      <div className="p-4 text-center">
        <img src="/logo.png" alt="BookNest Systems" className="w-20 mx-auto" />
        <h2 className="mt-2 text-lg font-semibold">BookNest Systems</h2>
      </div>
      <nav className="flex-1">
        <ul>
          <SidebarItem icon={<FaHome />} label="Dashboard" active />
          <SidebarItem icon={<FaUser />} label="Users" />
          <SidebarItem icon={<FaBook />} label="Books" />
          <SidebarItem icon={<FaUsers />} label="Clubs" />
          <SidebarItem icon={<FaStar />} label="Reviews" />
          <SidebarItem icon={<FaComments />} label="Discussions" />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
