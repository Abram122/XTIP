import axios from "axios";
import asyncHandler from "../utils/asyncHelper.js";
import severityEnum from "../enums/severity.enum.js";
import httpStatusText from "../utils/httpStatusText.js";
import dotenv from "dotenv";
dotenv.config();


const VT_API_KEY = process.env.VIRUSTOTAL_API_KEY;

const getVirusTotalIPScan = asyncHandler(async (req, res) => {
    const { ip } = req.params;

    console.log(`\n ------------------ VT_API_KEY starts with ahoo: ------------- \n`, VT_API_KEY);

    // MS- VirusTotal call
    const vtRes = await axios.get(
      `https://virustotal.com/api/v3/ip_addresses/${ip}`,
      { headers: { "x-apikey": VT_API_KEY } }
    );

    console.log(`\n------------------------ ${vtRes} ---------------------\n`);
    
    const vtData = {
      indicator: ip,
      type: vtRes.type,
      threatType: "malicious activity",
      severity:
        vtRes.data.data.attributes.last_analysis_stats.malicious > 0
          ? severityEnum.HIGH
          : severityEnum.LOW,
      confidence: 90,
      source: "VirusTotal",
      timestamp:
        vtRes.data.data.attributes.last_analysis_date * 1000,
    };

    return res.json({ status: httpStatusText.SUCCESS, feeds: vtData });
})

export default {
    getVirusTotalIPScan
};
