/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          patrick: ["Patrick Hand", "cursive"], // Font chữ chủ đạo
          serif: ["Merriweather", "serif"], // Font chữ phụ cho nội dung sách
        },
        colors: {
          brownBg: "#4B3621",  // Màu nền chính
          formBg: "#F5F1EB",   // Màu nền form login
          buttonBg: "#4B3621", // Màu nền button
          textBrown: "#4B3621", // Màu chữ chính
          secondary: "#A67B5B", // Màu phụ (nhẹ nhàng, phù hợp với Bookish theme)
          highlight: "#D4A373", // Màu nhấn (như hover, icon quan trọng)
        },
        boxShadow: {
          card: "0 4px 10px rgba(0, 0, 0, 0.1)", // Hiệu ứng đổ bóng nhẹ
        },
        borderRadius: {
          xl: "12px", // Bo góc nhẹ cho card, button
        },
      },
    },
    plugins: [],
  };
  