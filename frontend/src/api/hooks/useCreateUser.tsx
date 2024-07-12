import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { SignUpResponse, SignUpSchema } from "../../schema/signUpSchema";
import http from "..";
import { AxiosError } from "axios";

export type SignUpError = {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
} | null;

export default function useCreateUser(): UseMutationResult<
  SignUpResponse,
  AxiosError<SignUpError>,
  SignUpSchema
> {
  return useMutation<SignUpResponse, AxiosError<SignUpError>, SignUpSchema>({
    mutationFn: async (user): Promise<SignUpResponse> => {
      const result = await http.post<SignUpResponse>("/signUp", user);
      return result.data;
    },
  });
}
