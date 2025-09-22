import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockThreats, getSeverityBadgeClass } from "@/lib/mockData";
import { Database, Search, Filter, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function Feeds() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const itemsPerPage = 20;

  const filteredThreats = mockThreats.filter((threat) => {
    const matchesSearch =
      threat.indicator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      threat.threatType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === "all" || threat.severity === severityFilter;
    const matchesType = typeFilter === "all" || threat.type === typeFilter;
    return matchesSearch && matchesSeverity && matchesType;
  });

  const totalPages = Math.ceil(filteredThreats.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedThreats = filteredThreats.slice(startIndex, startIndex + itemsPerPage);

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <Database className="w-7 h-7 text-primary" />
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Threat Feeds</h1>
      </div>

      <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
        <Card className="bg-card border-border shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground text-lg">
              <Filter className="w-4 h-4" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search indicators or threat types..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-input text-foreground"
                  />
                </div>
              </div>

              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-full lg:w-48">
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

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full lg:w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="ip">IP</SelectItem>
                  <SelectItem value="domain">Domain</SelectItem>
                  <SelectItem value="hash">Hash</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" className="hover:rotate-180 transition-transform duration-500">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredThreats.length)} of{" "}
              {filteredThreats.length} indicators
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.3 }}>
        <Card className="bg-card border-border shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border bg-muted/30">
                  <TableHead className="text-muted-foreground">Indicator</TableHead>
                  <TableHead className="text-muted-foreground">Type</TableHead>
                  <TableHead className="text-muted-foreground">Threat Type</TableHead>
                  <TableHead className="text-muted-foreground">Severity</TableHead>
                  <TableHead className="text-muted-foreground">Confidence</TableHead>
                  <TableHead className="text-muted-foreground">Source</TableHead>
                  <TableHead className="text-muted-foreground">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedThreats.map((threat) => (
                  <TableRow
                    key={threat.id}
                    className="border-border transition-colors hover:bg-accent/30"
                  >
                    <TableCell className="font-mono text-sm text-foreground max-w-48 truncate">
                      {threat.indicator}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs px-2 py-0.5">
                        {threat.type.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground">{threat.threatType}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs px-2 py-0.5 border ${getSeverityBadgeClass(threat.severity)}`}
                      >
                        {threat.severity.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground">{threat.confidence}%</TableCell>
                    <TableCell className="text-muted-foreground">{threat.source}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(threat.timestamp).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex justify-between items-center pt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="transition-all"
        >
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outline"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="transition-all"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}
