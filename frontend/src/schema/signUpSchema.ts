import { z } from "zod";

// Fiels are automatically required
const signUpSchema = z
  .object({
    name: z.string(),
    email: z.string().email("Email is not entered correctly"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

type SignUpSchema = {
  signUpMethod: string;
  role: "user" | "admin";
} & z.infer<typeof signUpSchema>;

type SignUpResponse = {
  token: string;
  errors?: {
    error: string;
  }[];
};

export { signUpSchema, type SignUpSchema, type SignUpResponse };
