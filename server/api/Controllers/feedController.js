import axios from "axios";
import asyncHandler from "../utils/asyncHelper.js";
import severityEnum from "../enums/severity.enum.js";
import httpStatusText from "../utils/httpStatusText.js";
import dotenv from "dotenv";
dotenv.config();


const VT_API_KEY = process.env.VIRUSTOTAL_API_KEY;

const getVirusTotalIPScan = asyncHandler(async (req, res) => {
    const { ip } = req.params;


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
});

const getVirusTotalDomainScan = asyncHandler(async (req, res) => {
    const { domain } = req.params;


    // VirusTotal call for domain
    const vtRes = await axios.get(
        `https://www.virustotal.com/api/v3/domains/${domain}`,
        { headers: { "x-apikey": VT_API_KEY } }
    );

    // Format the response into your feed structure
    const vtData = {
        indicator: domain,
        type: vtRes.data.data.type,  // should be "domain"
        threatType: "malicious activity",
        severity:
            vtRes.data.data.attributes.last_analysis_stats.malicious > 0
                ? severityEnum.HIGH
                : severityEnum.LOW,
        confidence: 90,
        source: "VirusTotal",
        timestamp: vtRes.data.data.attributes.last_analysis_date * 1000,
    };

    return res.json({ status: httpStatusText.SUCCESS, feeds: vtData });
});

const getVirusTotalFileHashScan = asyncHandler(async (req, res) => {
    const { file_hash } = req.params;


    // VirusTotal call for file hash
    const vtRes = await axios.get(
        `https://www.virustotal.com/api/v3/files/${file_hash}`,
        { headers: { "x-apikey": VT_API_KEY } }
    );

    // Format the response into your feed structure
    const vtData = {
        indicator: file_hash,
        type: vtRes.data.data.type, // should be "file"
        threatType: "malicious activity",
        severity:
            vtRes.data.data.attributes.last_analysis_stats.malicious > 0
                ? severityEnum.HIGH
                : severityEnum.LOW,
        confidence: 90,
        source: "VirusTotal",
        timestamp: vtRes.data.data.attributes.last_analysis_date * 1000,
    };

    return res.json({ status: httpStatusText.SUCCESS, feeds: vtData });
});

export default {
    getVirusTotalIPScan,
    getVirusTotalDomainScan,
    getVirusTotalFileHashScan
};
