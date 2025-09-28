import express from "express";
import { ipReputation } from "../Controllers/ipController.js";

const router = express.Router();

router.post("/ip-reputation", ipReputation);

export default router;
