import { z } from "zod";

const signInSchema = z.object({
  email: z.string(),
  password: z.string().min(8, "Minimum length for password is 8"),
});

type SignInSchema = z.infer<typeof signInSchema>;

// this should be reworked to take in a user object with the appropriate properties
type SignInResponse = {
  success?: boolean;
};

export { signInSchema, type SignInResponse, type SignInSchema };
