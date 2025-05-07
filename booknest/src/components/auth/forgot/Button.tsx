import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) => {
  const baseStyle =
    "w-full py-3 rounded-lg font-semibold transition text-white bg-[#5A3E2B] hover:bg-[#4B3224]";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
