export const uploadToCloudinary = async (file: File): Promise<string> => {
  // Check if the file is a File object
  if (!(file instanceof File)) {
    throw new Error("Invalid file.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "booknest_uploads");

  try {
    // Send the file to Cloudinary
    const res = await fetch("https://api.cloudinary.com/v1_1/dwdj7ogvo/image/upload", {
      method: "POST",
      body: formData,
    });

    // Check if the Cloudinary response was successful
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error.message || "Upload failed");
    }

    // Get the response data from Cloudinary
    const data = await res.json();

    // Return the URL of the image stored on Cloudinary
    return data.secure_url;
  } catch (error) {
    // Check the error and provide a more detailed message
    console.error("Cloudinary Upload Error:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    } else {
      throw new Error("Failed to upload image. Please try again.");
    }
  }
};