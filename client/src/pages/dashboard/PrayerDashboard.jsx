import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import PayerNavbar from "../../components/layout/PayerNavbar";
import PayerSidebar from "../../components/layout/PayerSidebar";
import RequestList from "../../components/dashboard/RequestList";
import PatientDetailsModal from "../../components/modals/PatientDetailsModal";
import { useDispatch } from "react-redux";
import { listAppointments } from "../../store/actions/appointmentActions";

const PayerDashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const [requests, setRequests] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch requests from API
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    // Mock API call
    const appointmentResponse = await dispatch(listAppointments());
    setRequests(appointmentResponse.payload.data);
    // const mockRequests = [
    //   {
    //     id: 1,
    //     patientName: "John Doe",
    //     doctorName: "Dr. Smith",
    //     requestDate: "2023-05-15",
    //     status: "Pending",
    //     patientDetails: {
    //       age: 35,
    //       gender: "Male",
    //       condition: "Chronic",
    //       recentTreatments: "Therapy Sessions",
    //       insurance: "Blue Cross",
    //     },
    //   },
      // Add more mock requests here
    // ];
    // setRequests(mockRequests);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  const handleApproveRequest = (requestId) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId ? { ...req, status: "Approved" } : req
      )
    );
  };

  const handleDenyRequest = (requestId) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId ? { ...req, status: "Denied" } : req
      )
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <PayerNavbar
        toggleSidebar={toggleSidebar}
        toggleTheme={toggleTheme}
        theme={theme}
      />
      <div className="flex">
        <PayerSidebar isOpen={isSidebarOpen} />
        <main
          className={`flex-grow p-4 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <h1 className="text-3xl font-bold mb-8">Payer Dashboard</h1>
          <RequestList
            requests={requests}
            onPatientSelect={handlePatientSelect}
            onApprove={handleApproveRequest}
            onDeny={handleDenyRequest}
          />
        </main>
      </div>
      {selectedPatient && (
        <PatientDetailsModal
          patient={selectedPatient}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PayerDashboard;
