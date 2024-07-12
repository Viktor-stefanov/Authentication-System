import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="max-w-md mx-auto mt-[10vh] p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            autoComplete="email"
            className="mt-1 block w-full px-3 py-2 border borde-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Password: </label>
          <input
            type="password"
            autoComplete="current-password"
            className="mt-1 block w-full px-3 py-2 border borde-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
        <div className="mt-2">
          <Link to="/signUp">Don't have an account? Register</Link>
        </div>
      </form>
    </div>
  );
}
