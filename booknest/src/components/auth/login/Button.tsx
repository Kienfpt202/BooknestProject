import React from "react";

interface ButtonProps {
  text: string;
  type?: "submit" | "button" | "reset";
  variant: "primary" | "google";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  variant = "primary",
  onClick,
  className = "",
  disabled = false,
}) => {
  const baseStyle =
    "w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center";

  const styles: Record<ButtonProps["variant"], string> = {
    primary: "bg-[#442a1a] text-white hover:bg-[#5a3e2b]",
    google: "bg-white text-[#442a1a] border border-[#5a3e2b] hover:bg-[#f5e1c0] gap-2",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${styles[variant]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
