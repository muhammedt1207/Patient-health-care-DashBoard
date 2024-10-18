import React from "react";
import { Calendar, Tag, FileText, AlertCircle } from "lucide-react";

const AuthorizationDetails = ({ authorization }) => {
  const { theme } = useTheme();

  if (!authorization) {
    return (
      <div
        className={`
        rounded-lg shadow-lg p-6 h-full flex items-center justify-center
        ${theme === "dark" ? "bg-gray-800" : "bg-white"}
      `}
      >
        <p
          className={`
          text-center
          ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
        `}
        >
          Select an authorization request to view details
        </p>
      </div>
    );
  }

  return (
    <div
      className={`
      rounded-lg shadow-lg
      ${theme === "dark" ? "bg-gray-800" : "bg-white"}
    `}
    >
      <div
        className={`
        p-6 border-b
        ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
      `}
      >
        <div className="flex justify-between items-start">
          <div>
            <h2
              className={`
              text-xl font-semibold
              ${theme === "dark" ? "text-white" : "text-gray-900"}
            `}
            >
              Authorization Details
            </h2>
            <p
              className={`
              mt-1
              ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
            `}
            >
              {authorization.patientName} - {authorization.treatmentType}
            </p>
          </div>
          <div
            className={`
            px-3 py-1 rounded-full text-sm
            ${
              authorization.status.toLowerCase() === "approved"
                ? "bg-green-100 text-green-800"
                : authorization.status.toLowerCase() === "denied"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }
          `}
          >
            {authorization.status}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            icon={Calendar}
            title="Submission Date"
            value={authorization.submittedDate}
          />
          <InfoCard
            icon={Tag}
            title="Diagnosis Code"
            value={authorization.diagnosisCode}
          />
          <InfoCard
            icon={FileText}
            title="Insurance Provider"
            value={authorization.insuranceProvider}
          />
          <InfoCard
            icon={AlertCircle}
            title="Priority"
            value={authorization.priority}
          />
        </div>

        <div>
          <h3
            className={`
            font-medium mb-2
            ${theme === "dark" ? "text-white" : "text-gray-900"}
          `}
          >
            Notes
          </h3>
          <p
            className={`
            ${theme === "dark" ? "text-gray-300" : "text-gray-600"}
          `}
          >
            {authorization.notes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationDetails;
