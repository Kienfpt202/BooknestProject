export const uploadToCloudinary = async (file: File): Promise<string> => {
  // Kiểm tra xem file có phải là đối tượng File không
  if (!(file instanceof File)) {
    throw new Error("File không hợp lệ.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "booknest_uploads");

  try {
    // Gửi file lên Cloudinary
    const res = await fetch("https://api.cloudinary.com/v1_1/dwdj7ogvo/image/upload", {
      method: "POST",
      body: formData,
    });

    // Kiểm tra xem phản hồi từ Cloudinary có thành công không
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error.message || "Upload failed");
    }

    // Lấy dữ liệu phản hồi từ Cloudinary
    const data = await res.json();

    // Trả về URL ảnh đã được lưu trữ trên Cloudinary
    return data.secure_url;
  } catch (error) {
    // Kiểm tra lỗi và cung cấp thông báo chi tiết hơn
    console.error("Cloudinary Upload Error:", error);
    if (error instanceof Error) {
      throw new Error(`Không thể tải lên ảnh: ${error.message}`);
    } else {
      throw new Error("Không thể tải lên ảnh. Vui lòng thử lại.");
    }
  }
};
