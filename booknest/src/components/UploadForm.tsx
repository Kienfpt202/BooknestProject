"use client";
import { useState } from "react";
import Image from "next/image";
import { uploadToCloudinary } from "@lib/upload";

export default function UploadForm({ onUploadSuccess }: { onUploadSuccess: (url: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Vui lòng chọn một file!");
    setLoading(true);
    try {
      const url = await uploadToCloudinary(file);
      onUploadSuccess(url); // ✅ gửi URL về parent
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload thất bại! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {preview && (
        <div className="w-24 h-24 mt-2 relative">
          <Image src={preview} alt="Preview" fill className="rounded-full object-cover" />
        </div>
      )}
      <button
        onClick={handleUpload}
        className="px-3 py-1 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Đang upload..." : "Upload Avatar"}
      </button>
    </div>
  );
}