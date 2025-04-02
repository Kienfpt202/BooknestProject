import Image from "next/image";

const followers = [
  { name: "Hoàng Huy", avatar: "/images/avatar1.jpg" },
  { name: "Quang Minh", avatar: "/images/avatar2.jpg" },
  { name: "Ngọc Lan", avatar: "/images/avatar3.jpg" },
];

const FollowerList = () => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md w-60">
      {/* Tiêu đề */}
      <h3 className="font-semibold text-gray-700 mb-3">followers Active</h3>

      {/* Danh sách follower */}
      <ul>
        {followers.map((follower, index) => (
          <li key={index} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition">
            <Image
              src={follower.avatar}
              alt={follower.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-gray-700">{follower.name}</span>
          </li>
        ))}
      </ul>

      {/* Nút thêm bài viết */}
      <button className="mt-3 w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
        + New Review
      </button>
    </div>
  );
};

export default FollowerList;
