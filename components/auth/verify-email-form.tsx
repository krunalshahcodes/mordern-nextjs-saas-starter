"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { LuCheckCircle, LuLoader, LuXCircle } from "react-icons/lu";
import { buttonVariants } from "../ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useVerify } from "@/hooks/auth/use-verify";
import { cn } from "@/lib/utils";

const VerifyEmailForm = () => {
  const { token }: { token: string } = useParams();
  const { isSuccess, isError, isFetching } = useVerify(token);

  return (
    <Card className="mx-auto mt-8 w-full max-w-md">
      {isFetching && (
        <CardContent className="mt-8 flex flex-col items-center justify-center gap-8">
          <LuLoader className="h-16 w-16 animate-spin text-black" />
          <h2 className="text-center text-2xl font-bold text-black">
            Verifying your email address...
          </h2>
        </CardContent>
      )}
      {isSuccess && (
        <CardContent className="mt-8 flex flex-col items-center justify-center gap-8">
          <LuCheckCircle className="h-16 w-16 text-green-600" />
          <h2 className="text-center text-2xl font-bold text-green-600">
            Email verified sucessfully.
          </h2>
          <Link className={cn(buttonVariants())} href="/login">
            Back to Login
          </Link>
        </CardContent>
      )}
      {isError && (
        <CardContent className="mt-8 flex flex-col items-center justify-center gap-8">
          <LuXCircle className="h-16 w-16 text-red-600" />
          <h2 className="text-center text-2xl font-bold text-red-600">
            Invalid or expired verification token.
          </h2>
          <Link className={cn(buttonVariants())} href="/login">
            Back to Login
          </Link>
        </CardContent>
      )}
    </Card>
  );
};

export default VerifyEmailForm;
