import React from "react";
import { Bell, Menu } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggle from "../ui/ThemeToggle";
import { useSelector } from "react-redux";

const Navbar = ({ toggleMenuBar }) => {
  const { theme } = useTheme();
  const user = useSelector((state) => state.auth.user);

  return (
    <nav
      className={`fixed w-full z-10 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleMenuBar}
              className={`${
                theme === "dark"
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } lg:hidden`}
            >
              <Menu className="h-6 w-6" />
            </button>
            {/* <h1
              className={`text-xl font-semibold ml-48 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Healthcare Dashboard
            </h1> */}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              className={`${
                theme === "dark"
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Bell className="h-6 w-6" />
            </button>
            <div
              className={`w-8 h-8 rounded-full ${
                theme === "dark" ? "bg-gray-600" : "bg-gray-200"
              } flex items-center justify-center ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {user?.email?.slice(0, 2) || "JS"}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
