import React from "react";
import { ChevronRight, User2, Clock, AlertCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const PatientCard = ({ patient, onClick }) => {
  const { theme } = useTheme();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return theme === 'dark' ? 'text-red-400' : 'text-red-600';
      case 'medium':
        return theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600';
      case 'low':
        return theme === 'dark' ? 'text-green-400' : 'text-green-600';
      default:
        return theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        p-4 border rounded-lg cursor-pointer transition-colors
        ${
          theme === "dark"
            ? "border-gray-700 hover:bg-gray-700"
            : "border-gray-200 hover:bg-gray-50"
        }
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3
              className={`
                font-medium text-lg
                ${theme === "dark" ? "text-white" : "text-gray-900"}
              `}
            >
              {patient.name}
            </h3>
            <span className={`
              px-2 py-0.5 rounded-full text-xs font-medium
              ${getStatusColor(patient.status)}
            `}>
              {patient.status}
            </span>
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            <User2 className={`h-4 w-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              {patient.gender} | Age: {patient.age}
            </p>
          </div>
        </div>
        
        <ChevronRight
          className={`
            h-5 w-5 mt-1
            ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
          `}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-3">
        <div>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            Condition:
          </p>
          <p className={`text-sm font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
            {patient.condition}
          </p>
        </div>

        <div>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            Insurance:
          </p>
          <p className={`text-sm font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
            {patient.insurance}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}">
        <div className="flex items-center gap-1">
          <Clock className={`h-4 w-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
          <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <AlertCircle className={`h-4 w-4 ${getPriorityColor(patient.priority)}`} />
          <span className={`text-sm font-medium ${getPriorityColor(patient.priority)}`}>
            {patient.priority.charAt(0).toUpperCase() + patient.priority.slice(1)} Priority
          </span>
        </div>
      </div>

      {patient.upcomingAppointment && (
        <div className={`
          mt-3 pt-3 text-sm
          border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
        `}>
          <span className={`font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Next Appointment:
          </span>
          <span className={`ml-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            {new Date(patient.upcomingAppointment).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default PatientCard;