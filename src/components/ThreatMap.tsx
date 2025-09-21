import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const SEVERITIES = ["critical", "high", "medium", "low"];

const threatLocations = [
  { country: "Russia", lat: 55.7558, lng: 37.6173, threats: 50, severity: "critical", description: "Ransomware, APTs" },
  { country: "China", lat: 39.9042, lng: 116.4074, threats: 40, severity: "critical", description: "Espionage, APT41" },
  { country: "USA", lat: 37.0902, lng: -95.7129, threats: 35, severity: "high", description: "Botnets, eCrime" },
  { country: "Iran", lat: 35.6892, lng: 51.389, threats: 22, severity: "high", description: "IRGC-linked ransomware" },
];

const vulnerabilities = [
  { country: "USA", lat: 38.9072, lng: -77.0369, cve: "CVE-2025-1234", severity: "critical", desc: "RCE in Apache module" },
  { country: "India", lat: 28.6139, lng: 77.209, cve: "CVE-2025-9876", severity: "medium", desc: "SQLi in e-commerce app" },
];

const getColor = (sev: string) => {
  switch (sev) {
    case "critical": return "hsl(var(--destructive))";
    case "high": return "hsl(25 95% 65%)";
    case "medium": return "hsl(45 93% 70%)";
    case "low": return "hsl(142 76% 60%)";
    default: return "hsl(var(--muted-foreground))";
  }
};

function randomizeThreats(threats: typeof threatLocations) {
  return threats.map((t) => ({
    ...t,
    threats: Math.floor(Math.random() * 60 + 10),
    severity: SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)],
  }));
}

export function ThreatMap() {
  const [liveThreats, setLiveThreats] = useState(threatLocations);
  const [filter, setFilter] = useState<string[]>(SEVERITIES);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveThreats(randomizeThreats(threatLocations));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-background border-border shadow-2xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <motion.div initial={{ rotate: -15 }} animate={{ rotate: 0 }} transition={{ type: "spring", stiffness: 100 }}>
            <Globe className="w-7 h-7 text-primary drop-shadow animate-spin-slow" />
          </motion.div>
          <CardTitle className="text-foreground font-bold tracking-tight text-lg">
            Global Threat & Vulnerability Map
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex gap-3 flex-wrap justify-center">
          {SEVERITIES.map((sev) => (
            <button
              key={sev}
              className={`px-3 py-1 rounded-full border ${filter.includes(sev) ? "bg-primary text-white" : "bg-muted"}`}
              onClick={() =>
                setFilter((prev) =>
                  prev.includes(sev) ? prev.filter((f) => f !== sev) : [...prev, sev]
                )
              }
            >
              {sev.charAt(0).toUpperCase() + sev.slice(1)}
            </button>
          ))}
        </div>
        <div className="relative bg-card rounded-lg p-3 min-h-[480px] border border-border/50">
          <ComposableMap
            projectionConfig={{ scale: 150 }}
            width={850}
            height={450}
            style={{ width: "100%", height: "auto" }}
          >
            <ZoomableGroup zoom={1} center={[10, 20]} maxZoom={10} minZoom={0.7}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo, i) => (
                    <motion.g
                      key={geo.rsmKey}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.002 }}
                    >
                      <Geography
                        geography={geo}
                        fill="hsl(var(--muted)/0.15)"
                        stroke="hsl(var(--border))"
                        style={{
                          default: { outline: "none" },
                          hover: { fill: "hsl(var(--accent))", stroke: "hsl(var(--primary))" },
                        }}
                      />
                    </motion.g>
                  ))
                }
              </Geographies>
              {liveThreats
                .filter((loc) => filter.includes(loc.severity))
                .map((loc, idx) => (
                  <Marker key={loc.country} coordinates={[loc.lng, loc.lat]}>
                    <motion.circle
                      r={12}
                      fill={getColor(loc.severity)}
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [0, 1.4, 1],
                        opacity: [0.7, 1, 0.7],
                        boxShadow: "0 0 20px 5px hsl(var(--destructive)/0.5)",
                      }}
                      transition={{
                        delay: idx * 0.2,
                        duration: 1.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                      data-tooltip-id={`threat-${loc.country}`}
                      data-tooltip-html={`<b>${loc.country}</b><br/>Threats: ${loc.threats}<br/>Severity: ${loc.severity}<br/>${loc.description}`}
                      style={{
                        cursor: "pointer",
                        filter: "drop-shadow(0 0 10px rgba(0,0,0,0.6))",
                      }}
                    />
                    <motion.text
                      x={16}
                      y={6}
                      fontSize={13}
                      fill="hsl(var(--foreground))"
                      className="font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.3 }}
                    >
                      {loc.country}
                    </motion.text>
                    <Tooltip id={`threat-${loc.country}`} />
                  </Marker>
                ))}
              {vulnerabilities.map((vuln, idx) => (
                <Marker key={vuln.cve} coordinates={[vuln.lng, vuln.lat]}>
                  <motion.rect
                    x={-6}
                    y={-6}
                    width={12}
                    height={12}
                    fill={getColor(vuln.severity)}
                    stroke="hsl(var(--foreground))"
                    strokeWidth={1.5}
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ delay: idx * 0.25, duration: 0.8 }}
                    data-tooltip-id={`vuln-${vuln.cve}`}
                    data-tooltip-html={`<b>${vuln.cve}</b><br/>Severity: ${vuln.severity}<br/>${vuln.desc}`}
                  />
                  <motion.text
                    x={14}
                    y={5}
                    fontSize={12}
                    fill="hsl(var(--foreground))"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.4 }}
                  >
                    {vuln.country}
                  </motion.text>
                  <Tooltip id={`vuln-${vuln.cve}`} />
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </div>
        <div className="mt-5 flex justify-center gap-6 flex-wrap">
          {SEVERITIES.map((sev) => (
            <div key={sev} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: getColor(sev) }} />
              <span className="text-xs text-muted-foreground capitalize">{sev}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}