import express from "express";
import {
  registerUser,
  loginUser,
  saveAuthUser,
  getProfile,
  updateProfile,
} from "../Controllers/userController.js";

const router = express.Router();

router.get("/me", getProfile);
router.patch("/me", updateProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/save", saveAuthUser);

export default router;
