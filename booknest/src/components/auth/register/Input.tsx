import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  disabled?: boolean;
}

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  isPassword = false,
  disabled = false,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full p-3 border border-[#8B6F47] rounded-md focus:outline-none focus:ring-2 focus:ring-[#5B3A29] text-[#5B3A29] bg-[#FAE8D4] ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
      {isPassword && (
        <button
          type="button"
          className="absolute right-3 top-3 text-[#5B3A29]"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          disabled={disabled}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};

export default Input;
