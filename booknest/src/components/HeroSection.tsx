import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-[#4B3621] text-white py-20 px-8 sm:px-20 flex flex-col md:flex-row items-center justify-between gap-12">
      {/* Left content */}
      <div className="flex-1 space-y-6">
        <div className="inline-flex items-center bg-[#3b2817] text-[#C49A6C] px-3 py-1 rounded-full text-sm">
          Welcome to BookNest Community
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-[#C49A6C]">
          Discover<br />Endless Stories<br />and Knowledge
        </h1>
      </div>

      {/* Right content */}
      <div className="flex-1 max-w-xl space-y-6">
        <p className="text-[#F5E9DA] text-base sm:text-lg">
          At BookNest, we bring book lovers together. Share reviews, join clubs, and explore your next favorite read.
        </p>
        <div className="flex gap-4">
          <Link href="/user/book">
            <button className="bg-[#4B3621] border border-[#C49A6C] text-[#C49A6C] px-6 py-3 rounded-full font-semibold transition duration-300 hover:bg-[#C49A6C] hover:text-[#4B3621] hover:scale-105">
              Explore More!
            </button>
          </Link>
          <Link href="/auth/login">
            <button className="bg-[#4B3621] border border-[#C49A6C] text-[#C49A6C] px-6 py-3 rounded-full font-semibold transition duration-300 hover:bg-[#C49A6C] hover:text-[#4B3621] hover:scale-105">
              Join Now!
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
