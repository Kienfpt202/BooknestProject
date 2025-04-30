'use client';

import { useRouter } from "next/navigation";

interface StatsCardProps {
  count: number;
  label: string;
  href: string; // thêm prop đường dẫn đến trang tương ứng
}

const StatsCard: React.FC<StatsCardProps> = ({ count, label, href }) => {
  const router = useRouter();

  return (
    <div className="bg-[#6B4226] text-white w-full md:w-56 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold">{count}</h2>
      <h3 className="text-lg font-semibold">{label}</h3>

      <div
        onClick={() => router.push(href)}
        className="bg-white text-[#6B4226] p-2 mt-4 flex items-center justify-between rounded-md cursor-pointer transition-all hover:bg-[#EADBCF] hover:text-[#4B2F1B]"
      >
        <span>More</span>
        <span>➡</span>
      </div>
    </div>
  );
};

export default StatsCard;
