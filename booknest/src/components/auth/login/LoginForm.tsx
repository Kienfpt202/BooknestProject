import InputField from "@components/auth/login/InputField";
import Button from "@components/auth/login/Button";
import Link from "next/link";

const LoginForm = () => {
  return (
    <div className="flex justify-center items-center flex-grow p-4">
      <div className="w-full max-w-[400px] text-center">
        <div className="bg-[#f5e1c0] p-6 rounded-lg shadow-lg">
          <h2 className="text-[#5a3e2b] font-semibold text-lg mb-2">
            Welcome to BookNest system!
          </h2>
          <p className="text-[#5a3e2b] mb-4">Log into your account now!</p>

          <form className="space-y-4">
            <InputField label="Enter your name" type="text" name="username" />
            <InputField
              label="Enter Password"
              type="password"
              name="password"
              showEyeIcon
            />

            <p className="text-right text-sm">
              <Link
                href="/auth/forgot"
                className="text-[#5a3e2b] hover:underline"
              >
                Forgot Password?
              </Link>
            </p>

            <Button text="Sign in with Google" variant="google" />
            <Button text="Login" variant="primary" type="submit" />

            <p className="text-center text-sm text-[#5a3e2b] mt-4">
              First time with BookNest?{" "}
              <Link
                href="/auth/register"
                className="font-bold text-[#442a1a] hover:underline"
              >
                Register now!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
