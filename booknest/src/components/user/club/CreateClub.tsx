"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@context/usercontext"; // Giả sử bạn có context user
import { createClub } from "@lib/firestore"; // Import hàm createClub từ firestore

const CreateClub: React.FC = () => {
  const [clubName, setClubName] = useState("Tran Van Tuong");
  const [description, setDescription] = useState("bla bla bla");
  const [scope, setScope] = useState("Private");
  const [loading, setLoading] = useState(false); // Thêm state loading
  const [error, setError] = useState<string | null>(null); // Thêm state error để hiển thị thông báo lỗi

  const router = useRouter();
  const { currentUser } = useAuth(); // Lấy uid từ context

  const handleCreateClub = async () => {
    if (!currentUser) return;

    // Validation đơn giản
    if (!clubName.trim() || !description.trim()) {
      setError("Please fill out all fields");
      return;
    }

    setLoading(true);
    setError(null); // Reset lỗi khi bắt đầu tạo câu lạc bộ

    try {
      // Gọi hàm createClub để tạo câu lạc bộ
      const clubId = await createClub(clubName, description, scope === "Private", currentUser.uid);

      // Điều hướng đến trang discussion, truyền kèm clubId
      router.push(`/user/club/discussion?clubId=${clubId}`);
    } catch (error) {
      console.error("Error creating club:", error);
      setError("Failed to create the club. Please try again."); // Hiển thị thông báo lỗi
    } finally {
      setLoading(false); // Reset trạng thái loading sau khi hoàn thành
    }
  };

  return (
    <div className="flex flex-col items-start p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">Create club</h2>
      <div className="bg-white rounded-md shadow p-6 w-full max-w-md space-y-4">

        {/* Club Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Club name</label>
          <input
            type="text"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Scope */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Scope</label>
          <select
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Buttons */}
        <div className="flex justify-start gap-2 mt-6">
          <button
            onClick={() => router.push("/user/club")}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={handleCreateClub}
            disabled={loading} // Vô hiệu hóa nút khi đang tạo câu lạc bộ
            className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-950 hover:bg-amber-900 disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateClub;
