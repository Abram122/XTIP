import { Router } from "express";
import verificationRoutes from "./verificationRoutes.js";
import userRoutes from "./userRoutes.js";
import newsRoutes from "./newsRoutes.js";

const router = Router();

router.use("/verification", verificationRoutes);
router.use("/user", userRoutes);
router.use("/news", newsRoutes);

export default router;
