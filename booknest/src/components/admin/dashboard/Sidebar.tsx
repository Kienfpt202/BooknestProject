"use client";
import { FaBook, FaUsers } from "react-icons/fa";
import { MdDashboard, MdPerson } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
import Image from "next/image"; // Import Image from next/image

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href }) => {
  const pathname = usePathname(); // Get the current path
  const isActive = pathname === href; // Compare with href to determine if active

  return (
    <li>
      <Link
        href={href}
        className={`flex items-center p-4 rounded-md transition duration-300 ${
          isActive
            ? "bg-[#C49A6C] text-white font-semibold shadow-md"
            : "text-white hover:bg-[#7A5230]"
        }`}
      >
        <span className="mr-3 text-xl">{icon}</span>
        <span className="text-lg font-medium">{label}</span>
      </Link>
    </li>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#5B3B1D] text-white h-screen flex flex-col fixed left-0 top-0 z-50 overflow-y-auto">
      <div className="p-6 text-center">
        <Image
          src="/images/logo.png"
          alt="BookNest Systems"
          width={96} // Set width for the image
          height={96} // Set height for the image
          className="mx-auto mb-4"
        />
        <h2 className="text-xl font-bold">BookNest Systems</h2>
      </div>
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-2">
          <SidebarItem icon={<MdDashboard />} label="Dashboard" href="/admin" />
          <SidebarItem icon={<MdPerson />} label="Users" href="/admin/user" />
          <SidebarItem icon={<FaBook />} label="Books" href="/admin/book" />
          <SidebarItem icon={<FaUsers />} label="Clubs" href="/admin/club" />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
