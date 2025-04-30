import Sidebar from "@components/admin/dashboard/Sidebar";
import Navbar from "@components/admin/dashboard/Navbar";
import CreateBookForm from "@components/admin/book/CreateBookForm"; // Đây là component form tạo sách mới

const CreateBookLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-[#F5F5F5] p-6">
        <Navbar />
        <div className="mt-6">
          {/* Tạo Form tạo sách mới */}
          <CreateBookForm />
        </div>
      </div>
    </div>
  );
};

export default CreateBookLayout;