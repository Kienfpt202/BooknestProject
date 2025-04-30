"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function ProfileHeader() {
  const pathname = usePathname();

  // Trạng thái follow
  const [isFollowed, setIsFollowed] = useState(false);

  // Xử lý khi nhấn nút follow/unfollow
  const handleFollowClick = () => {
    if (!isFollowed) {
      const confirmed = window.confirm("Do you want to follow this user?");
      if (confirmed) {
        setIsFollowed(true);
      }
    } else {
      const confirmed = window.confirm("Do you want to unfollow this user?");
      if (confirmed) {
        setIsFollowed(false);
      }
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-[#f2e3cd] to-[#e0c197] rounded-b-3xl shadow-lg p-8 text-[#5a3b2e] font-serif">
      {/* Avatar */}
      <div className="absolute left-1/2 -top-10 transform -translate-x-1/2">
        <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden relative">
          <Image
            src="/avatar.png"
            alt="User Avatar"
            fill
            sizes="80px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Name + followers */}
      <div className="flex flex-col items-center pt-12 space-y-2">
        <h2 className="text-2xl font-semibold">Nguyen Chi Kien</h2>
        <div className="flex gap-10 pt-1 text-sm font-medium">
          <p>
            Followers: <span className="font-bold">5</span>
          </p>
          <p>
            Followings: <span className="font-bold">8</span>
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-center items-center gap-6">
        {/* Book review list */}
        <div>
          <p className="mb-2">Your book reviews:</p>
          <Link href="/user/follower_profile">
            <button
              className={`px-4 py-2 rounded-lg shadow transition-all 
                ${
                  pathname === "/user/profile"
                    ? "bg-[#5a3b2e] text-white"
                    : "bg-[#d6b28c] hover:bg-[#e4c5a3] text-[#5a3b2e]"
                }`}
            >
              Show Review
            </button>
          </Link>
        </div>

        {/* Follow Button */}
        <div>
          <p className="mb-2">&nbsp;</p>
          <button
            onClick={handleFollowClick}
            className={`px-4 py-2 rounded-lg shadow transition-all font-medium
              ${
                isFollowed
                  ? "bg-green-200 text-green-700 hover:bg-green-300"
                  : "bg-[#d6b28c] text-[#5a3b2e] hover:bg-[#e4c5a3]"
              }`}
          >
            {isFollowed ? "Followed" : "Follow"}
          </button>
        </div>
        <div>
          <p className="mb-2">Your book lists:</p>
          <Link href="/user/follower_profile/book_list">
            <button
              className={`px-4 py-2 rounded-lg shadow transition-all 
                ${
                  pathname === "/profile/book_list"
                    ? "bg-[#5a3b2e] text-white"
                    : "bg-[#d6b28c] hover:bg-[#e4c5a3] text-[#5a3b2e]"
                }`}
            >
              Show List
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
