import React from "react";

interface FloatingButtonProps {
  onClick: () => void; // Khai báo kiểu cho onClick là một hàm không nhận đối số và không trả về giá trị (void)
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-600"
    >
      +
    </button>
  );
};

export default FloatingButton;