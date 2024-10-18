import axios from "axios";

export const authbaseUrl = String(
  import.meta.env.VITE_AUTHENTICATION_SERVICE_URI
);

export const appointmentbaseUrl = String(
  import.meta.env.VITE_APPOINTMENT_SERVICE_URI
);

export const patientbaseUrl = String(
  import.meta.env.VITE_PATIENT_SERVICE_URI
);

export const AuthAxios = axios.create({
  baseURL: authbaseUrl,
  withCredentials: true,
});

export const AppointmentAxios = axios.create({
  baseURL: appointmentbaseUrl,
  withCredentials: true,
});

export const PatientAxios = axios.create({
  baseURL: patientbaseUrl,
  withCredentials: true,
});
