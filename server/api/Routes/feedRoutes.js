import feedController from "../controllers/feedController.js";
import express from "express";

const router = express.Router();


router.get('/vt/ip/:ip', feedController.getVirusTotalIPScan);
router.get("/vt/domain/:domain", feedController.getVirusTotalDomainScan);
router.get("/vt/file/:file_hash", feedController.getVirusTotalFileHashScan);


export default router;
