import { Router } from "express";
import verificationRoutes from "./verificationRoutes.js";

const router = Router();

router.use("/verification", verificationRoutes);

export default router;
