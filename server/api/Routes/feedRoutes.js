import feedController from "../Controllers/feedController.js";
import express from "express";

const router = express.Router();

// GET /api/feeds/:ip
router.get('/:ip', feedController.getVirusTotalIPScan);

export default router;
