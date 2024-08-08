import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useVerify = (token: string) => {
  return useQuery({
    queryKey: ["verify", token],
    queryFn: () => axios.get(`/api/auth/verify`, { params: { token } }),
    retry: 0,
  });
};
