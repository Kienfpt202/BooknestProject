import { ReactNode } from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#5A3E2B] p-4">
      <Image src="/images/logo.png" alt="Logo" width={80} height={80} className="mb-6" />
      <div className="bg-[#FDF6E3] p-6 rounded-lg shadow-lg w-full max-w-[400px]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
