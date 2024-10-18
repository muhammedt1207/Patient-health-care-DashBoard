const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    dateOfService: {
      type: Date,
      required: true,
    },
    diagnosisCode: {
      type: String,
      required: true,
    },
    insurancePlan: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    treatmentType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
