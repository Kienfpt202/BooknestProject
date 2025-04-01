import Input from "./Input";
import Button from"./Button";
import Link from "next/link";

const RegisterForm = () => {
  return (
    <div className="text-center w-full">
      <p className="text-[#5B3A29] font-medium text-lg">Let’s sign up a new account</p>

      <div className="mt-4 space-y-4">
        <Input type="text" placeholder="Enter username" />
        <Input type="email" placeholder="Enter email" />
        <Input type="password" placeholder="Enter Password" isPassword />
        <Input type="password" placeholder="Confirm Password" isPassword />

        <Button text="Register" variant="primary" />
        <Button text="Sign up with Google" variant="google" />

        <p className="text-sm text-[#5B3A29] mt-4">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-bold text-[#442a1a] hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
