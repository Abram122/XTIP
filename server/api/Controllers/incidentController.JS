import Incident from "../Models/Incident.js"
import User from "../Models/User.js"

export const createIncident = async (req, res) => {
    try {
        const { title, description, severity, reporterId, location } = req.body
        if (!title || !description || !severity || !reporterId) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const user = await User.findById(reporterId)
        if (!user) return res.status(404).json({ message: "Reporter not found" })

        const incident = new Incident({
            title,
            description,
            severity,
            reporter: user._id,
            location,
        })

        await incident.save()
        res.status(201).json({ message: "Incident created successfully", incident })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find()
            .populate("reporter", "name email")
            .sort({ createdAt: -1 })
        res.json(incidents)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getIncidentById = async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id)
            .populate("reporter", "name email")
        if (!incident) return res.status(404).json({ message: "Incident not found" })
        res.json(incident)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateIncident = async (req, res) => {
    try {
        const incident = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate("reporter", "name email")
        if (!incident) return res.status(404).json({ message: "Incident not found" })
        res.json({ message: "Incident updated", incident })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteIncident = async (req, res) => {
    try {
        const incident = await Incident.findByIdAndDelete(req.params.id)
        if (!incident) return res.status(404).json({ message: "Incident not found" })
        res.json({ message: "Incident deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
