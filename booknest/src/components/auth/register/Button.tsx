import Image from "next/image";

type ButtonProps = {
  text: string;
  variant: "primary" | "google";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

const Button = ({ text, variant, className = "", onClick }: ButtonProps) => {
  const baseStyle =
    "w-full py-2 px-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center";

  const styles: Record<ButtonProps["variant"], string> = {
    primary: "bg-[#442a1a] text-white hover:bg-[#5a3e2b]",
    google:
      "bg-white text-[#442a1a] border border-[#5a3e2b] hover:bg-[#f5e1c0] flex gap-2",
  };

  return (
    <button
      className={`${baseStyle} ${styles[variant]} ${className}`}
      onClick={onClick}
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
