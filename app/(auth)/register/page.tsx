import Link from "next/link";
import { SiNextdotjs } from "react-icons/si";
import RegisterForm from "@/components/auth/register-form";

const Register = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4">
      <Link href="/">
        <SiNextdotjs className="h-16 w-16 text-primary" />
      </Link>
      <h1 className="mt-6 text-2xl font-bold text-black">
        Sign up for Nextjs SaaS
      </h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
