const express = require("express");
const {
  createPatient,
  listPatients
} = require("../controllers/patientController");
const router = express.Router();

router.post("/create-patient", createPatient);
router.get("/list-patients", listPatients)

module.exports = router;
