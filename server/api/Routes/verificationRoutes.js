import { Router } from "express";
import { sendCode, verifyCode, resendCode } from "../controllers/verificationController.js";

const router = Router();

router.post("/send", sendCode);
router.post("/verify", verifyCode);
router.post("/resend", resendCode);

export default router;
