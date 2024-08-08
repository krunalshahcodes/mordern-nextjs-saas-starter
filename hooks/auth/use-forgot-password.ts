import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { forgotPasswordSchemaType } from "@/lib/schemas/auth";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: forgotPasswordSchemaType) =>
      axios.post(`/api/auth/forgot-password`, data),
  });
};
