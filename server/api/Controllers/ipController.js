import axios from "axios"

export const ipReputation = async (req, res) => {
    try {
        const { ip } = req.body
        if (!ip) {
            return res.status(400).json({ error: "IP is required" })
        }

        const apiKey = process.env.PULSEDIVE_API_KEY 
        const url = `https://pulsedive.com/api/info.php?indicator=${ip}${apiKey ? `&key=${apiKey}` : ""}`

        const response = await axios.get(url)

        return res.json({
            indicator: ip,
            reputation: response.data.risk || "unknown",
            threatType: response.data.threat || "N/A",
            details: response.data
        })
    } catch (error) {
        console.error("IP Reputation Error:", error.response?.data || error.message)
        return res.status(error.response?.status || 500).json({
            error: "Failed to fetch IP reputation",
            details: error.response?.data || error.message,
        })
    }
}
