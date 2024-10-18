import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import AuthorizationList from "@/components/authorizations/AuthorizationList";
import AuthorizationDetails from "@/components/authorizations/AuthorizationDetails";
import { useTheme } from "@/context/ThemeContext";

const authorizations = [
  {
    id: 1,
    patientName: "John Smith",
    treatmentType: "MRI Scan",
    status: "Pending",
    submittedDate: "2024-03-15",
    diagnosisCode: "R51.9",
    insuranceProvider: "Blue Cross",
    notes: "Patient reported chronic headaches",
    priority: "High",
  },
  {
    id: 2,
    patientName: "Sarah Johnson",
    treatmentType: "Physical Therapy",
    status: "Approved",
    submittedDate: "2024-03-10",
    diagnosisCode: "M54.5",
    insuranceProvider: "Aetna",
    notes: "Lower back pain treatment",
    priority: "Medium",
  },
];

const AuthorizationsPage = () => {
  const [selectedAuth, setSelectedAuth] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();

  const filteredAuthorizations = authorizations.filter(
    (auth) =>
      auth.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auth.treatmentType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div
        className={`p-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
      >
        <h1 className="text-2xl font-bold mb-6">Prior Authorizations</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AuthorizationList
            authorizations={filteredAuthorizations}
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            onSelect={setSelectedAuth}
            selectedId={selectedAuth?.id}
          />
          <div className="lg:col-span-2">
            <AuthorizationDetails authorization={selectedAuth} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthorizationsPage;
