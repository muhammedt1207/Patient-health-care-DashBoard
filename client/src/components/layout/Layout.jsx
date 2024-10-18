import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useTheme } from "../../context/ThemeContext";

const Layout = ({ children }) => {
  const { theme } = useTheme();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleMenuBar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-200`}
    >
      <Navbar toggleMenuBar={toggleMenuBar} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleMenuBar={toggleMenuBar} />
      <main className="lg:pl-64 pt-16">
        <div className="container mx-auto p-4">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
