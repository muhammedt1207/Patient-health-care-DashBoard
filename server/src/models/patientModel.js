const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    insurance: {
      type: String,
      required: true,
    },
    lastVisit: {
      type: Date,
      required: true,
    },
    upcomingAppointment: {
      type: Date,
      required: true,
    },
    recentTreatments: [
      {
        type: String,
        required: true,
      },
    ],
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Discharged"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
