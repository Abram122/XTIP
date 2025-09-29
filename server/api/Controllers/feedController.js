import axios from "axios";
import asyncHandler from "../utils/asyncHelper.js";
import severityEnum from "../enums/severity.enum.js";
import httpStatusText from "../utils/httpStatusText.js";
import dotenv from "dotenv";
dotenv.config();

const VT_API_KEY = process.env.VIRUSTOTAL_API_KEY;
const ABUSE_API_KEY = process.env.ABUSEIPDB_API_KEY;
const ABUSE_BASE = "https://api.abuseipdb.com/api/v2";
const SHODAN_KEY = process.env.SHODAN_API_KEY;
const SHODAN_BASE = "https://api.shodan.io";
const SANS_BASE = "https://isc.sans.edu/api";

const normalize = (data, type, source = "SANS ISC") => {
  return {
    indicator: data.indicator || data.ip || data.port || "unknown",
    type,
    threatType: data.threatType || "suspicious activity",
    severity: data.severity || severityEnum.MEDIUM,
    confidence: data.confidence || 70,
    source,
    timestamp: Date.now(),
    raw: data, // MS- keep original for debugging/advanced use
  };
};

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

const shodanGetHostInfo = asyncHandler(async (req, res) => {
  const { ip } = req.params;

  if (!SHODAN_KEY)
    return res.status(500).json({ error: "SHODAN_API_KEY not configured" });

  const url = `${SHODAN_BASE}/shodan/host/${encodeURIComponent(
    ip
  )}?key=${SHODAN_KEY}`;
  const response = await axios.get(url, { timeout: 15000 });

  return res.json({ status: httpStatusText.SUCCESS, host: response.data });
});

const shodanGetPorts = asyncHandler(async (req, res) => {
  if (!SHODAN_KEY)
    return res.status(500).json({ error: "SHODAN_API_KEY not configured" });

  const url = `${SHODAN_BASE}/shodan/ports?key=${SHODAN_KEY}`;
  const response = await axios.get(url, { timeout: 15000 });

  return res.json({ status: httpStatusText.SUCCESS, ports: response.data });
});

const shodanGetCount = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!SHODAN_KEY)
    return res.status(500).json({ error: "SHODAN_API_KEY not configured" });
  if (!query)
    return res.status(400).json({ error: "query parameter is required" });

  const url = `${SHODAN_BASE}/shodan/host/count?key=${SHODAN_KEY}&query=${encodeURIComponent(
    query
  )}`;
  const response = await axios.get(url, { timeout: 15000 });

  // MS- Shodan returns an object with 'total' and 'facets' (if requested)
  return res.json({ status: httpStatusText.SUCCESS, count: response.data });
});

const shodanGetMyIP = asyncHandler(async (req, res) => {
  if (!SHODAN_KEY)
    return res.status(500).json({ error: "SHODAN_API_KEY not configured" });

  const url = `${SHODAN_BASE}/tools/myip?key=${SHODAN_KEY}`;
  const response = await axios.get(url, { timeout: 10000 });

  // MS- Shodan returns a plain string (e.g. "1.2.3.4") — wrap it
  return res.json({ status: httpStatusText.SUCCESS, myip: response.data });
});

const shodanGetApiInfo = asyncHandler(async (req, res) => {
  if (!SHODAN_KEY)
    return res.status(500).json({ error: "SHODAN_API_KEY not configured" });

  const url = `${SHODAN_BASE}/api-info?key=${SHODAN_KEY}`;
  const response = await axios.get(url, { timeout: 10000 });

  // MS- response contains plan info, query credits, etc.
  return res.json({ status: httpStatusText.SUCCESS, apiInfo: response.data });
});

const sansGetIP = asyncHandler(async (req, res) => {
  const { ip } = req.params;
  const url = `${SANS_BASE}/ip/${encodeURIComponent(ip)}?json`;
  const response = await axios.get(url, { timeout: 10000 });

  const normalized = normalize(
    {
      ...response.data.ip,
      indicator: ip,
      type: "ip",
      threatType: "activity reports",
    },
    "ip"
  );

  return res.json({ status: httpStatusText.SUCCESS, feeds: normalized });
});

const sansGetTopSources = asyncHandler(async (req, res) => {
  const url = `${SANS_BASE}/topips?json`;
  const response = await axios.get(url, { timeout: 10000 });

  const normalized = response.data.topips.map((src) =>
    normalize(
      {
        indicator: src.ip,
        type: "ip",
        threatType: "top source",
        severity: severityEnum.HIGH,
      },
      "ip"
    )
  );

  return res.json({ status: httpStatusText.SUCCESS, feeds: normalized });
});

const sansGetInfoCon = asyncHandler(async (_req, res) => {
  const url = `${SANS_BASE}/infocon?json`;
  const response = await axios.get(url, { timeout: 5000 });

  const severity =
    response.data.infocon?.toLowerCase() === "green"
      ? severityEnum.LOW
      : response.data.infocon?.toLowerCase() === "yellow"
      ? severityEnum.MEDIUM
      : severityEnum.HIGH;

  const normalized = normalize(
    {
      indicator: "global",
      type: "status",
      threatType: "internet threat level",
      severity,
    },
    "status"
  );

  return res.json({ status: httpStatusText.SUCCESS, feeds: normalized });
});

const sansGetIPDetails = asyncHandler(async (req, res) => {
  const { ip } = req.params;
  const url = `${SANS_BASE}/ipdetails/${encodeURIComponent(ip)}?json`;
  const response = await axios.get(url, { timeout: 10000 });

  const normalized = normalize(
    {
      ...response.data,
      indicator: ip,
      type: "ip",
      threatType: "detailed ip report",
    },
    "ip"
  );

  return res.json({ status: httpStatusText.SUCCESS, feeds: normalized });
});

const sansGetPort = asyncHandler(async (req, res) => {
  const url = `${SANS_BASE}/ports?json`;
  const response = await axios.get(url, { timeout: 10000 });

  const normalized = response.data.ports.map((prt) =>
    normalize(
      {
        indicator: prt.port,
        type: "port",
        threatType: "top port",
        severity: severityEnum.HIGH,
      },
      "port"
    )
  );

  return res.json({ status: httpStatusText.SUCCESS, feeds: normalized });
});

const sansGetTopPorts = asyncHandler(async (_req, res) => {
  const url = `${SANS_BASE}/ports?json`;
  const response = await axios.get(url, { timeout: 10000 });

  return res.json({ status: httpStatusText.SUCCESS, topPorts: response.data });
});

export default {
  getVirusTotalIPScan,
  getVirusTotalDomainScan,
  getVirusTotalFileHashScan,
  getAbuseIP,
  downloadBlacklist,
  shodanGetHostInfo,
  shodanGetPorts,
  shodanGetCount,
  shodanGetMyIP,
  shodanGetApiInfo,
  sansGetIP,
  sansGetTopSources,
  sansGetInfoCon,
  sansGetIPDetails,
  sansGetPort,
  sansGetTopPorts,
};
