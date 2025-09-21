import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { useState } from "react";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const threatLocations = [
  { country: "Russia", lat: 55.7558, lng: 37.6173, threats: 50, severity: "critical", description: "Leading cybercrime hub; ransomware (e.g., LockBit) and APTs dominate." },
  { country: "Ukraine", lat: 50.4501, lng: 30.5234, threats: 45, severity: "high", description: "Extortion, malware, and dark web markets; high cybercrime activity." },
  { country: "China", lat: 39.9042, lng: 116.4074, threats: 40, severity: "critical", description: "State-sponsored espionage, Volt Typhoon campaigns, and 150% rise in attacks." },
  { country: "USA", lat: 40.7128, lng: -74.0060, threats: 35, severity: "high", description: "Botnets, eCrime, and ~10% of global attack origins." },
  { country: "Nigeria", lat: 6.5244, lng: 3.3792, threats: 30, severity: "medium", description: "Phishing, BEC scams, and financial fraud prevalent." },
  { country: "Romania", lat: 44.4268, lng: 26.1025, threats: 25, severity: "medium", description: "Cybercrime tools and skimming operations." },
  { country: "North Korea", lat: 39.0392, lng: 125.7625, threats: 28, severity: "critical", description: "State-sponsored hacks, 304 incidents, crypto heists." },
  { country: "Iran", lat: 35.6892, lng: 51.3890, threats: 22, severity: "high", description: "Targeted ransomware and espionage, e.g., IRGC-linked attacks." },
  { country: "India", lat: 28.6139, lng: 77.2090, threats: 20, severity: "low", description: "Rising phishing and e-commerce fraud." },
  { country: "Brazil", lat: -23.5505, lng: -46.6333, threats: 15, severity: "medium", description: "Credential stuffing and regional malware campaigns." },
];

export function ThreatMap() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortedThreats = [...threatLocations].sort((a, b) =>
    sortOrder === "desc" ? b.threats - a.threats : a.threats - b.threats
  );

  return (
    <Card className="bg-gradient-to-br from-background via-card to-background border-border shadow-2xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <Globe className="w-6 h-6 text-primary drop-shadow" />
          </motion.div>
          <CardTitle className="text-foreground font-bold tracking-tight text-lg">
            Global Cyber Threat Map (2025)
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {/* Map Container */}
        <div className="relative bg-card rounded-lg p-4 min-h-[400px] flex items-center justify-center border border-border/50">
          <ComposableMap
            projectionConfig={{ scale: 130 }}
            width={600}
            height={360}
            style={{ width: "100%", height: "auto" }}
          >
            <ZoomableGroup zoom={1} center={[10, 20]} maxZoom={15} minZoom={0.7}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="hsl(var(--card))"
                      stroke="hsl(var(--border))"
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "hsl(var(--accent))", outline: "none", stroke: "hsl(var(--primary))" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
              {threatLocations.map((loc, idx) => (
                <Marker key={loc.country} coordinates={[loc.lng, loc.lat]}>
                  <motion.circle
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 120 }}
                    r={12}
                    fill={`hsl(var(--cti-${loc.severity}))`}
                    stroke="hsl(var(--foreground))"
                    strokeWidth={2}
                    style={{ cursor: "pointer", filter: "drop-shadow(0 0 8px hsl(var(--cti-${loc.severity})/0.5))" }}
                    data-tooltip-id={`threat-${loc.country}`}
                    data-tooltip-html={`
                      <div style="text-align: left; padding: 10px;">
                        <strong>${loc.country}</strong><br/>
                        Threats: ${loc.threats}<br/>
                        Severity: <span style="color:hsl(var(--cti-${loc.severity})); text-transform: capitalize;">${loc.severity}</span><br/>
                        ${loc.description}
                      </div>
                    `}
                  />
                  <motion.circle
                    r={18}
                    fill="none"
                    stroke={`hsl(var(--cti-${loc.severity}))`}
                    strokeWidth={2}
                    style={{ opacity: 0.5, pointerEvents: "none" }}
                    animate={{
                      scale: [1, 1.6, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      delay: idx * 0.1,
                    }}
                  />
                  <motion.text
                    x={16}
                    y={6}
                    fontSize={13}
                    fill="hsl(var(--foreground))"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.15 }}
                  >
                    {loc.threats}
                  </motion.text>
                  <Tooltip
                    id={`threat-${loc.country}`}
                    place="top"
                    style={{
                      backgroundColor: "hsl(var(--card))",
                      color: "hsl(var(--foreground))",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                      padding: "0",
                      maxWidth: "260px",
                      zIndex: 9999,
                      boxShadow: "0 6px 14px hsl(var(--border)/0.3)",
                    }}
                  />
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </div>

        {/* Severity Legend */}
        <div className="mt-4 flex justify-center gap-4 flex-wrap">
          {["critical", "high", "medium", "low"].map((sev) => (
            <div key={sev} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: `hsl(var(--cti-${sev}))` }}
              />
              <span className="text-xs text-muted-foreground capitalize">{sev}</span>
            </div>
          ))}
        </div>

        {/* Threat Locations List */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium text-foreground">Active Threat Sources</h4>
            <button
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              className="text-xs text-primary hover:text-primary-foreground transition-colors"
            >
              Sort {sortOrder === "desc" ? "↑ Asc" : "↓ Desc"}
            </button>
          </div>
          <div className="grid gap-2 max-h-48 overflow-y-auto pr-2">
            {sortedThreats.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.07 }}
                className="flex items-center justify-between p-3 rounded-lg border shadow-sm"
                style={{
                  background: `hsl(var(--cti-${location.severity})/0.1)`,
                  borderColor: `hsl(var(--cti-${location.severity})/0.3)`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full mr-2"
                    style={{
                      background: `hsl(var(--cti-${location.severity}))`,
                      boxShadow: `0 0 6px hsl(var(--cti-${location.severity})/0.5)`,
                    }}
                  />
                  <span className="text-sm font-medium text-foreground">{location.country}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-foreground">{location.threats}</div>
                  <div className="text-xs text-muted-foreground capitalize">{location.severity}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}