import axios from "axios";

const VIRUSTOTAL_API = "https://www.virustotal.com/api/v3";
const API_KEY = process.env.VIRUSTOTAL_API_KEY;

//  Scan URL
export const scanUrl = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "URL is required" });

        const response = await axios.post(
            `${VIRUSTOTAL_API}/urls`,
            new URLSearchParams({ url }),
            {
                headers: {
                    "x-apikey": API_KEY,
                    "content-type": "application/x-www-form-urlencoded",
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("VirusTotal Scan Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to scan URL" });
    }
};

//  Get Report by analysis_id
export const getReport = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: "Analysis ID is required" });

        const response = await axios.get(`${VIRUSTOTAL_API}/analyses/${id}`, {
            headers: { "x-apikey": API_KEY },
        });

        res.json(response.data);
    } catch (error) {
        console.error("VirusTotal Report Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch report" });
    }
};
