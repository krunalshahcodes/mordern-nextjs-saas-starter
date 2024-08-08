import Link from "next/link";
import { SiNextdotjs } from "react-icons/si";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";

const ForgotPassword = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4">
      <Link href="/">
        <SiNextdotjs className="h-16 w-16 text-primary" />
      </Link>
      <h1 className="mt-6 text-2xl font-bold text-black">Forgot Password</h1>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
