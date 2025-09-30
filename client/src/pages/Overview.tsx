// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Shield,
//   Database,
//   AlertTriangle,
//   Globe,
//   Hash,
//   Activity,
// } from "lucide-react";
// import { ThreatMap } from "@/components/ThreatMap";
// import {
//   mockStats,
//   mockThreats,
//   getSeverityBadgeClass,
// } from "@/lib/mockData";

// export default function Overview() {
//   const recentThreats = mockThreats.slice(0, 5);

//   const statCards = [
//     {
//       title: "Total Feeds",
//       value: mockStats.totalFeeds,
//       icon: Database,
//       gradient: "from-primary/70 to-primary",
//       description: "Active threat feeds",
//     },
//     {
//       title: "High Severity Threats",
//       value: mockStats.highSeverityThreats,
//       icon: AlertTriangle,
//       gradient: "from-cti-critical to-cti-high",
//       description: "Critical & High priority",
//     },
//     {
//       title: "Unique IPs",
//       value: mockStats.uniqueIPs,
//       icon: Globe,
//       gradient: "from-cti-info to-cti-low",
//       description: "Malicious IP addresses",
//     },
//     {
//       title: "Total Indicators",
//       value: mockStats.totalIndicators,
//       icon: Hash,
//       gradient: "from-accent to-primary",
//       description: "IOCs collected",
//     },
//   ];

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex items-center gap-3">
//         <Shield className="w-7 h-7 text-primary" />
//         <h1 className="text-3xl font-bold text-foreground">
//           Threat Intelligence Overview
//         </h1>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         {statCards.map((stat, index) => (
//           <Card
//             key={index}
//             className="relative overflow-hidden border-border shadow-lg"
//           >
//             <div
//               className={`absolute inset-0 bg-gradient-to-tr ${stat.gradient} opacity-10`}
//             />
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
//               <CardTitle className="text-sm font-medium text-muted-foreground">
//                 {stat.title}
//               </CardTitle>
//               <stat.icon className="h-5 w-5 text-muted-foreground" />
//             </CardHeader>
//             <CardContent className="relative z-10">
//               <div className="text-3xl font-bold text-foreground">
//                 {stat.value}
//               </div>
//               <p className="text-xs text-muted-foreground">
//                 {stat.description}
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Recent Threats */}
//       <Card className="border-border shadow-md">
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
//             <Activity className="w-5 h-5 text-primary" />
//             Recent Threats
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow className="border-border">
//                 <TableHead className="text-muted-foreground">
//                   Indicator
//                 </TableHead>
//                 <TableHead className="text-muted-foreground">Type</TableHead>
//                 <TableHead className="text-muted-foreground">
//                   Threat Type
//                 </TableHead>
//                 <TableHead className="text-muted-foreground">
//                   Severity
//                 </TableHead>
//                 <TableHead className="text-muted-foreground">Source</TableHead>
//                 <TableHead className="text-muted-foreground">
//                   Timestamp
//                 </TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {recentThreats.map((threat) => (
//                 <TableRow
//                   key={threat.id}
//                   className="border-border hover:bg-muted/30 transition-colors"
//                 >
//                   <TableCell className="font-mono text-sm text-foreground">
//                     {threat.indicator}
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant="outline" className="text-xs">
//                       {threat.type.toUpperCase()}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="text-foreground">
//                     {threat.threatType}
//                   </TableCell>
//                   <TableCell>
//                     <Badge
//                       variant="outline"
//                       className={`text-xs border ${getSeverityBadgeClass(
//                         threat.severity
//                       )}`}
//                     >
//                       {threat.severity.toUpperCase()}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="text-sm text-muted-foreground">
//                     {threat.source}
//                   </TableCell>
//                   <TableCell className="text-sm text-muted-foreground">
//                     {new Date(threat.timestamp).toLocaleString()}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Map */}
//         <Card className="border-border shadow-md">
//           <CardHeader>
//             <CardTitle className="text-lg font-semibold text-foreground">
//               Global Threat Map
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ThreatMap />
//           </CardContent>
//         </Card>
//     </div>
//   );
// }
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
  Filter,
  RefreshCw,
} from "lucide-react";
import { ThreatMap } from "@/components/ThreatMap";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types for our threat data
interface ThreatIndicator {
  id: string;
  indicator: string;
  type: string;
  threatType: string;
  severity: "low" | "medium" | "high" | "critical";
  source: string;
  timestamp: string;
  country?: string;
  asn?: string;
}

interface ThreatStats {
  totalFeeds: number;
  highSeverityThreats: number;
  uniqueIPs: number;
  totalIndicators: number;
}

// Trusted threat intelligence APIs
const THREAT_API_SOURCES = {
  ABUSEIPDB: "https://api.abuseipdb.com/api/v2/blacklist",
  ALIENVAULT: "https://otx.alienvault.com/api/v1/indicators/export",
  THREATFOX: "https://threatfox.abuse.ch/export/json/recent/",
  BLOCKLIST: "https://blocklist.io/api/lists.json"
};

