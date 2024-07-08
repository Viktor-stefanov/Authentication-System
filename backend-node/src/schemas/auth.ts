import { z } from "zod";

// Fiels are automatically required
export const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
    signUpMethod: z.enum(["google", "facebook", "x", "email", "github"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const validateSignUp = (data: SignUpSchema) => {
  const result = signUpSchema.safeParse(data);
  if (!result.success) {
    return result.error.issues.map((issue) => {
      return { [issue.path[0]]: issue.message };
    });
  }
  return [];
};