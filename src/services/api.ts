import axios from "axios";

// API Keys 
const OTX_API_KEY = process.env.REACT_APP_OTX_KEY;
const VT_API_KEY = process.env.REACT_APP_VT_KEY;
const GREYNOISE_API_KEY = process.env.REACT_APP_GREYNOISE_KEY;

// BASE URLs
const OTX_BASE = "https://otx.alienvault.com/api/v1";
const VT_BASE = "https://www.virustotal.com/api/v3";
const GREYNOISE_BASE = "https://api.greynoise.io/v3";
const ABUSECH_BASE = "https://urlhaus-api.abuse.ch/v1"; // URLs feed

// 1. Feeds (OTX Pulses)
export async function getFeedsCount() {
    const res = await axios.get(`${OTX_BASE}/pulses/subscribed`, {
        headers: { "X-OTX-API-KEY": OTX_API_KEY || "" },
    });
    return res.data.results?.length || 0;
}

// 2. Threats (VirusTotal Search)
export async function getRecentThreats(query = "malware") {
    const res = await axios.get(`${VT_BASE}/search?query=${query}`, {
        headers: { "x-apikey": VT_API_KEY || "" },
    });

    return res.data.data?.slice(0, 10).map((item: any) => ({
        id: item.id,
        indicator: item.attributes.meaningful_name || item.id,
        type: item.type,
        threatType: item.attributes.type_tag || "Unknown",
        severity: item.attributes.last_analysis_stats.malicious > 5
            ? "critical"
            : item.attributes.last_analysis_stats.malicious > 2
                ? "high"
                : item.attributes.last_analysis_stats.suspicious > 0
                    ? "medium"
                    : "low",
        source: "VirusTotal",
        timestamp: item.attributes.first_submission_date * 1000,
    })) || [];
}

// 3. Unique Malicious IPs (GreyNoise)
export async function checkIP(ip: string) {
    const res = await axios.get(`${GREYNOISE_BASE}/community/${ip}`, {
        headers: { key: GREYNOISE_API_KEY || "" },
    });
    return res.data;
}

// Example: count malicious IPs from a list
export async function getUniqueMaliciousIPs(ipList: string[]) {
    let maliciousCount = 0;
    for (const ip of ipList) {
        try {
            const data = await checkIP(ip);
            if (data.classification === "malicious") {
                maliciousCount++;
            }
        } catch (err) {
            console.warn("GreyNoise error for IP:", ip);
        }
    }
    return maliciousCount;
}

// 4. Total Indicators (Abuse.ch)
export async function getIndicatorsCount() {
    const res = await axios.post(`${ABUSECH_BASE}/urls/recent/`);
    return res.data.urls?.length || 0;
}
