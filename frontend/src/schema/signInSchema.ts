import { z } from "zod";

const signInSchema = z.object({
  email: z.string(),
  password: z.string().min(8, "Minimum length for password is 8"),
});

type SignInSchema = z.infer<typeof signInSchema>;

type SignInResponse = {
  success?: boolean;
  errors?: {
    name: string;
    message: string;
  };
};

export { signInSchema, type SignInResponse, type SignInSchema };
