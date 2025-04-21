
import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import ProfileHeader from "@components/user/profile/edit-profile/ProfileHeader";
import PersonalInfoForm from "@components/user/profile/edit-profile/PersonalInfoForm";

export default function ProfilePage() {
  return (
    <div className="flex h-screen bg-[#eef0f3] overflow-hidden">
      {/* Sidebar bên trái */}
      <div className="w-[240px] h-full shadow-md bg-white">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Navbar cố định trên cùng */}
        <div className="w-full h-[64px] shadow-sm bg-white z-10">
          <Navbar />
        </div>

        {/* Nội dung chính nằm dưới navbar */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center space-y-8">
          {/* Header hiển thị thông tin người dùng */}
          <ProfileHeader />

          {/* Form chỉnh sửa thông tin */}
          <PersonalInfoForm />
        </div>
      </div>
    </div>
  );
}
