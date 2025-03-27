"use client";
import { useState } from "react";
import Image from "next/image";
import { uploadToCloudinary } from "lib/upload";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
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
      setImageUrl(url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload thất bại! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <input type="file" onChange={handleFileChange} />
      {preview && (
        <div className="w-32 h-32 mt-2 relative">
          <Image src={preview} alt="Preview" layout="fill" objectFit="cover" className="rounded-md" />
        </div>
      )}
      <button 
        onClick={handleUpload} 
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        disabled={loading}
      >
        {loading ? "Đang upload..." : "Upload Ảnh"}
      </button>
      {imageUrl && <p>URL ảnh: <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a></p>}
    </div>
  );
}
