"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface InputFieldProps {
  type: "text" | "email" | "password" | "number";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasToggle?: boolean;
  disabled?: boolean;
  name?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  hasToggle = false,
  disabled = false,
  name,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = hasToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      <input
        id={name}
        name={name}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full p-3 border border-gray-500 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5A3E2B] placeholder-gray-700 text-[#5A3E2B] ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label={placeholder}
      />
      {hasToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5A3E2B]"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeSlashIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
};

export default InputField;
