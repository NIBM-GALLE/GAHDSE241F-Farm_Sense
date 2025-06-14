import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import userPng from "../assets/images/user.png";
import { useUserStore } from "@/stores/useUserStore";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useUserStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout(navigate);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Helper to check if a path is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/70 border-b border-gray-300 shadow-sm dark:bg-gray-900 dark:border-none">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            FarmSense
          </span>
        </Link>

        {/* Right Section */}
        <div className="relative flex md:order-2 items-center gap-3">
          <div className="mx-2">
            <ModeToggle />
          </div>

          {!user && (
            <Link
              to="/login"
              className="hidden md:inline-flex items-center px-4 py-2 text-md font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-gray-300"
            >
              Sign In
            </Link>
          )}

          {user && (
            <>
              {/* User Menu Button */}
              <button
                type="button"
                className="flex text-sm bg-green-600 rounded-full focus:ring-2 focus:ring-green-300 dark:focus:ring-gray-300 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-15 h-10 rounded-full"
                  src={user.image || userPng}
                  alt="User"
                />
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50 top-10">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-black font-poppins">
                      {user.name || "Username"}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-700 font-poppins">
                      {user.email || "user@example.com"}
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-green-700 hover:bg-gray-100 dark:hover:bg-green-700 dark:text-gray-700 dark:hover:text-white"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    {[
                      "main-admin",
                      "ResearchDivisionAdmin",
                      "sub-center-admin",
                      "visit-agent",
                    ].includes(user.role) && (
                      <li>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-green-700 hover:bg-gray-100 dark:hover:bg-green-700 dark:text-gray-700 dark:hover:text-white"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}

                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-green-700 hover:bg-gray-100 dark:hover:bg-green-700 dark:text-gray-700 dark:hover:text-white"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="navbar-user"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`items-center justify-between ${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 rounded-sm md:p-0 font-semibold ${
                  isActive("/")
                    ? "text-green-700 dark:text-green-400 underline underline-offset-4"
                    : "text-gray-900 md:bg-transparent md:text-green-800/80 md:dark:text-green-400/80"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`block py-2 px-3 rounded-sm md:p-0 font-semibold ${
                  isActive("/about")
                    ? "text-green-700 dark:text-green-400 underline underline-offset-4"
                    : "text-gray-900 md:bg-transparent md:text-green-800/80 md:dark:text-green-400/80"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className={`block py-2 px-3 rounded-sm md:p-0 font-semibold ${
                  isActive("/services")
                    ? "text-green-700 dark:text-green-400 underline underline-offset-4"
                    : "text-gray-900 md:bg-transparent md:text-green-800/80 md:dark:text-green-400/80"
                }`}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`block py-2 px-3 rounded-sm md:p-0 font-semibold ${
                  isActive("/contact")
                    ? "text-green-700 dark:text-green-400 underline underline-offset-4"
                    : "text-gray-900 md:bg-transparent md:text-green-800/80 md:dark:text-green-400/80"
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
