import express from "express";
import { scanUrl, getReport } from "../Controllers/URLLookup.js";

const router = express.Router();

// Scan new URL
router.post("/scan", scanUrl);

// Get report by analysis_id
router.get("/report/:id", getReport);

export default router;
