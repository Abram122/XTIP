import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";

const API_BASE = "http://localhost:3000/api/feeds";

// --- format values user-friendly ---
const formatValue = (key: string, value: any) => {
  if (value == null) return "-";

  const k = key.toLowerCase();

  // hide raw completely
  if (k.includes("raw")) return null;

  // severity → colored badge
  if (k === "severity") {
    const sev = String(value).toUpperCase();
    let color = "bg-gray-500";
    if (sev.includes("CRIT")) color = "bg-red-600";
    else if (sev.includes("HIGH")) color = "bg-orange-500";
    else if (sev.includes("MED")) color = "bg-yellow-400 text-black";
    else if (sev.includes("LOW")) color = "bg-green-500";
    else if (sev.includes("INFO")) color = "bg-blue-500";
    return <Badge className={`${color} text-white`}>{sev}</Badge>;
  }

  // infocon → colored badge
  if (k === "infocon") {
    const val = String(value).toLowerCase();
    let color = "bg-gray-500";
    if (val === "green") color = "bg-green-500";
    else if (val === "yellow") color = "bg-yellow-400 text-black";
    else if (val === "orange") color = "bg-orange-500";
    else if (val === "red") color = "bg-red-600";
    return <Badge className={`${color} text-white`}>{val.toUpperCase()}</Badge>;
  }

  // timestamps
  if (k.includes("time") || k.includes("date") || k.includes("at")) {
    try {
      const date = new Date(value);
      if (!isNaN(date.getTime())) return date.toLocaleString();
    } catch {
      return String(value);
    }
  }

  // arrays → join
  if (Array.isArray(value)) return value.join(", ");

  if (typeof value === "object") {
    // instead of dumping JSON, show keys
    return Object.keys(value).join(", ");
  }

  return String(value);
};

// --- normalize backend data ---
const extractData = (res: any) => {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (res.data) return extractData(res.data);
  if (res.blacklist) return res.blacklist;
  if (res.feeds) return Array.isArray(res.feeds) ? res.feeds : [res.feeds];
  if (res.host) return [res.host];
  if (res.ports) return Array.isArray(res.ports) ? res.ports : [res.ports];
  if (res.topPorts) return res.topPorts?.topports ?? [];
  if (res.feedsNormalized) return [res.feedsNormalized];
  return [res];
};

type Section = {
  title: string;
  endpoint: string;
  needsInput?: boolean;
  inputLabel?: string;
  queryParam?: string;
};

const sections: Section[] = [
  { title: "VirusTotal - IP Scan", endpoint: "/vt/ip/", needsInput: true, inputLabel: "IP Address" },
  { title: "VirusTotal - Domain Scan", endpoint: "/vt/domain/", needsInput: true, inputLabel: "Domain" },
  { title: "VirusTotal - File Hash Scan", endpoint: "/vt/file/", needsInput: true, inputLabel: "File Hash" },
  { title: "AbuseIPDB - Check IP", endpoint: "/ab/ip/", needsInput: true, inputLabel: "IP Address" },
  { title: "AbuseIPDB - Blacklist", endpoint: "/ab/blacklist" },
  { title: "Shodan - Host Info", endpoint: "/sh/host/", needsInput: true, inputLabel: "IP Address" },
  { title: "Shodan - Ports", endpoint: "/sh/ports" },
  { title: "Shodan - Count", endpoint: "/sh/count?query=apache" }, // demo query
  { title: "Shodan - My IP", endpoint: "/sh/myip" },
  { title: "SANS - IP", endpoint: "/sans/ip/", needsInput: true, inputLabel: "IP Address" },
  { title: "SANS - Top Sources", endpoint: "/sans/top-sources" },
  { title: "SANS - InfoCon", endpoint: "/sans/infocon" },
  { title: "SANS - IP Details", endpoint: "/sans/ipdetails/", needsInput: true, inputLabel: "IP Address" },
  { title: "SANS - Port", endpoint: "/sans/port/", needsInput: true, inputLabel: "Port" },
  { title: "SANS - Top Ports", endpoint: "/sans/top-ports", needsInput: true, inputLabel: "Limit (e.g. 10)", queryParam: "limit" },
];

export default function Feeds() {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [results, setResults] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const fetchData = async (section: Section) => {
    setLoading((prev) => ({ ...prev, [section.title]: true }));
    try {
      let url = API_BASE + section.endpoint;
      if (section.needsInput && inputValues[section.title]) {
        if (section.queryParam) {
          url += `?${section.queryParam}=${encodeURIComponent(inputValues[section.title])}`;
        } else {
          url += encodeURIComponent(inputValues[section.title]);
        }
      }
      const res = await axios.get(url);
      const data = extractData(res.data);
      setResults((prev) => ({ ...prev, [section.title]: data }));
    } catch (err: any) {
      setResults((prev) => ({
        ...prev,
        [section.title]: [{ error: err.message }],
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [section.title]: false }));
    }
  };

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <Card key={section.title} className="border-border shadow-lg">
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 mb-4">
              {section.needsInput && (
                <Input
                  placeholder={section.inputLabel || "Enter value"}
                  value={inputValues[section.title] || ""}
                  onChange={(e) =>
                    setInputValues((prev) => ({
                      ...prev,
                      [section.title]: e.target.value,
                    }))
                  }
                />
              )}
              <Button
                onClick={() => fetchData(section)}
                disabled={loading[section.title]}
              >
                {loading[section.title] ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  "Fetch"
                )}
              </Button>
            </div>

            {results[section.title] && results[section.title].length > 0 && (
              <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.keys(results[section.title][0]).map((key) => (
                        <TableHead key={key}>{key}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results[section.title].map((row, idx) => (
                      <TableRow key={idx}>
                        {Object.entries(row).map(([k, v]) => {
                          const val = formatValue(k, v);
                          return val === null ? null : (
                            <TableCell key={k}>{val}</TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
