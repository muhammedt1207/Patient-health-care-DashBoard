import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

const NewPatientModal = ({ isOpen, onClose, onSubmit }) => {
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    condition: "",
    recentTreatments: "",
    insurance: "",
    lastVisit: "",
    status: "",
    upcomingAppointment: "",
    priority: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      age: "",
      gender: "",
      condition: "",
      recentTreatments: "",
      insurance: "",
      lastVisit: "",
      status: "",
      upcomingAppointment: "",
      priority: "",
    });
  };

  // Sample options for dropdowns
  const dropdownOptions = {
    age: Array.from({ length: 100 }, (_, i) => i + 1),
    gender: ["Male", "Female", "Other"],
    condition: ["Healthy", "Chronic", "Acute", "Critical"],
    recentTreatments: [
      "Therapy Sessions",
      "Stress Management",
      "Insulin Pump Adjustment",
      "Dietary Planning",
      "Bone Density Test",
      "Calcium Supplementation",
      "Pain Management",
      "Trigger Identification",
    ],
    insurance: [
      "Blue Cross",
      "Aetna",
      "Medicare",
      "United Healthcare",
      "Cigna",
      "Humana",
      "Medicaid",
      "Blue Shield",
      "Kaiser",
    ],
    status: ["Active", "Inactive"],
    priority: ["Low", "Medium", "High"],
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 ${
        theme === 'dark' ? "bg-gray-900" : "bg-gray-200"
      } bg-opacity-50 flex justify-center items-center`}
    >
      <div
        className={`${
          theme === 'dark' ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Add New Patient</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label
                htmlFor={key}
                className="text-sm font-medium mb-2 capitalize"
              >
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              {key === "name" ? (
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className={`p-3 rounded-md ${
                    theme === 'dark'
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  required
                />
              ) : key === "lastVisit" || key === "upcomingAppointment" ? (
                <input
                  type="date"
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className={`p-3 rounded-md ${
                    theme === 'dark'
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                />
              ) : (
                <select
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className={`p-3 rounded-md ${
                    theme === 'dark'
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  required={key !== "recentTreatments"}
                >
                  <option value="">Select {key}</option>
                  {dropdownOptions[key] &&
                    dropdownOptions[key].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              )}
            </div>
          ))}
          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-3 border rounded-md text-sm font-medium ${
                theme === 'dark'
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPatientModal;