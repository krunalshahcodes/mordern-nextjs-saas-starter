"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { LuLoader } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, loginSchemaType } from "@/lib/schemas/auth";

const LoginForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: loginSchemaType) => {
    setIsPending(true);
    await signIn("credentials", { ...values, redirect: false }).then((res) => {
      setIsPending(false);
      if (!res) {
        toast.error("Something went wrong!!");
        return;
      }
      if (res.error) {
        toast.error((res.code as string) || "Something went wrong!!");
        return;
      }
      router.push("/");
    });
  };

  const handleGoogle = async () => await signIn("google");

  return (
    <Card className="mx-auto mt-4 w-full max-w-md">
      <CardContent className="mt-8">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(handleLogin)}>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address*</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
              name="email"
            />
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between gap-2">
                    <span>Password*</span>
                    <Link className="text-primary" href="/forgot-password">
                      Forgot Password?
                    </Link>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
              name="password"
            />
            <Button className="w-full" type="submit">
              {isPending && <LuLoader className="mr-2 h-5 w-5 animate-spin" />}
              <span>Sign In</span>
            </Button>
            <Button
              className="w-full gap-2"
              type="button"
              variant="outline"
              onClick={handleGoogle}
            >
              <FcGoogle className="h-6 w-6" />
              <span>Sign in with Google</span>
            </Button>
            <p className="text-center">
              Don&apos;t have an account?{" "}
              <Link className="font-medium text-primary" href="/register">
                Sign Up
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
