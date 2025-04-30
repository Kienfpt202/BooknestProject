import Sidebar from "@components/admin/dashboard/Sidebar";
import Navbar from "@components/admin/dashboard/Navbar";
import BookTable from "@components/admin/book/BookTable";
import Pagination from "@components/admin/book/Pagination";
import Link from "next/link";  // Để sử dụng Link chuyển trang

const BookPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-[#F5F5F5] p-6">
        <Navbar />
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Book Management</h2>
            <Link href="/admin/book/create">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Create New Book</button>
            </Link>
          </div>
          <BookTable />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default BookPage;
