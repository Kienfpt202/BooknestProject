import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex justify-center">
      <Image 
        src="/images/logo.png" 
        alt="BookNest Logo" 
        width={60} 
        height={60} 
        priority 
      />
    </div>
  );
};

export default Logo;
