import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Calendar, X } from "lucide-react";

const TREATMENT_TYPES = [
  { id: 1, name: "Surgery", code: "SUR-001" },
  { id: 2, name: "Physical Therapy", code: "PT-001" },
  { id: 3, name: "Medication", code: "MED-001" },
  { id: 4, name: "Diagnostic Imaging", code: "IMG-001" },
  { id: 5, name: "Laboratory Tests", code: "LAB-001" },
  { id: 6, name: "Specialist Consultation", code: "CON-001" },
];

const INSURANCE_PLANS = [
  { id: 1, name: "Blue Cross PPO", code: "BC-PPO" },
  { id: 2, name: "Aetna HMO", code: "AET-HMO" },
  { id: 3, name: "UnitedHealth Choice", code: "UH-CHOICE" },
  { id: 4, name: "Cigna Open Access", code: "CIG-OA" },
  { id: 5, name: "Medicare Advantage", code: "MED-ADV" },
];

const DIAGNOSIS_CODES = [
  { id: 1, code: "E11.9", description: "Type 2 Diabetes" },
  { id: 2, code: "I10", description: "Hypertension" },
  { id: 3, code: "J45.909", description: "Asthma" },
  { id: 4, code: "M54.5", description: "Lower Back Pain" },
  { id: 5, code: "G43.909", description: "Migraine" },
  { id: 6, code: "K21.9", description: "GERD" },
];

const PriorAuthorizationModal = ({ patient, isOpen, onClose, onSubmit }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: patient?.name || "", 
    treatmentType: "",
    insurancePlan: "",
    diagnosisCode: "",
    dateOfService: "",
    notes: "",
    status: "pending"
  });
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    if (patient?.name) {
      setFormData(prevData => ({
        ...prevData,
        name: patient.name
      }));
    }
  }, [patient]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Patient name is required";
    if (!formData.treatmentType) newErrors.treatmentType = "Treatment type is required";
    if (!formData.insurancePlan) newErrors.insurancePlan = "Insurance plan is required";
    if (!formData.diagnosisCode) newErrors.diagnosisCode = "Diagnosis code is required";
    if (!formData.dateOfService) newErrors.dateOfService = "Date of service is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData, "-------------------------------");
      onSubmit(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`
        w-full max-w-2xl rounded-lg shadow-xl
        ${theme === "dark" ? "bg-gray-800" : "bg-white"}
        max-h-[90vh] overflow-hidden flex flex-col
      `}
      >
        {/* Header */}
        <div
          className={`
          p-4 border-b flex justify-between items-center
          ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
        `}
        >
          <h2
            className={`text-xl font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Create Prior Authorization
          </h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-full hover:bg-gray-100 ${
              theme === "dark" ? "hover:bg-gray-700" : ""
            }`}
          >
            <X
              className={`h-5 w-5 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            {/* Patient Info */}
            <div
              className={`p-3 rounded-lg ${
                theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
              }`}
            >
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Patient: <span className="font-medium">{formData.name}</span>
              </p>
            </div>

            {/* Hidden input for name */}
            <input 
              type="hidden" 
              name="name" 
              value={formData.name} 
            />

            {/* Rest of the form fields remain the same */}
            {/* Treatment Type */}
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Treatment Type*
              </label>
              <select
                value={formData.treatmentType}
                onChange={(e) =>
                  setFormData({ ...formData, treatmentType: e.target.value })
                }
                className={`
                  w-full rounded-lg border p-2.5
                  ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }
                  ${errors.treatmentType ? "border-red-500" : ""}
                `}
              >
                <option value="">Select treatment type</option>
                {TREATMENT_TYPES.map((type) => (
                  <option key={type.id} value={type.code}>
                    {type.name}
                  </option>
                ))}
              </select>
              {errors.treatmentType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.treatmentType}
                </p>
              )}
            </div>

            {/* Insurance Plan */}
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Insurance Plan*
              </label>
              <select
                value={formData.insurancePlan}
                onChange={(e) =>
                  setFormData({ ...formData, insurancePlan: e.target.value })
                }
                className={`
                  w-full rounded-lg border p-2.5
                  ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }
                  ${errors.insurancePlan ? "border-red-500" : ""}
                `}
              >
                <option value="">Select insurance plan</option>
                {INSURANCE_PLANS.map((plan) => (
                  <option key={plan.id} value={plan.code}>
                    {plan.name}
                  </option>
                ))}
              </select>
              {errors.insurancePlan && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.insurancePlan}
                </p>
              )}
            </div>

            {/* Diagnosis Code */}
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Diagnosis Code*
              </label>
              <select
                value={formData.diagnosisCode}
                onChange={(e) =>
                  setFormData({ ...formData, diagnosisCode: e.target.value })
                }
                className={`
                  w-full rounded-lg border p-2.5
                  ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }
                  ${errors.diagnosisCode ? "border-red-500" : ""}
                `}
              >
                <option value="">Select diagnosis code</option>
                {DIAGNOSIS_CODES.map((diagnosis) => (
                  <option key={diagnosis.id} value={diagnosis.code}>
                    {diagnosis.code} - {diagnosis.description}
                  </option>
                ))}
              </select>
              {errors.diagnosisCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.diagnosisCode}
                </p>
              )}
            </div>

            {/* Date of Service */}
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Date of Service*
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.dateOfService}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfService: e.target.value })
                  }
                  className={`
                    w-full rounded-lg border p-2.5 pl-10
                    ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }
                    ${errors.dateOfService ? "border-red-500" : ""}
                  `}
                />
                <Calendar
                  className={`absolute left-3 top-3 h-4 w-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
              {errors.dateOfService && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dateOfService}
                </p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={4}
                className={`
                  w-full rounded-lg border p-2.5
                  ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }
                `}
                placeholder="Enter any additional notes..."
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div
          className={`
          p-4 border-t
          ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
        `}
        >
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`
                px-4 py-2 rounded-lg
                ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }
              `}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Authorization
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorAuthorizationModal;