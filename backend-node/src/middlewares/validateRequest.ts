import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { ZodError, type ZodSchema } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(8, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password is required" }),
    authMethod: z.enum(["form", "github", "google"]),
    role: z.enum(["user", "admin"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(8, { message: "Password is required" }),
});

export const validateRequest =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = schema.parse(req.body);
      req.user = user;
      next();
    } catch (e) {
      if (e instanceof ZodError)
        return res.status(400).json(
          e.issues.map((issue) => ({
            [issue.path[0]]:
              issue.message === "Required"
                ? "Field is required"
                : issue.message,
          }))
        );
      next(e);
    }
  };
