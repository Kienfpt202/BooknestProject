"use client";
import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import ProfileHeader from '@components/user/profile/edit-profile/ProfileHeader';
import PersonalInfoForm from '@components/user/profile/edit-profile/PersonalInfoForm';

export default function ProfilePage() {
    return (
      <div className="flex h-screen bg-[#f9f9f9]">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="p-6 space-y-8">
            <ProfileHeader />
            <div className="flex justify-center">
              <PersonalInfoForm />
            </div>
          </div>
        </div>
      </div>
    );
  }