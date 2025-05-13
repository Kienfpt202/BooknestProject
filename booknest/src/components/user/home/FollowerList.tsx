// import Image from "next/image";

// const followers = [
//   { name: "Hoàng Huy", avatar: "/images/default-avatar.png" },
//   { name: "Quang Minh", avatar: "/images/default-avatar.png" },
//   { name: "Ngọc Lan", avatar: "/images/default-avatar.png" },
// ];

// const FollowerList = () => {
//   return (
//     <div className="bg-white shadow-md p-4 rounded-md w-60">
//       <h3 className="font-semibold text-gray-700 mb-3">Active followers</h3>
//       <ul>
//         {followers.map((follower, index) => (
//           <li key={index} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition">
//             <Image
//               src={follower.avatar}
//               alt={follower.name}
//               width={32}
//               height={32}
//               className="w-8 h-8 rounded-full object-cover"
//             />
//             <span className="text-gray-700">{follower.name}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FollowerList;

"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@lib/firebase";
import { useAuth } from "@context/usercontext"; // hoặc context của bạn
import Image from "next/image";

interface User {
  name: string;
  avatar: string;
}

const FollowerList = () => {
  const { currentUser } = useAuth(); // user.uid
  const [followers, setFollowers] = useState<User[]>([]);

  useEffect(() => {
    if (currentUser) {
      fetchFollowers(currentUser.uid);
    }
  }, [currentUser]);

  const fetchFollowers = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        const followerIds: string[] = data.followers || [];

        // Fetch all follower user data in parallel
        const followerPromises = followerIds.map((followerId) =>
          getDoc(doc(db, "users", followerId))
        );

        const followerDocs = await Promise.all(followerPromises);
        const followerData = followerDocs
          .filter((doc) => doc.exists())
          .map((doc) => {
            const data = doc.data();
            return {
              name: data.name || "Unknown",
              avatar: data.avatar || "/images/default-avatar.png",
            };
          });

        setFollowers(followerData);
      }
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-md w-60">
      <h3 className="font-semibold text-gray-700 mb-3">Active followers</h3>
      <ul>
        {followers.length === 0 ? (
          <p className="text-sm text-gray-500">No followers yet.</p>
        ) : (
          followers.map((follower, index) => (
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
          ))
        )}
      </ul>
    </div>
  );
};

export default FollowerList;
