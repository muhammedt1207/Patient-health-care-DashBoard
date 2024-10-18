const express = require("express");
const {
  loginUser,
  signUpUser,
  getUser,
  editUser,
  isExist,
  deleteUser,
  logout,
} = require("../controllers/userController");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", signUpUser);
router.get("/get-user", getUser);
router.get("/is-exist", isExist);
router.get("/logout", logout);
router.put("/update-user", editUser);
router.delete("/delete-user", deleteUser);

module.exports = router;
