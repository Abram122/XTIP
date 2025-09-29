import Incident from "../Models/Incident.js"
import User from "../Models/User.js"
import nodemailer from "nodemailer"

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
            sector: user.sector,
        })

        await incident.save()

        const sectorUsers = await User.find({ sector: user.sector, _id: { $ne: user._id } })

        if (sectorUsers.length > 0) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            })

            const mailOptions = (recipient) => ({
                from: `"Security System" <${process.env.EMAIL_USER}>`,
                to: recipient.email,
                subject: `New Incident in ${user.sector}: ${title}`,
                html: `
                <div style="background-color:#0f172a; color:#f8fafc; font-family:Arial, sans-serif; padding:40px; text-align:center;">
                <div style="max-width:600px; margin:auto; background:#1e293b; border-radius:12px; overflow:hidden; border:1px solid #334155;">
                    
                    <header style="background:#0f172a; padding:20px;">
                    <h1 style="color:#22d3ee; font-size:26px; margin:0;">🚨 New Security Incident</h1>
                    <p style="color:#94a3b8; margin:8px 0 0;">Cyber Security Platform Notification</p>
                    </header>

                    <main style="padding:30px; text-align:left;">
                    <h2 style="color:#22d3ee; font-size:22px; margin-bottom:10px;">${title}</h2>
                    <p style="font-size:15px; color:#cbd5e1; margin-bottom:20px;">
                        A new incident has been reported in your sector. Please review the details below.
                    </p>

                    <div style="background:#0f172a; padding:20px; border-radius:8px; border:1px solid #334155; margin-bottom:25px;">
                        <p style="margin:6px 0;"><b style="color:#22d3ee;">Description:</b> ${description}</p>
                        <p style="margin:6px 0;"><b style="color:#22d3ee;">Severity:</b> ${severity}</p>
                        <p style="margin:6px 0;"><b style="color:#22d3ee;">Location:</b> ${location || "N/A"}</p>
                        <p style="margin:6px 0;"><b style="color:#22d3ee;">Date:</b> ${new Date().toLocaleString()}</p>
                    </div>

                    <h3 style="font-size:18px; margin-bottom:10px; color:#f1f5f9;">👤 Reported By</h3>
                    <div style="background:#0f172a; padding:15px; border-radius:8px; border:1px solid #334155; margin-bottom:25px;">
                        <p style="margin:5px 0;"><b style="color:#22d3ee;">Name:</b> ${user.fullName}</p>
                        <p style="margin:5px 0;"><b style="color:#22d3ee;">Email:</b> ${user.email}</p>
                        <p style="margin:5px 0;"><b style="color:#22d3ee;">Sector:</b> ${user.sector}</p>
                    </div>

                    <div style="text-align:center; margin:30px 0;">
                        <a href="https://ctip-awnv.vercel.app/incidents" 
                        style="background:#22d3ee; color:#0f172a; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:bold; font-size:15px; display:inline-block;">
                        🔎 View Incident
                        </a>
                    </div>
                    </main>

                    <footer style="background:#0f172a; padding:20px; font-size:12px; color:#64748b;">
                    <p>&copy; ${new Date().getFullYear()} Cyber Security Platform. All rights reserved.</p>
                    <p>If you did not expect this email, please ignore it.</p>
                    </footer>
                </div>
                </div>

                `,
            })

            for (const recipient of sectorUsers) {
                try {
                    await transporter.sendMail(mailOptions(recipient))
                } catch (err) {
                    console.error(`Failed to send email to ${recipient.email}:`, err)
                }
            }
        }

        res.status(201).json({ message: "Incident created successfully and notifications sent", incident })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getIncidents = async (req, res) => {
    try {
        const { status, name, date } = req.query
        const query = {}

        if (status) query.status = status

        if (date) {
            const start = new Date(date)
            start.setHours(0, 0, 0, 0)
            const end = new Date(date)
            end.setHours(23, 59, 59, 999)
            query.createdAt = { $gte: start, $lte: end }
        }

        let incidentsQuery = Incident.find(query)
            .populate({
                path: "reporter",
                select: "fullName email sector",
                match: name ? { fullName: { $regex: name, $options: "i" } } : {},
            })
            .sort({ createdAt: -1 })

        let incidents = await incidentsQuery
        incidents = incidents.filter((i) => i.reporter)

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
