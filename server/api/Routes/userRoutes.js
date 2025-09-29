import express from "express";
import {
  registerUser,
  loginUser,
  saveAuthUser,
  logoutUser,
  getProfile,
  updateProfile,
} from "../Controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, (req, res) => {
    res.json({ message: "User data", userId: req.user.id });
});

router.get("/myprofile", protect, getProfile);
router.patch("/updateprofile", protect, updateProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/save", saveAuthUser);
router.post("/logout", logoutUser);

export default router;
