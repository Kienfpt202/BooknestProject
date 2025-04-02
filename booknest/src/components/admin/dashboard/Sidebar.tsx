import { FaBook, FaUsers, FaStar, FaComments } from "react-icons/fa";
import { MdDashboard, MdPerson } from 'react-icons/md'; // Import Material Design icons

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active = false }) => (
  <li
    className={`flex items-center p-4 rounded-md transition duration-300 ${
      active
        ? "bg-[#C49A6C] text-white font-semibold shadow-md"
        : "text-white hover:bg-[#7A5230]"
    }`}
  >
    <span className="mr-3 text-xl">{icon}</span>
    <span className="text-lg font-medium">{label}</span>
  </li>
);

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#5B3B1D] text-white h-screen flex flex-col fixed left-0 top-0 z-50 overflow-y-auto">
      <div className="p-6 text-center">
        <img src="/logo.png" alt="BookNest Systems" className="w-24 mx-auto mb-4" />
        <h2 className="text-xl font-bold">BookNest Systems</h2>
      </div>
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-2">
          <SidebarItem icon={<MdDashboard />} label="Dashboard" active />
          <SidebarItem icon={<MdPerson />} label="Users" />
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
