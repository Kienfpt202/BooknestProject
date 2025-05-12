import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-8 sm:px-20 py-4 bg-[#4B3621]">
      {/* Logo */}
      <Link href="/">
        <Image src="/images/logo.png" alt="BookNest Logo" width={120} height={40} />
      </Link>

      {/* Right menu */}
      <div className="flex items-center gap-4">
        <Link href="/user">
          <button className="bg-[#4B3621] border border-[#C49A6C] text-[#C49A6C] px-4 py-2 rounded-full font-medium text-sm transition duration-300 hover:bg-[#C49A6C] hover:text-[#4B3621] hover:scale-105">
            Explore More!
          </button>
        </Link>

        <Link href="/auth/login">
          <button className="bg-[#4B3621] border border-[#C49A6C] text-[#C49A6C] px-4 py-2 rounded-full font-medium text-sm transition duration-300 hover:bg-[#C49A6C] hover:text-[#4B3621] hover:scale-105">
            Join Now!
          </button>
        </Link>
      </div>
    </header>
  );
}
