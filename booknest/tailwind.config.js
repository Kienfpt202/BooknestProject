/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        patrick: ["Patrick Hand", "cursive"], // Main font
        serif: ["Merriweather", "serif"], // Secondary font for book content
      },
      colors: {
        brownBg: "#4B3621",   // Main background color
        formBg: "#F5F1EB",    // Login form background color
        buttonBg: "#4B3621",  // Button background color
        textBrown: "#4B3621", // Main text color
        secondary: "#A67B5B", // Secondary color (soft, suitable for Bookish theme)
        highlight: "#D4A373", // Highlight color (like hover, important icons)
      },
      boxShadow: {
        card: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow effect
      },
      borderRadius: {
        xl: "12px", // Slight rounded corners for cards, buttons
      },
    },
  },
  plugins: [],
};