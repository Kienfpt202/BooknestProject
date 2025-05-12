"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@lib/firebase";

export default function PersonalInfoForm() {
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "/avatar.png",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Lấy thông tin người dùng khi đăng nhập
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            name: data.name || "",
            avatar: data.avatar || "/avatar.png",
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!userId) return;
    await updateDoc(doc(db, "users", userId), formData);
    setIsEditing(false);
    alert("Personal information updated.");
  };

  // Xử lý upload ảnh lên Cloudinary
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formDataCloud = new FormData();
    formDataCloud.append("file", file);
    formDataCloud.append("upload_preset", "YOUR_UPLOAD_PRESET"); // thay bằng preset của bạn

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", {
        method: "POST",
        body: formDataCloud,
      });

      const data = await res.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, avatar: data.secure_url }));
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-md">
      <h3 className="text-xl font-bold text-center text-[#6b3e2e] mb-6">
        Personal information:
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-[#6b3e2e] mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            readOnly={!isEditing}
            className="w-full rounded-md border px-3 py-2 bg-gray-100"
          />
        </div>

        <div className="text-center">
          <label className="block text-[#6b3e2e] mb-2">Avatar</label>
          <div className="flex justify-center items-center gap-4">
            <img
              src={formData.avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border"
            />
            {isEditing && (
              <input type="file" accept="image/*" onChange={handleAvatarUpload} />
            )}
          </div>
          {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
        </div>

        <div className="flex justify-between pt-6">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-[#d6b28c] px-4 py-2 rounded-lg text-[#5a3b2e] shadow hover:bg-[#e4c5a3]"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-[#d6b28c] px-4 py-2 rounded-lg text-[#5a3b2e] shadow hover:bg-[#e4c5a3]"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#d6b28c] px-4 py-2 rounded-lg text-[#5a3b2e] shadow hover:bg-[#e4c5a3]"
              >
                Edit
              </button>
              <button
                onClick={() => window.history.back()}
                className="bg-[#d6b28c] px-4 py-2 rounded-lg text-[#5a3b2e] shadow hover:bg-[#e4c5a3]"
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
