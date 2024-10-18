import React from "react";
import Layout from "../../components/layout/Layout";
// import SettingsForm from "../../pages/settings/SettingsForm";
import { useTheme } from "../../context/ThemeContext";

const SettingsPage = () => {
  const { theme } = useTheme();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <h1
          className={`
          text-2xl font-bold mb-6
          ${theme === "dark" ? "text-white" : "text-gray-900"}
        `}
        >
          Settings
        </h1>
        {/* <SettingsForm /> */}
      </div>
    </Layout>
  );
};

export default SettingsPage;
