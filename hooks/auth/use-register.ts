import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type registerSchemaType = z.infer<typeof registerSchema>;

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: registerSchemaType) =>
      axios.post(`/api/auth/register`, data),
  });
};
