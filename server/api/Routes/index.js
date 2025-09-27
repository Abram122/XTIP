import { Router } from "express";

import verificationRoutes from "./verificationRoutes.js";
import userRoutes from "./userRoutes.js";
import feedRoutes from "./feedRoutes.js";
import newsRoutes from "./newsRoutes.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();
router.use(protect);
router.use("/user", userRoutes);
router.use("/verification", verificationRoutes);
router.use("/news", newsRoutes);
router.use("/feeds", feedRoutes);

export default router;