import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema, type SignUpSchema } from "../schema/signUpSchema";
import useCreateUser, { SignUpError } from "../api/hooks/useCreateUser";
import { RotateLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [error, setError] = useState<SignUpError>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const { mutate, isPending } = useCreateUser();

  const onSubmit = async (userData: SignUpSchema) => {
    mutate(
      { ...userData, signUpMethod: "email", role: "user" },
      {
        onError: (error) => {
          if (error.response && error.response.data)
            setError(error.response.data);
          setTimeout(() => setError(null), 3000);
        },
        onSuccess: (result) => {
          if (result) localStorage.setItem("user", result.token);
          navigate("/");
        },
      }
    );
  };

  return isPending ? (
    <div className="flex justify-center items-center h-[100vh]">
      <RotateLoader color="#333" className="mb-8" size={128} />
    </div>
  ) : (
    <div className="max-w-md mx-auto mt-[10vh] p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full name:
          </label>
          <input
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type="text"
            autoComplete="name"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          {error?.name && <p className="text-red-500">{error.name}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            type="email"
            autoComplete="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          {error?.email && <p className="text-red-500">{error.email}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            autoComplete="new-password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          {error?.password && <p className="text-red-500">{error.password}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            autoComplete="new-password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
          {error?.confirmPassword && (
            <p className="text-red-500">{error.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isSubmitting || isPending}
        >
          Register
        </button>
        <div className="mt-2">
          <Link to="/signIn">Already have an account? Sign in</Link>
        </div>
      </form>
    </div>
  );
}
