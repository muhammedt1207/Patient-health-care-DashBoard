import React from 'react';
import RequestCard from './RequestCard';

const RequestList = ({ requests, onPatientSelect, onApprove, onDeny }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {requests.map((request) => (
        <RequestCard 
          key={request.id} 
          request={request} 
          onPatientSelect={onPatientSelect}
          onApprove={onApprove}
          onDeny={onDeny}
        />
      ))}
    </div>
  );
};

export default RequestList;