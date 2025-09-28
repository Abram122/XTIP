import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Shield,
  Database,
  AlertTriangle,
  Globe,
  Hash,
  Activity,
} from "lucide-react";
import { ThreatMap } from "@/components/ThreatMap";
import {
  mockStats,
  mockThreats,
  getSeverityBadgeClass,
} from "@/lib/mockData";

export default function Overview() {
  const recentThreats = mockThreats.slice(0, 5);

  const statCards = [
    {
      title: "Total Feeds",
      value: mockStats.totalFeeds,
      icon: Database,
      gradient: "from-primary/70 to-primary",
      description: "Active threat feeds",
    },
    {
      title: "High Severity Threats",
      value: mockStats.highSeverityThreats,
      icon: AlertTriangle,
      gradient: "from-cti-critical to-cti-high",
      description: "Critical & High priority",
    },
    {
      title: "Unique IPs",
      value: mockStats.uniqueIPs,
      icon: Globe,
      gradient: "from-cti-info to-cti-low",
      description: "Malicious IP addresses",
    },
    {
      title: "Total Indicators",
      value: mockStats.totalIndicators,
      icon: Hash,
      gradient: "from-accent to-primary",
      description: "IOCs collected",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Shield className="w-7 h-7 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">
          Threat Intelligence Overview
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card
            key={index}
            className="relative overflow-hidden border-border shadow-lg"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-tr ${stat.gradient} opacity-10`}
            />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-foreground">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Threats */}
      <Card className="border-border shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Recent Threats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">
                  Indicator
                </TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">
                  Threat Type
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Severity
                </TableHead>
                <TableHead className="text-muted-foreground">Source</TableHead>
                <TableHead className="text-muted-foreground">
                  Timestamp
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentThreats.map((threat) => (
                <TableRow
                  key={threat.id}
                  className="border-border hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-mono text-sm text-foreground">
                    {threat.indicator}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {threat.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground">
                    {threat.threatType}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs border ${getSeverityBadgeClass(
                        threat.severity
                      )}`}
                    >
                      {threat.severity.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {threat.source}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(threat.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Map */}
        <Card className="border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Global Threat Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ThreatMap />
          </CardContent>
        </Card>
    </div>
  );
}
