import Link from "next/link";
import { SiNextdotjs } from "react-icons/si";
import LoginForm from "@/components/auth/login-form";

const Login = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4">
      <Link href="/">
        <SiNextdotjs className="h-16 w-16 text-primary" />
      </Link>
      <h1 className="mt-6 text-2xl font-bold text-black">
        Sign in to Nextjs SaaS
      </h1>
      <LoginForm />
    </div>
  );
};

export default Login;
