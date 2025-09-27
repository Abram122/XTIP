import express from "express"
import {
    createIncident,
    getIncidents,
    getIncidentById,
    updateIncident,
    deleteIncident,
} from "../Controllers/incidentController.js";

const router = express.Router()

router.post("/", createIncident)
router.get("/", getIncidents)
router.get("/:id", getIncidentById)
router.put("/:id", updateIncident)
router.delete("/:id", deleteIncident)

export default router
