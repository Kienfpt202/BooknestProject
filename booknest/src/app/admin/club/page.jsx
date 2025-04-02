import Sidebar from "@components/admin/dashboard/Sidebar";
import Navbar from "@components/admin/dashboard/Navbar";
import ClubTable from "@components/admin/club/ClubTable";
import Pagination from "@components/admin/club/Pagination";

const ClubPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-gray-100 p-6">
        <Navbar />
        <div className="mt-6">
          <ClubTable />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default ClubPage;