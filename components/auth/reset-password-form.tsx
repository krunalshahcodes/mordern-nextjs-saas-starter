"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
import { useResetPassword } from "@/hooks/auth/use-reset-password";
import {
  resetPasswordSchema,
  resetPasswordSchemaType,
} from "@/lib/schemas/auth";

const ResetPasswordForm = () => {
  const { token }: { token: string } = useParams();
  const router = useRouter();
  const { mutate, isPending } = useResetPassword();
  const form = useForm<resetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token,
    },
  });

  const handleReset = async (values: resetPasswordSchemaType) =>
    mutate(values, {
      onSuccess: (res) => {
        toast.success(res.data.message);
        router.push("/login");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Something went wrong!!");
      },
    });

  return (
    <Card className="mx-auto mt-4 w-full max-w-md">
      <CardContent className="mt-8">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(handleReset)}>
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
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password*</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
              name="confirmPassword"
            />
            <Button className="w-full" type="submit">
              {isPending && <LuLoader className="mr-2 h-5 w-5 animate-spin" />}
              <span>Continue</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
