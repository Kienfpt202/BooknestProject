export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "booknest_uploads"); // Thay bằng Upload Preset của bạn

  const res = await fetch("https://api.cloudinary.com/v1_1/dwdj7ogvo/image/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
      throw new Error("Failed to upload image");
  }

  const data = await res.json();
  return data.secure_url; // Trả về URL ảnh đã upload
};
