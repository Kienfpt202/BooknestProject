interface StatsCardProps {
  count: number;     // Chỉ định kiểu cho count là number
  label: string;     // Chỉ định kiểu cho label là string
}

const StatsCard: React.FC<StatsCardProps> = ({ count, label }) => {
  return (
    <div className="bg-[#6B4226] text-white w-full md:w-56 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold">{count}</h2>
      <h3 className="text-lg font-semibold">{label}</h3>
      <div className="bg-white text-[#6B4226] p-2 mt-4 flex items-center justify-between rounded-md cursor-pointer">
        <span>More</span>
        <span>➡</span>
      </div>
    </div>
  );
};


export default StatsCard;