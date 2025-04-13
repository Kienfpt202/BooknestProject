import Sidebar from "@components/admin/dashboard/Sidebar";
import Navbar from "@components/admin/dashboard/Navbar";
import BookTable from "@components/admin/book/BookTable";
import Pagination from "@components/admin/book/Pagination";

const BookPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-[#F5F5F5] p-6">
        <Navbar />
        <div className="mt-6">
          <BookTable />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default BookPage;