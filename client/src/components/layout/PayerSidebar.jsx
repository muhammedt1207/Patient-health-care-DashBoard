import React from "react";
import { Home, FileText, Settings, HelpCircle, LogOut } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/authActions";

const PayerSidebar = ({ isOpen }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    { path: "/", icon: Home, text: "Dashboard" },
    { path: "/", icon: FileText, text: "Requests" },
    { path: "/", icon: Settings, text: "Settings" },
    { path: "/", icon: HelpCircle, text: "Help" },
    { path: null, icon: LogOut, text: "Logout" },
  ];

  const handleNavigate = async(path) => {
    if (path === null) {
      navigate("/login");
      await dispatch(logout());
    }
    navigate(path);
  };

  return (
    <aside
      className={`fixed left-0 top-16 h-full w-64 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } shadow-md transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="mt-8">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-2">
              <span
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 ${
                  theme === "dark" ? "text-gray-100 hover:bg-gray-700" : ""
                }`}
              >
                <item.icon className="h-6 w-6 mr-3" />
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default PayerSidebar;
