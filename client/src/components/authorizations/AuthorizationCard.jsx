import React from "react";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const AuthorizationCard = ({ authorization, isSelected, onClick }) => {
  const { theme } = useTheme();

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle className="text-green-500" />;
      case "denied":
        return <XCircle className="text-red-500" />;
      default:
        return <Clock className="text-yellow-500" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        p-4 rounded-lg cursor-pointer transition-colors
        ${
          isSelected
            ? theme === "dark"
              ? "bg-gray-700"
              : "bg-blue-50"
            : theme === "dark"
            ? "bg-gray-800 hover:bg-gray-700"
            : "bg-white hover:bg-gray-50"
        }
        ${
          theme === "dark" ? "border border-gray-700" : "border border-gray-200"
        }
      `}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3
            className={`
            font-medium
            ${theme === "dark" ? "text-white" : "text-gray-900"}
          `}
          >
            {authorization.patientName}
          </h3>
          <p
            className={`
            text-sm
            ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
          `}
          >
            {authorization.treatmentType}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(authorization.status)}
          <span
            className={`
            text-sm
            ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
          `}
          >
            {authorization.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationCard;
