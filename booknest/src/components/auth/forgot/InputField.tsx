"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface InputFieldProps {
  type: "text" | "email" | "password" | "number"; // Giới hạn các loại input hợp lệ
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange, hasToggle = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = hasToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-500 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5A3E2B] placeholder-gray-700"
      />
      
      {hasToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5A3E2B]"
        >
          {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
};

export default InputField;
