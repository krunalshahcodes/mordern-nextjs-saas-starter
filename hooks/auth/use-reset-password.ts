import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { resetPasswordSchemaType } from "@/lib/schemas/auth";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: resetPasswordSchemaType) =>
      axios.post(`/api/auth/reset`, data),
  });
};
