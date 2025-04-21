"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function ProfileHeader() {
  const pathname = usePathname();

  return (
    <div className="relative bg-gradient-to-r from-[#f2e3cd] to-[#e0c197] rounded-b-3xl shadow-lg p-8 text-[#5a3b2e]">
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

      {/* Name & Followers */}
      <div className="flex flex-col items-center pt-12 space-y-2">
        <h2 className="text-2xl font-semibold font-serif">Nguyen Chi Kien</h2>
        <div className="flex gap-16 pt-2 text-sm font-medium">
          <p>
            Followers: <span className="font-bold">5</span>
          </p>
          <p>
            Followings: <span className="font-bold">8</span>
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 text-center items-center font-serif gap-4">
        {/* Book list */}
        <div>
          <p className="mb-2">Your book lists:</p>
          <Link href="/user/profile/book_list">
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

        {/* Review list */}
        <div>
          <p className="mb-2">Your book reviews:</p>
          <Link href="/user/profile/">
            <button
              className={`px-4 py-2 rounded-lg shadow transition-all 
                ${
                  pathname === "/profile/review"
                    ? "bg-[#5a3b2e] text-white"
                    : "bg-[#d6b28c] hover:bg-[#e4c5a3] text-[#5a3b2e]"
                }`}
            >
              Show review
            </button>
          </Link>
        </div>

        {/* Personal info */}
        <div>
          <p className="mb-2">Your Personal information:</p>
          <Link href="/user/profile/modify">
            <button
              className={`px-4 py-2 rounded-lg shadow transition-all 
                ${
                  pathname === "/profile/modify"
                    ? "bg-[#5a3b2e] text-white"
                    : "bg-[#d6b28c] hover:bg-[#e4c5a3] text-[#5a3b2e]"
                }`}
            >
              Edit information
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
