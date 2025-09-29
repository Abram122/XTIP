import axios from "axios";
import asyncHandler from "../utils/asyncHelper.js";
import severityEnum from "../enums/severity.enum.js";
import httpStatusText from "../utils/httpStatusText.js";
import dotenv from "dotenv";
dotenv.config();

const VT_API_KEY = process.env.VIRUSTOTAL_API_KEY;
const ABUSE_API_KEY = process.env.ABUSEIPDB_API_KEY;
const ABUSE_BASE = "https://api.abuseipdb.com/api/v2";

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
    timestamp: vtRes.data.data.attributes.last_analysis_date * 1000,
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
    type: vtRes.data.data.type, // should be "domain"
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

const getAbuseIP = asyncHandler(async (req, res) => {
  const { ip } = req.params;
  const { maxAgeInDays = 90 } = req.query;

  if (!ABUSE_API_KEY) {
    return res.status(500).json({ error: "AbuseIPDB API key not configured" });
  }

  const url = `${ABUSE_BASE}/check`;
  const response = await axios.get(url, {
    params: { ipAddress: ip, maxAgeInDays },
    headers: {
      Key: ABUSE_API_KEY,
      Accept: "application/json",
    },
    timeout: 10_000,
  });

  const d = response.data?.data;

  const result = {
    indicator: ip,
    type: "ip",
    threatType: "abuse reports",
    severity:
      d?.abuseConfidenceScore > 75
        ? severityEnum.HIGH
        : d?.abuseConfidenceScore > 40
        ? severityEnum.MEDIUM
        : severityEnum.LOW,
    confidence: d?.abuseConfidenceScore ?? 0,
    source: "AbuseIPDB",
    reports: d?.reports ?? [],
    country: d?.countryCode ?? null,
    lastReportedAt: d?.lastReportedAt ?? null,
    timestamp: Date.now(),
    raw: d,
  };

  return res.json({ status: httpStatusText.SUCCESS, data: result });
});

const downloadBlacklist = asyncHandler(async (req, res) => {
  const { confidenceMinimum = 90, limit = 10000 } = req.query;

  if (!ABUSE_API_KEY) {
    return res.status(500).json({ error: "AbuseIPDB API key not configured" });
  }

  const url = `${ABUSE_BASE}/blacklist`;
  const response = await axios.get(url, {
    params: {
      confidenceMinimum,
      limit,
    },
    headers: {
      Key: ABUSE_API_KEY,
      Accept: "application/json",
    },
    timeout: 20_000,
  });

  // Response shape: response.data.data is usually an array of objects { ipAddress, abuseConfidenceScore, lastReportedAt, countryCode, ... }
  const rows = (response.data?.data || []).map((row) => ({
    indicator: row.ipAddress || row.ip || null,
    abuseConfidenceScore: row.abuseConfidenceScore ?? null,
    lastReportedAt: row.lastReportedAt ?? null,
    country: row.countryCode ?? null,
    reportCount: row.reportCount ?? null,
    raw: row,
  }));

  return res.json({
    status: httpStatusText.SUCCESS,
    meta: { count: rows.length, confidenceMinimum: Number(confidenceMinimum) },
    blacklist: rows,
  });
});

export default {
  getVirusTotalIPScan,
  getVirusTotalDomainScan,
  getVirusTotalFileHashScan,
  getAbuseIP,
  downloadBlacklist,
};
