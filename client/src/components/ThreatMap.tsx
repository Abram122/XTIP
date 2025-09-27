import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, RefreshCw } from "lucide-react"
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps"
import { motion } from "framer-motion"
import { Tooltip } from "react-tooltip"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

const SEVERITIES = ["critical", "high", "medium", "low"]

const initialThreats = [
  { country: "Russia", lat: 55.7558, lng: 37.6173, threats: 50, severity: "critical", description: "Ransomware, APTs" },
  { country: "China", lat: 39.9042, lng: 116.4074, threats: 40, severity: "critical", description: "Espionage, APT41" },
  { country: "USA", lat: 37.0902, lng: -95.7129, threats: 35, severity: "high", description: "Botnets, eCrime" },
  { country: "Iran", lat: 35.6892, lng: 51.389, threats: 22, severity: "high", description: "IRGC-linked ransomware" },
]

const vulnerabilities = [
  { country: "USA", lat: 38.9072, lng: -77.0369, cve: "CVE-2025-1234", severity: "critical", desc: "RCE in Apache module" },
  { country: "India", lat: 28.6139, lng: 77.209, cve: "CVE-2025-9876", severity: "medium", desc: "SQLi in e-commerce app" },
]

const getColor = (sev: string) => {
  switch (sev) {
    case "critical": return "hsl(var(--destructive))"
    case "high": return "hsl(25 95% 65%)"
    case "medium": return "hsl(45 93% 70%)"
    case "low": return "hsl(142 76% 60%)"
    default: return "hsl(var(--muted-foreground))"
  }
}

const randomizeThreats = (threats: typeof initialThreats) =>
  threats.map((t) => ({
    ...t,
    threats: Math.floor(Math.random() * 60 + 10),
    severity: SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)],
  }))

export function ThreatMap() {
  const [liveThreats, setLiveThreats] = useState(initialThreats)
  const [filter, setFilter] = useState<string[]>(SEVERITIES)
  const [autoUpdate, setAutoUpdate] = useState(true)

  useEffect(() => {
    if (!autoUpdate) return
    const interval = setInterval(() => {
      setLiveThreats(randomizeThreats(initialThreats))
    }, 5000)
    return () => clearInterval(interval)
  }, [autoUpdate])

  const refresh = () => setLiveThreats(randomizeThreats(initialThreats))

  return (
    <Card className="bg-gradient-to-br from-background via-card to-background/90 border-border shadow-2xl">
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <motion.div initial={{ rotate: -15 }} animate={{ rotate: 0 }} transition={{ type: "spring", stiffness: 100 }}>
            <Globe className="w-7 h-7 text-primary drop-shadow animate-spin-slow" />
          </motion.div>
          <CardTitle className="text-foreground font-bold tracking-tight text-lg">
            Global Threat & Vulnerability Map
          </CardTitle>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={refresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Select value={autoUpdate ? "on" : "off"} onValueChange={(v) => setAutoUpdate(v === "on")}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Auto Update" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="on">Auto On</SelectItem>
              <SelectItem value="off">Auto Off</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-2 flex-wrap justify-center">
          {SEVERITIES.map((sev) => (
            <Button
              key={sev}
              size="sm"
              variant={filter.includes(sev) ? "default" : "outline"}
              onClick={() =>
                setFilter((prev) =>
                  prev.includes(sev) ? prev.filter((f) => f !== sev) : [...prev, sev]
                )
              }
            >
              {sev.charAt(0).toUpperCase() + sev.slice(1)}
            </Button>
          ))}
        </div>
        <div className="relative bg-card rounded-lg p-3 min-h-[500px] border border-border/50">
          <ComposableMap projectionConfig={{ scale: 160 }} width={900} height={500} style={{ width: "100%", height: "auto" }}>
            <ZoomableGroup zoom={1} center={[20, 25]} maxZoom={8} minZoom={0.7}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo, i) => (
                    <motion.g key={geo.rsmKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.001 }}>
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
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        delay: idx * 0.15,
                        duration: 1.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                      data-tooltip-id={`threat-${loc.country}`}
                      data-tooltip-html={`<b>${loc.country}</b><br/>Threats: ${loc.threats}<br/>Severity: ${loc.severity}<br/>${loc.description}`}
                      style={{ cursor: "pointer" }}
                    />
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
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: idx * 0.2, duration: 0.8 }}
                    data-tooltip-id={`vuln-${vuln.cve}`}
                    data-tooltip-html={`<b>${vuln.cve}</b><br/>Severity: ${vuln.severity}<br/>${vuln.desc}`}
                  />
                  <Tooltip id={`vuln-${vuln.cve}`} />
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </div>
        <div className="mt-6 flex justify-center gap-8 flex-wrap">
          {SEVERITIES.map((sev) => (
            <div key={sev} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: getColor(sev) }} />
              <span className="text-xs text-muted-foreground capitalize">{sev}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
