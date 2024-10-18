const express = require("express");
const {
  getDocs,
  createAppointment,
  updateDocs,
  deleteDocs,
} = require("../controllers/appointmentController");
const router = express.Router();

router.get("/list-appointment", getDocs);
router.post("/add-appointment", createAppointment);
router.put("/update-doc", updateDocs);
router.delete("/delete-doc", deleteDocs);

module.exports = router;
