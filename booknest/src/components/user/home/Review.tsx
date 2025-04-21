import Image from "next/image";
import Link from "next/link"; // Import Link từ Next.js

interface ReviewProps {
  author: string;
  avatar: string;
  content: string;
  image?: string;
}

const Review: React.FC<ReviewProps> = ({ author, avatar, content, image }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      {/* Thông tin người đăng */}
      <div className="flex items-center mb-2">
        <Image
          src={avatar}
          alt={author}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        {/* Sử dụng Link trực tiếp mà không cần <a> */}
        <Link href={`/user/follower_profile`} className="font-semibold ml-3">
          {author}
        </Link>
      </div>

      {/* Nội dung bài viết */}
      <p className="text-gray-700">{content}</p>

      {/* Ảnh đính kèm nếu có */}
      {image && (
        <div className="mt-3">
          <Image
            src={image}
            alt="Post Image"
            width={500} // Định kích thước tối đa
            height={300}
            className="w-full rounded-md object-cover"
          />
        </div>
      )}

      {/* Công cụ tương tác */}
      <div className="flex justify-between mt-3 text-gray-500">
        <button className="hover:text-red-500 transition">👍 Like</button>
        <button className="hover:text-blue-500 transition">💬 Comment</button>
      </div>
    </div>
  );
};

export default Review;
