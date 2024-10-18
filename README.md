# Patient-Health-Dashboard-for-Prior-Authorization

# Overview
The Patient Health Dashboard is a full-stack application designed to streamline healthcare providers' workflow by enabling them to view and manage patient health data, focusing on prior authorization. This project integrates with Basys AI's Co-Pilot product to provide a seamless solution for submitting, reviewing, and managing prior authorization requests.

# Objective
The goal of this application is to:

Provide healthcare providers with a dashboard to view patient health data.
Support the submission and management of prior authorization requests.
Simplify and automate workflows related to patient data and insurance claims.
Features

Patient Dashboard: View detailed patient health records, including medical history, diagnoses, treatments, and insurance information.
Prior Authorization Management: Submit, monitor, and manage prior authorization requests directly from the dashboard.
Health Data Integration: Integrate real-time health data from multiple sources for an up-to-date view of the patient's condition.
Role-Based Access: Healthcare providers and payers have different access levels for managing data and authorization workflows.

# Roles & Credentials

Healthcare Provider 
# Doctor
Email: doctor@gmail.com
Password: Doctor@123

# Payer

Email: payer@gmail.com
Password: Payer@123

# Prerequisites
Make sure you have the following installed:

Node.js (v14 or higher)
MongoDB (local or Atlas instance)
Basys AI API Access for Co-Pilot integration (if applicable)
Installation
Clone the repository:

bash
Copy code
# git clone https://github.com/your-repo/patient-health-dashboard.git
cd patient-health-dashboard
Install backend dependencies:

bash
Copy code
cd backend
npm install
Install frontend dependencies:

bash
Copy code
cd ../frontend
npm install
Environment Variables Setup:

# In the backend directory, create a .env file with the following configuration:

plaintext
Copy code
MONGO_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your-jwt-secret-key
PORT=5000
BASYS_API_KEY=your-basys-co-pilot-api-key
Run the application:

# Run both the frontend and backend simultaneously using:
bash
Copy code
# npm run dev
This command will start the frontend and backend servers concurrently.


# Technology Stack
Frontend: React.js, Redux, Tailwind CSS
Backend: Node.js, Express.js, MongoDB
Authentication: JWT (JSON Web Token)
State Management: Redux
CSS Framework: Tailwind CSS

# Contact
For any inquiries or questions, please contact:

Email: muhammedt1207@gmail.com
#
