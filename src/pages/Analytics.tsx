import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { mockThreats } from "@/lib/mockData";

export default function Analytics() {
  const threatTypeData = mockThreats.reduce((acc, threat) => {
    acc[threat.threatType] = (acc[threat.threatType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const threatTypePieData = Object.entries(threatTypeData).map(([name, value]) => ({
    name,
    value,
  }));

  const severityData = mockThreats.reduce((acc, threat) => {
    acc[threat.severity] = (acc[threat.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const severityBarData = Object.entries(severityData).map(([severity, count]) => ({
    severity: severity.charAt(0).toUpperCase() + severity.slice(1),
    count,
    fill: getSeverityColor(severity),
  }));

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split("T")[0];
  });

  const timeSeriesData = last7Days.map((date) => {
    const count = mockThreats.filter((threat) => threat.timestamp.startsWith(date)).length;
    return {
      date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
      threats: count,
    };
  });

  const COLORS = [
    "hsl(200 100% 60%)",
    "hsl(25 95% 65%)",
    "hsl(45 93% 70%)",
    "hsl(142 76% 60%)",
    "hsl(0 84% 65%)",
    "hsl(280 100% 70%)",
    "hsl(120 100% 60%)",
  ];

  function getSeverityColor(severity: string) {
    switch (severity) {
      case "critical":
        return "hsl(0 84% 65%)";
      case "high":
        return "hsl(25 95% 65%)";
      case "medium":
        return "hsl(45 93% 70%)";
      case "low":
        return "hsl(142 76% 60%)";
      default:
        return "hsl(200 100% 60%)";
    }
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3">
        <BarChart3 className="w-7 h-7 text-primary" />
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Threat Analytics
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
          <Card className="bg-card border-border shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-foreground">Threat Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={threatTypePieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={110}
                    dataKey="value"
                    animationDuration={1200}
                  >
                    {threatTypePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "10px",
                      color: "hsl(var(--foreground))",
                    }}
                    itemStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "20px", fontSize: "13px", color: "hsl(var(--foreground))" }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
          <Card className="bg-card border-border shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-foreground">Threats by Severity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={severityBarData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="severity"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 13 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 13 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "10px",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Bar dataKey="count" fill="url(#barGradient)" radius={[8, 8, 0, 0]} animationDuration={1200} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
        <Card className="bg-card border-border shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-foreground">Threat Detection Timeline (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 13 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 13 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "10px",
                    color: "hsl(var(--foreground))",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="threats"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 6 }}
                  activeDot={{
                    r: 8,
                    stroke: "hsl(var(--primary))",
                    strokeWidth: 2,
                    fill: "hsl(var(--background))",
                  }}
                  animationDuration={1300}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Card className="bg-card border-border shadow-lg rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Most Common Threat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {threatTypePieData.sort((a, b) => b.value - a.value)[0]?.name}
              </div>
              <p className="text-sm text-muted-foreground">
                {threatTypePieData.sort((a, b) => b.value - a.value)[0]?.value} occurrences
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Card className="bg-card border-border shadow-lg rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Average Daily Threats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {Math.round(
                  timeSeriesData.reduce((sum, day) => sum + day.threats, 0) /
                    timeSeriesData.length
                )}
              </div>
              <p className="text-sm text-muted-foreground">Based on last 7 days</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Card className="bg-card border-border shadow-lg rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Highest Risk Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {timeSeriesData.sort((a, b) => b.threats - a.threats)[0]?.date}
              </div>
              <p className="text-sm text-muted-foreground">
                {timeSeriesData.sort((a, b) => b.threats - a.threats)[0]?.threats} threats detected
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
