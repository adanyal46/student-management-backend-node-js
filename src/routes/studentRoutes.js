const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const { validate } = require("../middlewares/validateMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const { studentSchema } = require("../schema/userSchema");

router.get("/", authMiddleware(["admin"]), studentController.getAllStudent);
router.post(
  "/",
  authMiddleware(["admin", "teacher"]),
  validate(studentSchema),
  studentController.createStudent
);
router.post(
  "/:id",
  authMiddleware(["admin", "student", "parent", "teacher"]),
  studentController.getSingleStudent
);
router.put(
  "/:id",
  authMiddleware(["admin", "student"]),
  studentController.updateStudent
);
router.delete(
  "/:id",
  authMiddleware(["admin"]),
  studentController.deleteStudent
);

module.exports = router;
