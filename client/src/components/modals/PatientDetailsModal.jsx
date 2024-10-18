import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const PatientDetailsModal = ({ patient, onClose }) => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className={`p-8 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} max-w-md w-full`}>
        <h2 className="text-2xl font-bold mb-4">Patient Details</h2>
        <div className="mb-4">
          <p><strong>Name:</strong> {patient.patientName}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>Condition:</strong> {patient.condition}</p>
          <p><strong>Recent Treatments:</strong> {patient.recentTreatments}</p>
          <p><strong>Insurance:</strong> {patient.insurance}</p>
        </div>
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PatientDetailsModal;