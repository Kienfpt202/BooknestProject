import { useState } from "react";

type InputFieldProps = {
  label: string;
  type: "text" | "password"|"email";
  name: string;
  showEyeIcon?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({ label, type, name, showEyeIcon = false }: InputFieldProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-[#5a3e2b] font-semibold mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={showEyeIcon ? (isVisible ? "text" : "password") : type}
          className="w-full p-2 border border-[#5a3e2b] rounded-md bg-white text-[#5a3e2b] placeholder-[#8b6f47] focus:outline-none focus:ring-2 focus:ring-[#442a1a]"
          placeholder={label}
          aria-label={label}
        />
        {showEyeIcon && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-[#5a3e2b]"
            onClick={() => setIsVisible(!isVisible)}
            aria-label="Toggle password visibility"
          >
            {isVisible ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12l-3 3m0 0l-3-3m3 3V9m-7 3a9 9 0 1118 0 9 9 0 01-18 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12s3-7 9-7 9 7 9 7-3 7-9 7-9-7-9-7z" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
