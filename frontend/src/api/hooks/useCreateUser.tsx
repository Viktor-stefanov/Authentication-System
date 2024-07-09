import { useMutation } from "@tanstack/react-query";
import { SignUpResponse, SignUpSchema } from "../../schema/signUpSchema";
import http from "..";

export default function useCreateUser() {
  return useMutation<SignUpResponse, Error, SignUpSchema>({
    mutationFn: (user): Promise<SignUpResponse> =>
      http.post<SignUpResponse>("/signUp", user).then((res) => res.data),
  });
}
