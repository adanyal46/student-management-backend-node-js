const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validate } = require("../middlewares/validateMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const { userSchema } = require("../schema/userSchema");

router.get("/", authMiddleware(["admin"]), userController.getAllUser);
router.post(
  "/:id",
  authMiddleware(["admin", "student", "parent", "teacher"]),
  userController.getSingleUser
);
router.put(
  "/:id",
  authMiddleware(["admin","student"]),
  userController.updateUser
);
router.delete(
  "/:id",
  authMiddleware(["admin", "student", "parent", "teacher"]),
  validate(userSchema),
  userController.deleteUser
);

module.exports = router;
