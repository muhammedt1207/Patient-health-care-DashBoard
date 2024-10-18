import React, { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import PatientCard from "./PatientCard";
import Pagination from "./Pagination";
import { useTheme } from "../../context/ThemeContext";

const ITEMS_PER_PAGE = 5;

const PatientList = ({
  patients,
  searchTerm,
  onSearchChange,
  onPatientSelect,
}) => {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    gender: "all",
    ageRange: "all",
    status: "all"
  });

  const filteredPatients = useMemo(() => {
    return patients
      .filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((patient) => {
        if (filters.gender !== "all" && patient.gender !== filters.gender) {
          return false;
        }
        
        if (filters.status !== "all" && patient.status !== filters.status) {
          return false;
        }

        if (filters.ageRange !== "all") {
          const age = patient.age;
          switch (filters.ageRange) {
            case "0-18":
              return age >= 0 && age <= 18;
            case "19-30":
              return age >= 19 && age <= 30;
            case "31-50":
              return age >= 31 && age <= 50;
            case "51+":
              return age >= 51;
            default:
              return true;
          }
        }

        return true;
      });
  }, [patients, searchTerm, filters]);

  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById("patient-list").scrollTop = 0;
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div
      className={`
        ${theme === "dark" ? "bg-gray-800" : "bg-white"}
        rounded-lg shadow-lg h-full flex flex-col
      `}
    >
      <div
        className={`
          p-4 border-b
          ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
        `}
      >
        <h2
          className={`
            text-xl font-semibold mb-4
            ${theme === "dark" ? "text-white" : "text-gray-900"}
          `}
        >
          Patients
        </h2>
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              className={`
                w-full p-2 rounded-lg pl-8
                ${
                  theme === "dark"
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                }
                border
              `}
              value={searchTerm}
              onChange={onSearchChange}
            />
            <Search
              className={`
                absolute left-2 top-3 h-4 w-4
                ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
              `}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`
                flex items-center gap-2 px-3 py-1 rounded-md text-sm
                ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"}
              `}
            >
              <Filter size={16} />
              Filters
            </button>
            {Object.values(filters).some(value => value !== "all") && (
              <button
                onClick={() => setFilters({
                  gender: "all",
                  ageRange: "all",
                  status: "all"
                })}
                className="text-sm text-blue-500 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {showFilters && (
            <div className={`
              grid grid-cols-3 gap-4 p-4 rounded-lg mt-2
              ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}
            `}>
              <div>
                <label className={`block text-sm mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  Gender
                </label>
                <select
                  value={filters.gender}
                  onChange={(e) => handleFilterChange("gender", e.target.value)}
                  className={`
                    w-full p-2 rounded-md
                    ${theme === "dark" ? "bg-gray-600 text-white" : "bg-white text-gray-900"}
                  `}
                >
                  <option value="all">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  Age Range
                </label>
                <select
                  value={filters.ageRange}
                  onChange={(e) => handleFilterChange("ageRange", e.target.value)}
                  className={`
                    w-full p-2 rounded-md
                    ${theme === "dark" ? "bg-gray-600 text-white" : "bg-white text-gray-900"}
                  `}
                >
                  <option value="all">All</option>
                  <option value="0-18">0-18</option>
                  <option value="19-30">19-30</option>
                  <option value="31-50">31-50</option>
                  <option value="51+">51+</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className={`
                    w-full p-2 rounded-md
                    ${theme === "dark" ? "bg-gray-600 text-white" : "bg-white text-gray-900"}
                  `}
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div id="patient-list" className="flex-1 overflow-auto p-4">
        {currentPatients.length > 0 ? (
          <div className="space-y-2">
            {currentPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onClick={() => onPatientSelect(patient)}
              />
            ))}
          </div>
        ) : (
          <div
            className={`
              text-center py-8
              ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
            `}
          >
            No patients found
          </div>
        )}
      </div>

      {filteredPatients.length > ITEMS_PER_PAGE && (
        <div
          className={`
            p-4 border-t
            ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
          `}
        >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <div
        className={`
          px-4 py-3 text-sm
          ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
          border-t
          ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
        `}
      >
        Showing {startIndex + 1} to{" "}
        {Math.min(endIndex, filteredPatients.length)} of{" "}
        {filteredPatients.length} patients
      </div>
    </div>
  );
};

export default PatientList;