import { Router } from "express";
import verificationRoutes from "./verificationRoutes.js";
import userRoutes from "./userRoutes.js";

const router = Router();

router.use("/verification", verificationRoutes);
router.use("/user", userRoutes);

export default router;