export default function Overview() {
  const [threats, setThreats] = useState<ThreatIndicator[]>([]);
  const [stats, setStats] = useState<ThreatStats>({
    totalFeeds: 0,
    highSeverityThreats: 0,
    uniqueIPs: 0,
    totalIndicators: 0
  });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    severity: "all",
    type: "all",
    search: ""
  });

  // Fetch threat data from multiple sources
  const fetchThreatData = async () => {
    setLoading(true);
    try {
      // In a real implementation, you would make actual API calls to these services
      // Note: Most require API keys and have rate limits
      
      // Mock implementation simulating real data structure
      const mockRealData = await simulateRealThreatData();
      setThreats(mockRealData);
      calculateStats(mockRealData);
    } catch (error) {
      console.error("Error fetching threat data:", error);
      // Fallback to mock data if real APIs fail
      const { mockThreats } = await import("@/lib/mockData");
      setThreats(mockThreats);
      calculateStats(mockThreats);
    } finally {
      setLoading(false);
    }
  };

  const simulateRealThreatData = async (): Promise<ThreatIndicator[]> => {
    // This simulates what real threat intelligence APIs would return
    const threatTypes = ["Malware", "Phishing", "C2", "Scanner", "Spam"];
    const countries = ["US", "CN", "RU", "DE", "FR", "GB", "NL", "UA", "TR", "IN"];
    
    return Array.from({ length: 50 }, (_, i) => ({
      id: `threat-${i + 1}`,
      indicator: this.generateRandomIP(),
      type: Math.random() > 0.3 ? "ip" : "domain",
      threatType: threatTypes[Math.floor(Math.random() * threatTypes.length)],
      severity: this.getRandomSeverity(),
      source: ["AbuseIPDB", "AlienVault", "ThreatFox", "Blocklist"][Math.floor(Math.random() * 4)],
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      country: countries[Math.floor(Math.random() * countries.length)],
      asn: `AS${Math.floor(1000 + Math.random() * 9000)}`
    }));
  };

  const generateRandomIP = () => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  };

  const getRandomSeverity = (): "low" | "medium" | "high" | "critical" => {
    const rand = Math.random();
    if (rand < 0.1) return "critical";
    if (rand < 0.3) return "high";
    if (rand < 0.6) return "medium";
    return "low";
  };

  const calculateStats = (threatData: ThreatIndicator[]) => {
    const uniqueIPs = new Set(threatData.map(t => t.indicator)).size;
    const highSeverityThreats = threatData.filter(t => 
      t.severity === "high" || t.severity === "critical"
    ).length;

    setStats({
      totalFeeds: 4, // We're using 4 data sources
      highSeverityThreats,
      uniqueIPs,
      totalIndicators: threatData.length
    });
  };

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-600 border-red-500/30";
      case "high":
        return "bg-orange-500/20 text-orange-600 border-orange-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-600 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-600 border-gray-500/30";
    }
  };

  // Filter threats based on current filters
  const filteredThreats = threats.filter(threat => {
    if (filters.severity !== "all" && threat.severity !== filters.severity) {
      return false;
    }
    if (filters.type !== "all" && threat.type !== filters.type) {
      return false;
    }
    if (filters.search && !threat.indicator.toLowerCase().includes(filters.search.toLowerCase()) &&
        !threat.threatType.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const recentThreats = filteredThreats.slice(0, 10);

  const statCards = [
    {
      title: "Total Feeds",
      value: stats.totalFeeds,
      icon: Database,
      gradient: "from-primary/70 to-primary",
      description: "Active threat feeds",
    },
    {
      title: "High Severity Threats",
      value: stats.highSeverityThreats,
      icon: AlertTriangle,
      gradient: "from-cti-critical to-cti-high",
      description: "Critical & High priority",
    },
    {
      title: "Unique IPs",
      value: stats.uniqueIPs.toLocaleString(),
      icon: Globe,
      gradient: "from-cti-info to-cti-low",
      description: "Malicious IP addresses",
    },
    {
      title: "Total Indicators",
      value: stats.totalIndicators.toLocaleString(),
      icon: Hash,
      gradient: "from-accent to-primary",
      description: "IOCs collected",
    },
  ];

  useEffect(() => {
    fetchThreatData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchThreatData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-7 h-7 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">
            Threat Intelligence Overview
          </h1>
        </div>
        <Button 
          onClick={fetchThreatData} 
          disabled={loading}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      {/* Stats Cards */}
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
                {loading ? "..." : stat.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-border shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Threat Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search indicators or threat types..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full"
              />
            </div>
            <Select
              value={filters.severity}
              onValueChange={(value) => setFilters(prev => ({ ...prev, severity: value }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.type}
              onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ip">IP Address</SelectItem>
                <SelectItem value="domain">Domain</SelectItem>
                <SelectItem value="url">URL</SelectItem>
                <SelectItem value="hash">Hash</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Recent Threats */}
      <Card className="border-border shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Recent Threats {filteredThreats.length > 0 && `(${filteredThreats.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span className="ml-2">Loading threat data...</span>
            </div>
          ) : (
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
          )}
          {!loading && filteredThreats.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No threats found matching your filters.
            </div>
          )}
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
          <ThreatMap/>
        </CardContent>
      </Card>
    </div>
  );
}