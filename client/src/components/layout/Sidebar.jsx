import React from "react";
import { Users, FileText, Settings, LogOut } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/authActions";

const Sidebar = ({ isSidebarOpen, toggleMenuBar }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigationItems = [
    { icon: Users, label: "Patients", path: "/" },
    { icon: FileText, label: "Authorizations", path: "/authorizations" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: LogOut, label: "Logout", path: null },
  ];

  const handleNavigate = async (path) => {
    if (path === null) {
      navigate("/login");
      await dispatch(logout());
    }
    navigate(path);
  };

  const sidebarClasses = `
    fixed inset-y-0 left-0 transform 
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    lg:translate-x-0 transition-transform duration-300 ease-in-out 
    ${theme === "dark" ? "bg-gray-800" : "bg-white"} 
    w-64 z-20 pt-16
    ${
      theme === "dark" ? "border-r border-gray-700" : "border-r border-gray-200"
    }
  `;

  return (
    <aside className={sidebarClasses}>
      <div className="px-4 py-6">
        <nav className="space-y-1">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                onClick={() => handleNavigate(item.path)}
                className={`
                  flex items-center px-4 py-3 rounded-lg
                  ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
