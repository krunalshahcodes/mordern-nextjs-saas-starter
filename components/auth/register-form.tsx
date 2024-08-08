"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
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
import { useRegister } from "@/hooks/auth/use-register";
import { registerSchema, registerSchemaType } from "@/lib/schemas/auth";

const RegisterForm = () => {
  const router = useRouter();
  const { mutate, isPending } = useRegister();
  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleRegister = async (values: registerSchemaType) =>
    mutate(values, {
      onSuccess: (res) => {
        toast.success(res.data.message);
        router.push("/login");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Something went wrong!!");
      },
    });

  const handleGoogle = async () => await signIn("google");

  return (
    <Card className="mx-auto mt-4 w-full max-w-md">
      <CardContent className="mt-8">
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleRegister)}
          >
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
              name="name"
            />
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
                  <FormLabel>Password*</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
              name="password"
            />
            <p className="text-center text-sm">
              By signing up, I agree to the{" "}
              <Link className="underline" href="/privacy-policy">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link className="underline" href="/terms-of-service">
                Terms of Service
              </Link>
              .
            </p>
            <Button className="w-full" type="submit">
              {isPending && <LuLoader className="mr-2 h-5 w-5 animate-spin" />}
              <span>Sign Up</span>
            </Button>
            <Button
              className="w-full gap-2"
              type="button"
              variant="outline"
              onClick={handleGoogle}
            >
              <FcGoogle className="h-6 w-6" />
              <span>Sign up with Google</span>
            </Button>
            <p className="text-center">
              Already have an account?{" "}
              <Link className="font-medium text-primary" href="/login">
                Sign In
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
