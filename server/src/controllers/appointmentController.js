const Appointment = require("../models/appointmentModel");

module.exports = {
  getDocs: async (req, res) => {
    try {
      const appointments = await Appointment.find();
      console.log("home page", appointments);
      if (!appointments) {
        res.status(404).json({
          success: false,
          data: null,
          message: "Document fetching failed!",
        });
        return;
      }
      console.log("🚀 ~ getTodo: ~ todos:", appointments);
      res.status(200).json({
        success: true,
        data: appointments,
        message: "Documents fetched successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  },

  createAppointment: async (req, res) => {
    try {
      const appointmentData = req.body;
      console.log("🚀 ~ addDocs: ~ documentData:", appointmentData);
      const newAppointment = await Appointment.create(appointmentData);
      if (!newAppointment) {
        res.status(404).json({
          success: false,
          data: null,
          message: "Appointment adding failed!",
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: newAppointment,
        message: "Appointment added successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteDocs: async (req, res) => {
    try {
      const credentials = req.body;
      const deletedDoc = await Docs.findByIdAndDelete(credentials?._id);
      console.log("something", deletedDoc);
      if (!deletedDoc) {
        res.status(404).json({
          success: false,
          data: null,
          message: "Document deletion failed!",
        });
      }
      res.status(200).json({
        success: true,
        data: deletedDoc,
        message: "Document deleted successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateDocs: async (req, res) => {
    try {
      const credentials = req.body;
      const updatedDoc = await Docs.findByIdAndUpdate(credentials?._id, {
        ...credentials,
      });
      if (!updatedDoc) {
        res.status(404).json({
          success: false,
          data: null,
          message: "Document updation failed!",
        });
      }
      console.log("something", updatedDoc);
      res.status(200).json({
        success: true,
        data: updatedDoc,
        message: "Document updated successully!",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
