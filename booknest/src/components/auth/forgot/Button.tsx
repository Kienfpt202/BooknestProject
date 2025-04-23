import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({ children, type = "button" }: ButtonProps) => { 
  return (
    <button
      type={type}
      className="w-full py-3 bg-[#5A3E2B] text-white rounded-lg font-semibold hover:bg-[#4B3224] transition"
    >
      {children}
    </button>
  );
};

export default Button;
