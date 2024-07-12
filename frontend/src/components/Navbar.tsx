import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-white font-bold text-xl">Logo</span>
            </div>

            {/* Menu Icon - Mobile */}
            <div className="block md:hidden">
              <button
                className="text-gray-300 hover:text-white focus:outline-none"
                onClick={toggleMenu}
              >
                {/* Insert SVG icon here */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <ul className="flex space-x-4">
                <li>
                  <Link
                    to="/signIn"
                    className="text-gray-200 hover:text-white text-xl"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signUp"
                    className="text-gray-200 hover:text-white text-xl"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Dropdown menu */}
          {showMenu && (
            <div className="md:hidden mt-2">
              <ul className="flex flex-col space-y-2">
                <li>
                  <Link to="/signIn" className="text-gray-200 hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signUp" className="text-gray-200 hover:text-white">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}
