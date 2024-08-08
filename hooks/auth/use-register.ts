import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { registerSchemaType } from "@/lib/schemas/auth";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: registerSchemaType) =>
      axios.post(`/api/auth/register`, data),
  });
};
