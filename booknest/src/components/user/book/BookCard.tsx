import Image from "next/image";
import Link from "next/link"; // Import Link từ next/link
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
    <Link href="/user/book/detail" passHref> {/* Dẫn đến trang chi tiết sách */}
      <div className="w-56 bg-[#F5ECE3] rounded-lg shadow-md overflow-hidden transition hover:shadow-lg hover:scale-105 cursor-pointer">
        {/* Ảnh bìa sách */}
        <div className="h-40 bg-gray-200 flex items-center justify-center relative">
          {cover ? (
            <Image
              src={cover}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
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
    </Link>
  );
};

export default BookCard;
