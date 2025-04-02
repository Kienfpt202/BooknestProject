import { FaEye, FaCalendarAlt } from "react-icons/fa";

interface BookCardProps {
  title: string;
  author: string;
  cover?: string; // Ảnh bìa sách (tùy chọn)
  views: number;
  date: string;
}

const BookCard = ({ title, author, cover, views, date }: BookCardProps) => {
  return (
    <div className="w-56 bg-[#F5ECE3] rounded-lg shadow-md overflow-hidden transition hover:shadow-lg hover:scale-105">
      {/* Ảnh bìa sách */}
      <div className="h-40 bg-gray-200 flex items-center justify-center">
        {cover ? (
          <img src={cover} alt={title} className="h-full w-full object-cover" />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>

      {/* Nội dung sách */}
      <div className="p-3 text-[#8B5E3B]">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-sm text-[#6A3E1E]">{author}</p>

        {/* Thông tin lượt xem & ngày đăng */}
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="flex items-center gap-1">
            <FaEye /> {views}
          </span>
          <span className="flex items-center gap-1">
            <FaCalendarAlt /> {date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
