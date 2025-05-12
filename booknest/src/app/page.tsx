// app/page.tsx
import HeroSection from "@components/HeroSection";
import Navbar from "@components/Navbar";

export default function Home() {
  return (
    <div className="bg-[#4B3621] text-white min-h-screen">
      <Navbar />
      <HeroSection />
    </div>
  );
}
