import express from "express";
import {
  registerUser,
  loginUser,
  saveAuthUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, (req, res) => {
    res.json({ message: "User data", userId: req.user.id });
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/save", saveAuthUser);

export default router;
