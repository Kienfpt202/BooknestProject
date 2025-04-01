interface ButtonProps {
  text: string;
  variant: "primary" | "google"; // Thêm các variant cần thiết
  type?: "button" | "submit" | "reset"; // Thêm prop type (có thể là tùy chọn)
}

const Button: React.FC<ButtonProps> = ({ text, variant, type = "button" }) => {
  return (
    <button type={type} className={`btn-${variant}`}>
      {text}
    </button>
  );
};

export default Button;
