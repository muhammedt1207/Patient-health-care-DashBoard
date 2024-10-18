const Patient = require("../models/patientModel");

module.exports = {
  createPatient: async (req, res) => {
    try {
      const credentials = req.body;
      const patientData = await Patient.create(credentials);
      console.log("home page", patientData);
      if (!patientData) {
        res.status(404).json({
          success: false,
          data: null,
          message: "patient create failed!",
        });
        return;
      }
      console.log("🚀 ~ getTodo: ~ todos:", patientData);
      res.status(200).json({
        success: true,
        data: patientData,
        message: "patient created successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  },

  listPatients: async (req, res) => {
    try {
      const patients = await Patient.find();
      console.log("🚀 ~ listPatients: ~ patients:", patients)
      res.status(200).json({
        success: false,
        data: patients,
        message: "patient listed successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
