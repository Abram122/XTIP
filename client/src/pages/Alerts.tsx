import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockThreats } from "@/lib/mockData";
import { AlertTriangle, Search } from "lucide-react";

export default function Alerts() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredThreats = mockThreats.filter(
    (threat) =>
      threat.indicator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      threat.threatType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive/10 border-destructive/20";
      case "high":
        return "bg-orange-500/10 border-orange-500/20";
      case "medium":
        return "bg-yellow-500/10 border-yellow-500/20";
      case "low":
        return "bg-green-500/10 border-green-500/20";
      default:
        return "bg-muted/50 border-border";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-6 h-6 text-destructive" />
        <h1 className="text-2xl font-bold text-foreground">Threat Alerts</h1>
        <Badge variant="destructive" className="ml-auto">
          {filteredThreats.filter((t) => t.severity === "critical").length} Critical
        </Badge>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="text-foreground">Active Threat Alerts</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search indicators or threat types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="space-y-3 p-6 pt-0 max-h-[600px] overflow-y-auto">
            {filteredThreats.map((threat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className={`p-4 rounded-lg border transition-all hover:shadow-md ${getSeverityBg(
                  threat.severity
                )}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <code className="text-sm font-mono bg-background/50 px-2 py-1 rounded border">
                        {threat.indicator}
                      </code>
                      <Badge
                        variant={getSeverityColor(threat.severity) as any}
                        className="text-xs"
                      >
                        {threat.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{threat.threatType}</span>
                      <span>•</span>
                      <span>Source: {threat.source}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground lg:text-right">
                    <div className="font-medium text-foreground">
                      {new Date(threat.timestamp).toLocaleDateString()}
                    </div>
                    <div className="text-xs">
                      {new Date(threat.timestamp).toLocaleTimeString()} UTC
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredThreats.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-muted-foreground"
              >
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No alerts match your search criteria.</p>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">
                {mockThreats.filter((t) => t.severity === "critical").length}
              </div>
              <p className="text-sm text-muted-foreground">Critical Alerts</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                {mockThreats.filter((t) => t.severity === "high").length}
              </div>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {mockThreats.filter((t) => t.threatType === "malware").length}
              </div>
              <p className="text-sm text-muted-foreground">Malware Detected</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {new Set(mockThreats.map((t) => t.indicator.split(".")[0])).size}
              </div>
              <p className="text-sm text-muted-foreground">Unique Networks</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
