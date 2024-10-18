import React from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  User2,
  CalendarDays,
  Activity,
  Shield,
  ClipboardList,
  AlertCircle,
  Calendar,
  Pill
} from "lucide-react";

const PatientDetails = ({ patient, onCreateAuthorization }) => {
  const { theme } = useTheme();

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return theme === 'dark'
          ? 'bg-green-900/50 text-green-300 border-green-800'
          : 'bg-green-50 text-green-700 border-green-200';
      case 'inactive':
        return theme === 'dark'
          ? 'bg-gray-900/50 text-gray-300 border-gray-800'
          : 'bg-gray-50 text-gray-700 border-gray-200';
      case 'pending':
        return theme === 'dark'
          ? 'bg-yellow-900/50 text-yellow-300 border-yellow-800'
          : 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return theme === 'dark'
          ? 'bg-gray-900/50 text-gray-300 border-gray-800'
          : 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
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

  const InfoSection = ({ icon: Icon, title, value, className = "" }) => (
    <div className="flex items-start gap-3">
      <Icon className={`h-5 w-5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
      <div>
        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
          {title}
        </p>
        <p className={`font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-900"} ${className}`}>
          {value}
        </p>
      </div>
    </div>
  );

  if (!patient) {
    return (
      <div
        className={`
          ${theme === "dark" ? "bg-gray-800" : "bg-white"}
          rounded-lg shadow-lg h-full flex items-center justify-center p-4
        `}
      >
        <div
          className={`
            text-center space-y-2
            ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
          `}
        >
          <User2 className="h-12 w-12 mx-auto opacity-50" />
          <p className="font-medium">Select a patient from the list to view their details</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        ${theme === "dark" ? "bg-gray-800" : "bg-white"}
        rounded-lg shadow-lg h-full flex flex-col
      `}
    >
      <div
        className={`
          p-6 border-b
          ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
        `}
      >
        <div className="flex justify-between items-start mb-4">
          <h2
            className={`
              text-2xl font-semibold
              ${theme === "dark" ? "text-white" : "text-gray-900"}
            `}
          >
            {patient.name}
          </h2>
          <div className="flex gap-2">
            <span className={`
              px-3 py-1 rounded-full text-sm font-medium border
              ${getStatusColor(patient.status)}
            `}>
              {patient.status}
            </span>
            <span className={`
              flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium
              ${getPriorityColor(patient.priority)}
            `}>
              <AlertCircle className="h-4 w-4" />
              {patient.priority} Priority
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <InfoSection
            icon={User2}
            title="Gender"
            value={patient.gender}
          />
          <InfoSection
            icon={Activity}
            title="Age"
            value={`${patient.age} years`}
          />
          <InfoSection
            icon={Shield}
            title="Insurance"
            value={patient.insurance}
          />
          <InfoSection
            icon={CalendarDays}
            title="Last Visit"
            value={new Date(patient.lastVisit).toLocaleDateString()}
          />
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`
            p-4 rounded-lg border
            ${theme === "dark" ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50"}
          `}>
            <h3 className={`
              font-medium mb-4 flex items-center gap-2
              ${theme === "dark" ? "text-white" : "text-gray-900"}
            `}>
              <ClipboardList className="h-5 w-5" />
              Medical Information
            </h3>
            <div className="space-y-4">
              <div>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  Current Condition
                </p>
                <p className={`font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>
                  {patient.condition}
                </p>
              </div>
              <div>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  Recent Treatments
                </p>
                {Array.isArray(patient.recentTreatments) && patient.recentTreatments.length > 0 ? (
                  <ul className="mt-2 space-y-2">
                    {patient.recentTreatments.map((treatment, index) => (
                      <li
                        key={index}
                        className={`
          flex items-center gap-2
          ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
        `}
                      >
                        <Pill className="h-4 w-4" />
                        {treatment}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    No recent treatments available
                  </p>
                )}

              </div>
            </div>
          </div>

          <div className={`
            p-4 rounded-lg border
            ${theme === "dark" ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50"}
          `}>
            <h3 className={`
              font-medium mb-4 flex items-center gap-2
              ${theme === "dark" ? "text-white" : "text-gray-900"}
            `}>
              <Calendar className="h-5 w-5" />
              Appointments
            </h3>
            {patient.upcomingAppointment ? (
              <div>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  Next Appointment
                </p>
                <p className={`font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>
                  {new Date(patient.upcomingAppointment).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                No upcoming appointments scheduled
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onCreateAuthorization}
            className={`
              w-full sm:w-auto px-6 py-3 rounded-lg font-medium
              bg-blue-600 text-white hover:bg-blue-700
              transition-colors duration-200
              flex items-center justify-center gap-2
            `}
          >
            <ClipboardList className="h-5 w-5" />
            Create Prior Authorization
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;