import Sidebar from "@components/admin/dashboard/Sidebar";
import Navbar from "@components/admin/dashboard/Navbar";
import Dashboard from "@components/admin/dashboard/Dashboard";

const AppLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
};

export default AppLayout;

