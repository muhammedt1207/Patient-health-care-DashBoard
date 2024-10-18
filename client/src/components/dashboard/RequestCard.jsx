import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Calendar, Clock, Activity, FileText, User, Stethoscope, ShieldCheck, AlertCircle } from 'lucide-react';

const RequestCard = ({ request, onPatientSelect, onApprove, onDeny }) => {
  const { theme } = useTheme();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{request.name}</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          request.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 
          request.status === 'approved' ? 'bg-green-200 text-green-800' : 
          'bg-red-200 text-red-800'
        }`}>
          {request.status.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <InfoItem icon={<Calendar size={18} />} label="Created At" value={formatDate(request.createdAt)} />
        <InfoItem icon={<Clock size={18} />} label="Date of Service" value={formatDate(request.dateOfService)} />
        <InfoItem icon={<Activity size={18} />} label="Diagnosis Code" value={request.diagnosisCode} />
        <InfoItem icon={<ShieldCheck size={18} />} label="Insurance Plan" value={request.insurancePlan} />
        <InfoItem icon={<Stethoscope size={18} />} label="Treatment Type" value={request.treatmentType} />
        <InfoItem icon={<User size={18} />} label="Doctor" value={request.doctorName} />
      </div>

      <div className="mb-6">
        <h3 className="flex items-center text-lg font-semibold mb-2">
          <FileText size={18} className="mr-2" />
          Notes
        </h3>
        <p className="bg-gray-100 p-3 rounded-md text-gray-700">{request.notes}</p>
      </div>

      <div className="flex flex-wrap justify-between items-center">
        <button
          onClick={() => onPatientSelect(request.patientDetails)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 mb-2 sm:mb-0"
        >
          View Details
        </button>
        {request.status === 'pending' && (
          <div>
            <button
              onClick={() => onApprove(request.id)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 mr-2"
            >
              Approve
            </button>
            <button
              onClick={() => onDeny(request.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              Deny
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    <div className="mr-2">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default RequestCard;