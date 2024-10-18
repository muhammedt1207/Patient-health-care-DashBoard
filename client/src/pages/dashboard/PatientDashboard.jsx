import React, { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import Layout from "../../components/layout/Layout";
import PatientList from "../../components/dashboard/PatientList";
import PatientDetails from "../../components/dashboard/PatientDetails";
import AuthorizationModal from "../../components/modals/AuthorizationModal";
import NewPatientModal from "../../components/modals/NewPatientModal";
// import { MOCK_PATIENTS } from "../../utils/constants";
import { AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { createAppointment } from "../../store/actions/appointmentActions";
import { createPatient, listPatient } from "../../store/actions/patientActions";

const PatientDashboard = () => {
  const { theme } = useTheme();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isNewPatientModalOpen, setNewPatientModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        const response = await dispatch(listPatient());
        console.log("🚀 ~ fetchPatients ~ response:", response);
        setPatients(response?.payload?.data);
        setError(null);
      } catch (err) {
        setError("Failed to load patients. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const handleCreateAuthorization = () => {
    setAuthModalOpen(true);
  };

  const handleAuthModalSubmit = async (formData) => {
    try {
      dispatch(createAppointment(formData));
      setAuthModalOpen(false);
    } catch (error) {
      console.error("Failed to create authorization:", error);
    }
  };

  const handleNewPatientModalSubmit = (newPatientData) => {
    console.log(
      "🚀 ~ handleNewPatientModalSubmit ~ newPatientData:",
      newPatientData
    );
    dispatch(createPatient(newPatientData));
    // Here you would typically send this data to your backend
    // For now, we'll just add it to the local state
    setPatients([...patients, { id: patients.length + 1, ...newPatientData }]);
    setNewPatientModalOpen(false);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div
            className={`
            animate-spin rounded-full h-12 w-12 border-4 
            ${
              theme === "dark"
                ? "border-gray-400 border-t-blue-500"
                : "border-gray-200 border-t-blue-600"
            }
          `}
          />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div
          className={`
          flex items-center justify-center min-h-screen
          ${theme === "dark" ? "text-white" : "text-gray-900"}
        `}
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span>{error}</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`
            text-2xl font-bold
            ${theme === "dark" ? "text-white" : "text-gray-900"}
          `}
          >
            Patient Dashboard
          </h1>
          <div className="space-x-4">
            <button
              onClick={() => setNewPatientModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              New Authorization
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <PatientList
              patients={filteredPatients}
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onPatientSelect={handlePatientSelect}
              selectedPatientId={selectedPatient?.id}
            />
          </div>
          <div className="lg:col-span-2">
            <PatientDetails
              patient={selectedPatient}
              onCreateAuthorization={handleCreateAuthorization}
            />
          </div>
        </div>

        <AuthorizationModal
          isOpen={isAuthModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onSubmit={handleAuthModalSubmit}
          patient={selectedPatient}
        />

        <NewPatientModal
          isOpen={isNewPatientModalOpen}
          onClose={() => setNewPatientModalOpen(false)}
          onSubmit={handleNewPatientModalSubmit}
        />
      </div>
    </Layout>
  );
};

export default PatientDashboard;
