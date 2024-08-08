import Link from "next/link";
import { SiNextdotjs } from "react-icons/si";
import VerifyEmailForm from "@/components/auth/verify-email-form";

const VerifyEmail = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4">
      <Link href="/">
        <SiNextdotjs className="h-16 w-16 text-primary" />
      </Link>
      <VerifyEmailForm />
    </div>
  );
};

export default VerifyEmail;
