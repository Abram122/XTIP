import feedController from "../Controllers/feedController.js";
import express from "express";

const router = express.Router();


// MS- Define routes for VirusTotal
router.get('/vt/ip/:ip', feedController.getVirusTotalIPScan);
router.get("/vt/domain/:domain", feedController.getVirusTotalDomainScan);
router.get("/vt/file/:file_hash", feedController.getVirusTotalFileHashScan);


// MS- Define routes for AbuseIPDB
router.get("/ab/ip/:ip", feedController.getAbuseIP);
router.get("/ab/blacklist", feedController.downloadBlacklist);


export default router;
