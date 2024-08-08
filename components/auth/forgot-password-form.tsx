"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { useForgotPassword } from "@/hooks/auth/use-forgot-password";
import {
  forgotPasswordSchema,
  forgotPasswordSchemaType,
} from "@/lib/schemas/auth";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const { mutate, isPending } = useForgotPassword();
  const form = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPassword = async (values: forgotPasswordSchemaType) =>
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
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleForgotPassword)}
          >
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

export default ForgotPasswordForm;
