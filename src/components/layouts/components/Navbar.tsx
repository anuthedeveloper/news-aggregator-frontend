import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { AUTH_PATH, HOME_PATH } from "../../../routes/path";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-transparent shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold text-gray-600">
          <Link to={HOME_PATH.root}>News Aggregator</Link>
        </h1>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={toggleMenu}
          className="block md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex space-x-4 md:space-x-6 text-lg pr-20`}
        >
          {!token ? (
            <li>
              <Link
                to={AUTH_PATH.root}
                className="text-sm text-gray-700 hover:text-gray-600 rounded-md py-2 px-4 hover:bg-gray-200 hover:font-semibold"
              >
                Login
              </Link>
            </li>
          ) : (
            <>
              {/* User Menu Dropdown */}
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-sm font-medium text-gray-900 rounded-full focus:ring-4 focus:ring-gray-100 "
                  type="button"
                >
                  <span className="sr-only">Open user menu</span>
                  Hi, {user?.name}!
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div
                    id="dropdownAvatarName"
                    className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44  mt-2"
                  >
                    <div className="px-4 py-3 text-sm text-gray-900 ">
                      <div className="truncate">{user?.email}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <Link
                          to={HOME_PATH.settings}
                          className="block px-4 py-2 hover:bg-gray-100 "
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Settings
                        </Link>
                      </li>
                    </ul>
                    <div className="py-2">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
