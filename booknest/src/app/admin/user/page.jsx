import Sidebar from "@components/admin/dashboard/Sidebar";
import Navbar from "@components/admin/dashboard/Navbar";
import UserTable from "@components/admin/user/UserTable";
import Pagination from "@components/admin/user/Pagination";

const UserPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-gray-100 p-6">
        <Navbar />
        <div className="mt-6">
          <UserTable />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default UserPage;