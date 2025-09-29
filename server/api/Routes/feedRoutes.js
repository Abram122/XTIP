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

// MS- Define routes for Shodan
router.get("/sh/host/:ip", feedController.shodanGetHostInfo);
router.get("/sh/ports", feedController.shodanGetPorts);
router.get("/sh/count", feedController.shodanGetCount);
router.get("/sh/myip", feedController.shodanGetMyIP);
router.get("/sh/api-info", feedController.shodanGetApiInfo);

// MS- Define routes for SANS
router.get("/sans/ip/:ip", feedController.sansGetIP);
router.get("/sans/top-sources", feedController.sansGetTopSources);
router.get("/sans/infocon", feedController.sansGetInfoCon);
router.get("/sans/ipdetails/:ip", feedController.sansGetIPDetails);
router.get("/sans/port/:port", feedController.sansGetPort);
router.get("/sans/top-ports", feedController.sansGetTopPorts);


export default router;
