import Image from "next/image";

const followers = [
  { name: "Hoàng Huy", avatar: "/images/default-avatar.png" },
  { name: "Quang Minh", avatar: "/images/default-avatar.png" },
  { name: "Ngọc Lan", avatar: "/images/default-avatar.png" },
];

const FollowerList = () => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md w-60">
      <h3 className="font-semibold text-gray-700 mb-3">Active followers</h3>
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
    </div>
  );
};

export default FollowerList;
