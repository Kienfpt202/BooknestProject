import Image from "next/image";

interface ButtonProps {
  text: string;
  variant?: "primary" | "google";
  type?: "submit" | "button";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  text,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) => {
  const baseStyle =
    "w-full py-2 px-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center";

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
      {variant === "google" && (
        <Image
          src="/images/google-icon.png"
          alt="Google"
          width={20}
          height={20}
        />
      )}
      {text}
    </button>
  );
};

export default Button;
