// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { BarChart3 } from "lucide-react";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   ResponsiveContainer,
// //   LineChart,
// //   Line,
// //   Legend,
// // } from "recharts";
// // import { motion } from "framer-motion";
// // import { mockThreats } from "@/lib/mockData";

// // export default function Analytics() {
// //   const threatTypeData = mockThreats.reduce((acc, threat) => {
// //     acc[threat.threatType] = (acc[threat.threatType] || 0) + 1;
// //     return acc;
// //   }, {} as Record<string, number>);

// //   const threatTypePieData = Object.entries(threatTypeData).map(([name, value]) => ({
// //     name,
// //     value,
// //   }));

// //   const severityData = mockThreats.reduce((acc, threat) => {
// //     acc[threat.severity] = (acc[threat.severity] || 0) + 1;
// //     return acc;
// //   }, {} as Record<string, number>);

// //   const severityBarData = Object.entries(severityData).map(([severity, count]) => ({
// //     severity: severity.charAt(0).toUpperCase() + severity.slice(1),
// //     count,
// //     fill: getSeverityColor(severity),
// //   }));

// //   const last7Days = Array.from({ length: 7 }, (_, i) => {
// //     const date = new Date();
// //     date.setDate(date.getDate() - (6 - i));
// //     return date.toISOString().split("T")[0];
// //   });

// //   const timeSeriesData = last7Days.map((date) => {
// //     const count = mockThreats.filter((threat) =>
// //       threat.timestamp.startsWith(date)
// //     ).length;
// //     return {
// //       date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
// //       threats: count,
// //     };
// //   });

// //   // Updated vibrant color palette for chart elements
// //   const COLORS = [
// //     "#FF6B6B", // Vibrant red
// //     "#4ECDC4", // Teal
// //     "#45B7D1", // Sky blue
// //     "#96CEB4", // Mint green
// //     "#FECA57", // Yellow
// //     "#FF9FF3", // Pink
// //     "#54A0FF", // Blue
// //     "#48DBFB", // Light blue
// //   ];

// //   function getSeverityColor(severity: string) {
// //     switch (severity) {
// //       case "critical":
// //         return "#FF4757"; // Bright red
// //       case "high":
// //         return "#FF6348"; // Coral red
// //       case "medium":
// //         return "#FFA502"; // Orange
// //       case "low":
// //         return "#26DE81"; // Green
// //       default:
// //         return "#2E86DE"; // Blue
// //     }
// //   }

// //   return (
// //     <motion.div
// //       className="space-y-8"
// //       initial={{ opacity: 0, y: 15 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.6 }}
// //     >
// //       <div className="flex items-center gap-3">
// //         <BarChart3 className="w-7 h-7 text-primary" />
// //         <h1 className="text-3xl font-bold text-foreground tracking-tight">
// //           Threat Analytics
// //         </h1>
// //       </div>

// //       {/* Badge-style Stats Row - ADDED BADGE ELEMENTS */}
// //       <div className="grid gap-4 md:grid-cols-4">
// //         <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
// //           <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-200/30 shadow-sm relative overflow-hidden">
// //             <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full -translate-y-8 translate-x-8"></div>
// //             <CardContent className="p-4 relative z-10">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-xs text-muted-foreground font-medium">Total Threats</p>
// //                   <p className="text-2xl font-bold text-foreground">{mockThreats.length}</p>
// //                 </div>
// //                 <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
// //                   <div className="w-2 h-2 rounded-full bg-blue-500" />
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </motion.div>

// //         <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
// //           <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-200/30 shadow-sm relative overflow-hidden">
// //             <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full -translate-y-8 translate-x-8"></div>
// //             <CardContent className="p-4 relative z-10">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-xs text-muted-foreground font-medium">Critical</p>
// //                   <p className="text-2xl font-bold text-foreground">
// //                     {severityData.critical || 0}
// //                   </p>
// //                 </div>
// //                 <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
// //                   <div className="w-2 h-2 rounded-full bg-red-500" />
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </motion.div>

// //         <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
// //           <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-200/30 shadow-sm relative overflow-hidden">
// //             <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full -translate-y-8 translate-x-8"></div>
// //             <CardContent className="p-4 relative z-10">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-xs text-muted-foreground font-medium">Resolved</p>
// //                   <p className="text-2xl font-bold text-foreground">
// //                     {mockThreats.filter(t => t.status === 'resolved').length}
// //                   </p>
// //                 </div>
// //                 <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
// //                   <div className="w-2 h-2 rounded-full bg-green-500" />
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </motion.div>

// //         <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
// //           <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-200/30 shadow-sm relative overflow-hidden">
// //             <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full -translate-y-8 translate-x-8"></div>
// //             <CardContent className="p-4 relative z-10">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-xs text-muted-foreground font-medium">Active</p>
// //                   <p className="text-2xl font-bold text-foreground">
// //                     {mockThreats.filter(t => t.status === 'active').length}
// //                   </p>
// //                 </div>
// //                 <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
// //                   <div className="w-2 h-2 rounded-full bg-purple-500" />
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </motion.div>
// //       </div>

// //       {/* ORIGINAL CHARTS WITH BADGE-LIKE ENHANCEMENTS */}
// //       <div className="grid gap-8 md:grid-cols-2">
// //         {/* Pie Chart with Badge-style Legend */}
// //         <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
// //           <Card className="bg-card border-border shadow-sm relative overflow-hidden">
// //             {/* Badge-style decoration */}
// //             <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500/5 rounded-full -translate-x-10 -translate-y-10"></div>
// //             <CardHeader className="pb-4">
// //               <CardTitle className="text-foreground text-base font-semibold flex items-center gap-2">
// //                 <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
// //                 Threat Type Distribution
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="flex gap-6">
// //                 {/* Badge-style legend */}
// //                 <div className="space-y-3 min-w-[140px]">
// //                   {threatTypePieData.map((threat, index) => (
// //                     <div key={threat.name} className="flex items-center gap-2 group cursor-pointer">
// //                       <div 
// //                         className="w-3 h-3 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
// //                         style={{ backgroundColor: COLORS[index % COLORS.length] }}
// //                       />
// //                       <span className="text-xs font-medium text-foreground">
// //                         {threat.name}
// //                       </span>
// //                       <span className="text-xs font-mono font-bold text-foreground bg-muted px-1.5 py-0.5 rounded">
// //                         {threat.value}
// //                       </span>
// //                     </div>
// //                   ))}
// //                 </div>
                
// //                 {/* Original Pie Chart */}
// //                 <ResponsiveContainer width="100%" height={240}>
// //                   <PieChart>
// //                     <Pie
// //                       data={threatTypePieData}
// //                       cx="50%"
// //                       cy="50%"
// //                       labelLine={{ 
// //                         stroke: "hsl(var(--muted-foreground))", 
// //                         strokeWidth: 1 
// //                       }}
// //                       label={({ name, percent }) =>
// //                         `${name} ${(percent * 100).toFixed(1)}%`
// //                       }
// //                       outerRadius={80}
// //                       innerRadius={40}
// //                       dataKey="value"
// //                       animationDuration={800}
// //                       stroke="hsl(var(--background))"
// //                       strokeWidth={2}
// //                     >
// //                       {threatTypePieData.map((entry, index) => (
// //                         <Cell 
// //                           key={`cell-${index}`} 
// //                           fill={COLORS[index % COLORS.length]} 
// //                         />
// //                       ))}
// //                     </Pie>
// //                     <Tooltip
// //                       contentStyle={{
// //                         backgroundColor: "hsl(var(--background))",
// //                         border: "1px solid hsl(var(--border))",
// //                         borderRadius: "6px",
// //                         color: "hsl(var(--foreground))",
// //                         fontSize: "12px",
// //                         padding: "8px 12px",
// //                         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// //                       }}
// //                       itemStyle={{ 
// //                         color: "hsl(var(--foreground))", 
// //                         fontSize: "12px" 
// //                       }}
// //                     />
// //                   </PieChart>
// //                 </ResponsiveContainer>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </motion.div>

// //         {/* Bar Chart with Badge-style Elements */}
// //         <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
// //           <Card className="bg-card border-border shadow-sm relative overflow-hidden">
// //             {/* Badge-style decoration */}
// //             <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-full translate-x-10 -translate-y-10"></div>
// //             <CardHeader className="pb-4">
// //               <CardTitle className="text-foreground text-base font-semibold flex items-center gap-2">
// //                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
// //                 Threats by Severity
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-4">
// //                 {/* Badge-style severity indicators */}
// //                 <div className="flex gap-2 justify-center">
// //                   {severityBarData.map((severity, index) => (
// //                     <div 
// //                       key={severity.severity}
// //                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105 cursor-pointer"
// //                       style={{ 
// //                         backgroundColor: `${severity.fill}15`,
// //                         borderColor: `${severity.fill}30`,
// //                         color: severity.fill
// //                       }}
// //                     >
// //                       <div 
// //                         className="w-2 h-2 rounded-full"
// //                         style={{ backgroundColor: severity.fill }}
// //                       />
// //                       {severity.severity}
// //                       <span className="font-mono font-bold">{severity.count}</span>
// //                     </div>
// //                   ))}
// //                 </div>
                
// //                 {/* Original Bar Chart */}
// //                 <ResponsiveContainer width="100%" height={200}>
// //                   <BarChart 
// //                     data={severityBarData} 
// //                     margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
// //                   >
// //                     <CartesianGrid
// //                       strokeDasharray="3 3"
// //                       stroke="hsl(var(--border))"
// //                       strokeOpacity={0.3}
// //                       vertical={false}
// //                     />
// //                     <XAxis
// //                       dataKey="severity"
// //                       tick={{ 
// //                         fill: "hsl(var(--muted-foreground))", 
// //                         fontSize: 11, 
// //                         fontWeight: 500 
// //                       }}
// //                       axisLine={{ 
// //                         stroke: "hsl(var(--border))", 
// //                         strokeWidth: 1 
// //                       }}
// //                       tickLine={false}
// //                     />
// //                     <YAxis
// //                       tick={{ 
// //                         fill: "hsl(var(--muted-foreground))", 
// //                         fontSize: 11, 
// //                         fontWeight: 500 
// //                       }}
// //                       axisLine={{ 
// //                         stroke: "hsl(var(--border))", 
// //                         strokeWidth: 1 
// //                       }}
// //                       tickLine={false}
// //                     />
// //                     <Tooltip
// //                       contentStyle={{
// //                         backgroundColor: "hsl(var(--background))",
// //                         border: "1px solid hsl(var(--border))",
// //                         borderRadius: "6px",
// //                         color: "hsl(var(--foreground))",
// //                         fontSize: "12px",
// //                         padding: "8px 12px",
// //                         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// //                       }}
// //                       cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
// //                     />
// //                     <Bar
// //                       dataKey="count"
// //                       radius={[4, 4, 0, 0]}
// //                       animationDuration={800}
// //                       maxBarSize={60}
// //                     >
// //                       {severityBarData.map((entry, index) => (
// //                         <Cell key={`cell-${index}`} fill={entry.fill} />
// //                       ))}
// //                     </Bar>
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </motion.div>
// //       </div>

// //       {/* Line Chart with Badge-style Elements */}
// //       <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.2 }}>
// //         <Card className="bg-card border-border shadow-sm relative overflow-hidden">
// //           {/* Badge-style decorations */}
// //           <div className="absolute top-0 left-0 w-24 h-24 bg-cyan-500/5 rounded-full -translate-x-12 -translate-y-12"></div>
// //           <div className="absolute bottom-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full translate-x-12 translate-y-12"></div>
          
// //           <CardHeader className="pb-4">
// //             <CardTitle className="text-foreground text-base font-semibold flex items-center gap-2">
// //               <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
// //               Threat Detection Timeline (Last 7 Days)
// //             </CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="space-y-4">
// //               {/* Badge-style day indicators */}
// //               <div className="flex justify-between px-4">
// //                 {timeSeriesData.map((day, index) => (
// //                   <div key={day.date} className="text-center group cursor-pointer">
// //                     <div className="text-xs font-medium text-muted-foreground mb-1">
// //                       {day.date}
// //                     </div>
// //                     <div 
// //                       className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all group-hover:scale-110 mx-auto"
// //                       style={{
// //                         backgroundColor: day.threats > 0 ? `${getSeverityColor('medium')}15` : 'transparent',
// //                         border: `2px solid ${day.threats > 0 ? getSeverityColor('medium') : 'hsl(var(--border))'}`,
// //                         color: getSeverityColor('medium')
// //                       }}
// //                     >
// //                       {day.threats}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
              
// //               {/* Original Line Chart */}
// //               <ResponsiveContainer width="100%" height={200}>
// //                 <LineChart 
// //                   data={timeSeriesData} 
// //                   margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
// //                 >
// //                   <CartesianGrid
// //                     strokeDasharray="3 3"
// //                     stroke="hsl(var(--border))"
// //                     strokeOpacity={0.3}
// //                     vertical={false}
// //                   />
// //                   <XAxis
// //                     dataKey="date"
// //                     tick={{ 
// //                       fill: "hsl(var(--muted-foreground))", 
// //                       fontSize: 11, 
// //                       fontWeight: 500 
// //                     }}
// //                     axisLine={{ 
// //                       stroke: "hsl(var(--border))", 
// //                       strokeWidth: 1 
// //                     }}
// //                     tickLine={false}
// //                   />
// //                   <YAxis
// //                     tick={{ 
// //                       fill: "hsl(var(--muted-foreground))", 
// //                       fontSize: 11, 
// //                       fontWeight: 500 
// //                     }}
// //                     axisLine={{ 
// //                       stroke: "hsl(var(--border))", 
// //                       strokeWidth: 1 
// //                     }}
// //                     tickLine={false}
// //                     allowDecimals={false}
// //                   />
// //                   <Tooltip
// //                     contentStyle={{
// //                       backgroundColor: "hsl(var(--background))",
// //                       border: "1px solid hsl(var(--border))",
// //                       borderRadius: "6px",
// //                       color: "hsl(var(--foreground))",
// //                       fontSize: "12px",
// //                       padding: "8px 12px",
// //                       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// //                     }}
// //                     cursor={{ 
// //                       stroke: "hsl(var(--border))", 
// //                       strokeWidth: 1, 
// //                       strokeDasharray: "3 3" 
// //                     }}
// //                   />
// //                   <Line
// //                     type="monotone"
// //                     dataKey="threats"
// //                     stroke="#4ECDC4"
// //                     strokeWidth={3}
// //                     dot={{ 
// //                       fill: "#4ECDC4", 
// //                       r: 5, 
// //                       strokeWidth: 2, 
// //                       stroke: "hsl(var(--background))" 
// //                     }}
// //                     activeDot={{ 
// //                       r: 7, 
// //                       stroke: "#4ECDC4", 
// //                       strokeWidth: 2, 
// //                       fill: "hsl(var(--background))" 
// //                     }}
// //                     animationDuration={800}
// //                   />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </motion.div>

// //       {/* Original Metrics Cards with Badge-style Enhancements */}
// //       <div className="grid gap-6 md:grid-cols-3">
// //         <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
// //           <Card className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 border-orange-200/30 shadow-sm relative overflow-hidden">
// //             <div className="absolute top-0 right-0 w-12 h-12 bg-orange-500/10 rounded-full -translate-y-4 translate-x-4"></div>
// //             <CardHeader className="pb-2">
// //               <CardTitle className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-2">
// //                 <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
// //                 Most Common Threat
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold text-foreground font-mono">
// //                 {threatTypePieData.sort((a, b) => b.value - a.value)[0]?.name}
// //               </div>
// //               <p className="text-xs text-muted-foreground mt-1 font-medium">
// //                 {threatTypePieData.sort((a, b) => b.value - a.value)[0]?.value} occurrences
// //               </p>
// //             </CardContent>
// //           </Card>
// //         </motion.div>

// //         <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
// //           <Card className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 border-cyan-200/30 shadow-sm relative overflow-hidden">
// //             <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-500/10 rounded-full -translate-y-4 translate-x-4"></div>
// //             <CardHeader className="pb-2">
// //               <CardTitle className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-2">
// //                 <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
// //                 Average Daily Threats
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold text-foreground font-mono">
// //                 {Math.round(
// //                   timeSeriesData.reduce((sum, day) => sum + day.threats, 0) /
// //                     timeSeriesData.length
// //                 )}
// //               </div>
// //               <p className="text-xs text-muted-foreground mt-1 font-medium">
// //                 Based on last 7 days
// //               </p>
// //             </CardContent>
// //           </Card>
// //         </motion.div>

// //         <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
// //           <Card className="bg-gradient-to-br from-pink-500/5 to-pink-600/5 border-pink-200/30 shadow-sm relative overflow-hidden">
// //             <div className="absolute top-0 right-0 w-12 h-12 bg-pink-500/10 rounded-full -translate-y-4 translate-x-4"></div>
// //             <CardHeader className="pb-2">
// //               <CardTitle className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-2">
// //                 <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
// //                 Highest Risk Day
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold text-foreground font-mono">
// //                 {timeSeriesData.sort((a, b) => b.threats - a.threats)[0]?.date}
// //               </div>
// //               <p className="text-xs text-muted-foreground mt-1 font-medium">
// //                 {timeSeriesData.sort((a, b) => b.threats - a.threats)[0]?.threats} threats
// //                 detected
// //               </p>
// //             </CardContent>
// //           </Card>
// //         </motion.div>
// //       </div>
// //     </motion.div>
// //   );
// // }
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BarChart3 } from "lucide-react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   Legend,
// } from "recharts";
// import { motion } from "framer-motion";
// import { mockThreats } from "@/lib/mockData";

// export default function Analytics() {
//   const threatTypeData = mockThreats.reduce((acc, threat) => {
//     acc[threat.threatType] = (acc[threat.threatType] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const threatTypePieData = Object.entries(threatTypeData).map(([name, value]) => ({
//     name,
//     value,
//   }));

//   const severityData = mockThreats.reduce((acc, threat) => {
//     acc[threat.severity] = (acc[threat.severity] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const severityBarData = Object.entries(severityData).map(([severity, count]) => ({
//     severity: severity.charAt(0).toUpperCase() + severity.slice(1),
//     count,
//     fill: getSeverityColor(severity),
//   }));

//   const last7Days = Array.from({ length: 7 }, (_, i) => {
//     const date = new Date();
//     date.setDate(date.getDate() - (6 - i));
//     return date.toISOString().split("T")[0];
//   });

//   const timeSeriesData = last7Days.map((date) => {
//     const count = mockThreats.filter((threat) =>
//       threat.timestamp.startsWith(date)
//     ).length;
//     return {
//       date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
//       threats: count,
//     };
//   });

//   // Gradient colors for pie chart segments (matching badge styles)
//   const PIE_GRADIENTS = [
//     { start: "#3B82F6", end: "#1D4ED8" }, // Blue gradient
//     { start: "#EF4444", end: "#DC2626" }, // Red gradient
//     { start: "#10B981", end: "#059669" }, // Green gradient
//     { start: "#8B5CF6", end: "#7C3AED" }, // Purple gradient
//     { start: "#F59E0B", end: "#D97706" }, // Amber gradient
//     { start: "#06B6D4", end: "#0891B2" }, // Cyan gradient
//     { start: "#EC4899", end: "#DB2777" }, // Pink gradient
//     { start: "#84CC16", end: "#65A30D" }, // Lime gradient
//   ];

//   // Function to create gradient ID for each segment
//   const getGradientId = (index: number) => `pie-gradient-${index}`;

//   function getSeverityColor(severity: string) {
//     switch (severity) {
//       case "critical":
//         return "#FF4757"; // Bright red
//       case "high":
//         return "#FF6348"; // Coral red
//       case "medium":
//         return "#FFA502"; // Orange
//       case "low":
//         return "#26DE81"; // Green
//       default:
//         return "#2E86DE"; // Blue
//     }
//   }

//   return (
//     <motion.div
//       className="space-y-8"
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="flex items-center gap-3">
//         <BarChart3 className="w-7 h-7 text-primary" />
//         <h1 className="text-3xl font-bold text-foreground tracking-tight">
//           Threat Analytics
//         </h1>
//       </div>

//       {/* Badge-style Stats Row */}
//       <div className="grid gap-4 md:grid-cols-4">
//         <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-200/30 shadow-sm relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full -translate-y-8 translate-x-8"></div>
//             <CardContent className="p-4 relative z-10">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs text-muted-foreground font-medium">Total Threats</p>
//                   <p className="text-2xl font-bold text-foreground">{mockThreats.length}</p>
//                 </div>
//                 <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
//                   <div className="w-2 h-2 rounded-full bg-blue-500" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-200/30 shadow-sm relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full -translate-y-8 translate-x-8"></div>
//             <CardContent className="p-4 relative z-10">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs text-muted-foreground font-medium">Critical</p>
//                   <p className="text-2xl font-bold text-foreground">
//                     {severityData.critical || 0}
//                   </p>
//                 </div>
//                 <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
//                   <div className="w-2 h-2 rounded-full bg-red-500" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-200/30 shadow-sm relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full -translate-y-8 translate-x-8"></div>
//             <CardContent className="p-4 relative z-10">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs text-muted-foreground font-medium">Resolved</p>
//                   <p className="text-2xl font-bold text-foreground">
//                     {mockThreats.filter(t => t.status === 'resolved').length}
//                   </p>
//                 </div>
//                 <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
//                   <div className="w-2 h-2 rounded-full bg-green-500" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-200/30 shadow-sm relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full -translate-y-8 translate-x-8"></div>
//             <CardContent className="p-4 relative z-10">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs text-muted-foreground font-medium">Active</p>
//                   <p className="text-2xl font-bold text-foreground">
//                     {mockThreats.filter(t => t.status === 'active').length}
//                   </p>
//                 </div>
//                 <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
//                   <div className="w-2 h-2 rounded-full bg-purple-500" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>

//       {/* ORIGINAL CHARTS WITH BADGE-LIKE ENHANCEMENTS */}
//       <div className="grid gap-8 md:grid-cols-2">
//         {/* Pie Chart with Badge-style Segments */}
//         <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-card border-border shadow-sm relative overflow-hidden">
//             {/* Badge-style decoration */}
//             <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500/5 rounded-full -translate-x-10 -translate-y-10"></div>
//             <CardHeader className="pb-4">
//               <CardTitle className="text-foreground text-base font-semibold flex items-center gap-2">
//                 <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                 Threat Type Distribution
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex gap-6">
//                 {/* Badge-style legend */}
//                 <div className="space-y-3 min-w-[140px]">
//                   {threatTypePieData.map((threat, index) => (
//                     <div key={threat.name} className="flex items-center gap-2 group cursor-pointer">
//                       <div 
//                         className="w-3 h-3 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
//                         style={{ 
//                           background: `linear-gradient(135deg, ${PIE_GRADIENTS[index % PIE_GRADIENTS.length].start}, ${PIE_GRADIENTS[index % PIE_GRADIENTS.length].end})` 
//                         }}
//                       />
//                       <span className="text-xs font-medium text-foreground">
//                         {threat.name}
//                       </span>
//                       <span className="text-xs font-mono font-bold text-foreground bg-muted px-1.5 py-0.5 rounded">
//                         {threat.value}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
                
//                 {/* Pie Chart with Gradient Segments */}
//                 <ResponsiveContainer width="100%" height={240}>
//                   <PieChart>
//                     {/* Define gradients for each segment */}
//                     <defs>
//                       {threatTypePieData.map((entry, index) => (
//                         <linearGradient
//                           key={getGradientId(index)}
//                           id={getGradientId(index)}
//                           x1="0%"
//                           y1="0%"
//                           x2="100%"
//                           y2="100%"
//                         >
//                           <stop offset="0%" stopColor={PIE_GRADIENTS[index % PIE_GRADIENTS.length].start} stopOpacity={0.8} />
//                           <stop offset="100%" stopColor={PIE_GRADIENTS[index % PIE_GRADIENTS.length].end} stopOpacity={0.9} />
//                         </linearGradient>
//                       ))}
//                     </defs>
                    
//                     <Pie
//                       data={threatTypePieData}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={{ 
//                         stroke: "hsl(var(--muted-foreground))", 
//                         strokeWidth: 1 
//                       }}
//                       label={({ name, percent }) =>
//                         `${name} ${(percent * 100).toFixed(1)}%`
//                       }
//                       outerRadius={80}
//                       innerRadius={40}
//                       dataKey="value"
//                       animationDuration={800}
//                       stroke="hsl(var(--background))"
//                       strokeWidth={3}
//                     >
//                       {threatTypePieData.map((entry, index) => (
//                         <Cell 
//                           key={`cell-${index}`} 
//                           fill={`url(#${getGradientId(index)})`}
//                         />
//                       ))}
//                     </Pie>
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "hsl(var(--background))",
//                         border: "1px solid hsl(var(--border))",
//                         borderRadius: "6px",
//                         color: "hsl(var(--foreground))",
//                         fontSize: "12px",
//                         padding: "8px 12px",
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                       }}
//                       itemStyle={{ 
//                         color: "hsl(var(--foreground))", 
//                         fontSize: "12px" 
//                       }}
//                       formatter={(value, name) => [
//                         <span key="value" className="font-mono font-bold">{value as number}</span>,
//                         <span key="name" className="font-medium">{name as string}</span>
//                       ]}
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Bar Chart with Badge-style Elements */}
//         <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-card border-border shadow-sm relative overflow-hidden">
//             {/* Badge-style decoration */}
//             <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-full translate-x-10 -translate-y-10"></div>
//             <CardHeader className="pb-4">
//               <CardTitle className="text-foreground text-base font-semibold flex items-center gap-2">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 Threats by Severity
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {/* Badge-style severity indicators */}
//                 <div className="flex gap-2 justify-center">
//                   {severityBarData.map((severity, index) => (
//                     <div 
//                       key={severity.severity}
//                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105 cursor-pointer"
//                       style={{ 
//                         backgroundColor: `${severity.fill}15`,
//                         borderColor: `${severity.fill}30`,
//                         color: severity.fill
//                       }}
//                     >
//                       <div 
//                         className="w-2 h-2 rounded-full"
//                         style={{ backgroundColor: severity.fill }}
//                       />
//                       {severity.severity}
//                       <span className="font-mono font-bold">{severity.count}</span>
//                     </div>
//                   ))}
//                 </div>
                
//                 {/* Original Bar Chart */}
//                 <ResponsiveContainer width="100%" height={200}>
//                   <BarChart 
//                     data={severityBarData} 
//                     margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                   >
//                     <CartesianGrid
//                       strokeDasharray="3 3"
//                       stroke="hsl(var(--border))"
//                       strokeOpacity={0.3}
//                       vertical={false}
//                     />
//                     <XAxis
//                       dataKey="severity"
//                       tick={{ 
//                         fill: "hsl(var(--muted-foreground))", 
//                         fontSize: 11, 
//                         fontWeight: 500 
//                       }}
//                       axisLine={{ 
//                         stroke: "hsl(var(--border))", 
//                         strokeWidth: 1 
//                       }}
//                       tickLine={false}
//                     />
//                     <YAxis
//                       tick={{ 
//                         fill: "hsl(var(--muted-foreground))", 
//                         fontSize: 11, 
//                         fontWeight: 500 
//                       }}
//                       axisLine={{ 
//                         stroke: "hsl(var(--border))", 
//                         strokeWidth: 1 
//                       }}
//                       tickLine={false}
//                     />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "hsl(var(--background))",
//                         border: "1px solid hsl(var(--border))",
//                         borderRadius: "6px",
//                         color: "hsl(var(--foreground))",
//                         fontSize: "12px",
//                         padding: "8px 12px",
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                       }}
//                       cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
//                     />
//                     <Bar
//                       dataKey="count"
//                       radius={[4, 4, 0, 0]}
//                       animationDuration={800}
//                       maxBarSize={60}
//                     >
//                       {severityBarData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.fill} />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>

//       {/* Line Chart with Badge-style Elements */}
//       <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.2 }}>
//         <Card className="bg-card border-border shadow-sm relative overflow-hidden">
//           {/* Badge-style decorations */}
//           <div className="absolute top-0 left-0 w-24 h-24 bg-cyan-500/5 rounded-full -translate-x-12 -translate-y-12"></div>
//           <div className="absolute bottom-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full translate-x-12 translate-y-12"></div>
          
//           <CardHeader className="pb-4">
//             <CardTitle className="text-foreground text-base font-semibold flex items-center gap-2">
//               <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
//               Threat Detection Timeline (Last 7 Days)
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {/* Badge-style day indicators */}
//               <div className="flex justify-between px-4">
//                 {timeSeriesData.map((day, index) => (
//                   <div key={day.date} className="text-center group cursor-pointer">
//                     <div className="text-xs font-medium text-muted-foreground mb-1">
//                       {day.date}
//                     </div>
//                     <div 
//                       className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all group-hover:scale-110 mx-auto"
//                       style={{
//                         backgroundColor: day.threats > 0 ? `${getSeverityColor('medium')}15` : 'transparent',
//                         border: `2px solid ${day.threats > 0 ? getSeverityColor('medium') : 'hsl(var(--border))'}`,
//                         color: getSeverityColor('medium')
//                       }}
//                     >
//                       {day.threats}
//                     </div>
//                   </div>
//                 ))}
//               </div>
              
//               {/* Original Line Chart */}
//               <ResponsiveContainer width="100%" height={200}>
//                 <LineChart 
//                   data={timeSeriesData} 
//                   margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="hsl(var(--border))"
//                     strokeOpacity={0.3}
//                     vertical={false}
//                   />
//                   <XAxis
//                     dataKey="date"
//                     tick={{ 
//                       fill: "hsl(var(--muted-foreground))", 
//                       fontSize: 11, 
//                       fontWeight: 500 
//                     }}
//                     axisLine={{ 
//                       stroke: "hsl(var(--border))", 
//                       strokeWidth: 1 
//                     }}
//                     tickLine={false}
//                   />
//                   <YAxis
//                     tick={{ 
//                       fill: "hsl(var(--muted-foreground))", 
//                       fontSize: 11, 
//                       fontWeight: 500 
//                     }}
//                     axisLine={{ 
//                       stroke: "hsl(var(--border))", 
//                       strokeWidth: 1 
//                     }}
//                     tickLine={false}
//                     allowDecimals={false}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "hsl(var(--background))",
//                       border: "1px solid hsl(var(--border))",
//                       borderRadius: "6px",
//                       color: "hsl(var(--foreground))",
//                       fontSize: "12px",
//                       padding: "8px 12px",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                     }}
//                     cursor={{ 
//                       stroke: "hsl(var(--border))", 
//                       strokeWidth: 1, 
//                       strokeDasharray: "3 3" 
//                     }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="threats"
//                     stroke="#4ECDC4"
//                     strokeWidth={3}
//                     dot={{ 
//                       fill: "#4ECDC4", 
//                       r: 5, 
//                       strokeWidth: 2, 
//                       stroke: "hsl(var(--background))" 
//                     }}
//                     activeDot={{ 
//                       r: 7, 
//                       stroke: "#4ECDC4", 
//                       strokeWidth: 2, 
//                       fill: "hsl(var(--background))" 
//                     }}
//                     animationDuration={800}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Original Metrics Cards with Badge-style Enhancements */}
//       <div className="grid gap-6 md:grid-cols-3">
//         <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 border-orange-200/30 shadow-sm relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-12 h-12 bg-orange-500/10 rounded-full -translate-y-4 translate-x-4"></div>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-2">
//                 <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
//                 Most Common Threat
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground font-mono">
//                 {threatTypePieData.sort((a, b) => b.value - a.value)[0]?.name}
//               </div>
//               <p className="text-xs text-muted-foreground mt-1 font-medium">
//                 {threatTypePieData.sort((a, b) => b.value - a.value)[0]?.value} occurrences
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>

//         <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 border-cyan-200/30 shadow-sm relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-500/10 rounded-full -translate-y-4 translate-x-4"></div>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-2">
//                 <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
//                 Average Daily Threats
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground font-mono">
//                 {Math.round(
//                   timeSeriesData.reduce((sum, day) => sum + day.threats, 0) /
//                     timeSeriesData.length
//                 )}
//               </div>
//               <p className="text-xs text-muted-foreground mt-1 font-medium">
//                 Based on last 7 days
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>

//         <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-gradient-to-br from-pink-500/5 to-pink-600/5 border-pink-200/30 shadow-sm relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-12 h-12 bg-pink-500/10 rounded-full -translate-y-4 translate-x-4"></div>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-2">
//                 <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
//                 Highest Risk Day
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground font-mono">
//                 {timeSeriesData.sort((a, b) => b.threats - a.threats)[0]?.date}
//               </div>
//               <p className="text-xs text-muted-foreground mt-1 font-medium">
//                 {timeSeriesData.sort((a, b) => b.threats - a.threats)[0]?.threats} threats
//                 detected
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BarChart3 } from "lucide-react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   Legend,
// } from "recharts";
// import { motion } from "framer-motion";
// import { mockThreats } from "@/lib/mockData";

// export default function Analytics() {
//   const threatTypeData = mockThreats.reduce((acc, threat) => {
//     acc[threat.threatType] = (acc[threat.threatType] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const threatTypePieData = Object.entries(threatTypeData).map(([name, value]) => ({
//     name,
//     value,
//   }));

//   const severityData = mockThreats.reduce((acc, threat) => {
//     acc[threat.severity] = (acc[threat.severity] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const severityBarData = Object.entries(severityData).map(([severity, count]) => ({
//     severity: severity.charAt(0).toUpperCase() + severity.slice(1),
//     count,
//     fill: getSeverityColor(severity),
//   }));

//   const last7Days = Array.from({ length: 7 }, (_, i) => {
//     const date = new Date();
//     date.setDate(date.getDate() - (6 - i));
//     return date.toISOString().split("T")[0];
//   });

//   const timeSeriesData = last7Days.map((date) => {
//     const count = mockThreats.filter((threat) =>
//       threat.timestamp.startsWith(date)
//     ).length;
//     return {
//       date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
//       threats: count,
//     };
//   });

//   // Colors with transparency for the badge effect
//   const BADGE_COLORS = [
//     "rgba(59, 130, 246, 0.15)",    // Blue with transparency
//     "rgba(239, 68, 68, 0.15)",     // Red with transparency  
//     "rgba(16, 185, 129, 0.15)",    // Green with transparency
//     "rgba(139, 92, 246, 0.15)",    // Purple with transparency
//     "rgba(245, 158, 11, 0.15)",    // Amber with transparency
//     "rgba(6, 182, 212, 0.15)",     // Cyan with transparency
//     "rgba(236, 72, 153, 0.15)",    // Pink with transparency
//     "rgba(132, 204, 22, 0.15)",    // Lime with transparency
//   ];

//   // Border colors for the segments
//   const BORDER_COLORS = [
//     "#3B82F6", "#EF4444", "#10B981", "#8B5CF6", 
//     "#F59E0B", "#06B6D4", "#EC4899", "#84CC16"
//   ];

//   function getSeverityColor(severity: string) {
//     switch (severity) {
//       case "critical":
//         return "#FF4757";
//       case "high":
//         return "#FF6348";
//       case "medium":
//         return "#FFA502";
//       case "low":
//         return "#26DE81";
//       default:
//         return "#2E86DE";
//     }
//   }

//   return (
//     <motion.div
//       className="space-y-8"
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="flex items-center gap-3">
//         <BarChart3 className="w-7 h-7 text-primary" />
//         <h1 className="text-3xl font-bold text-foreground tracking-tight">
//           Threat Analytics
//         </h1>
//       </div>

//       {/* Badge-style Stats Row */}
//       <div className="grid gap-4 md:grid-cols-4">
//         <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-200/30 shadow-sm relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full -translate-y-8 translate-x-8"></div>
//             <CardContent className="p-4 relative z-10">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs text-muted-foreground font-medium">Total Threats</p>
//                   <p className="text-2xl font-bold text-foreground">{mockThreats.length}</p>
//                 </div>
//                 <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
//                   <div className="w-2 h-2 rounded-full bg-blue-500" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-200/30 shadow-sm relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full -translate-y-8 translate-x-8"></div>
//             <CardContent className="p-4 relative z-10">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs text-muted-foreground font-medium">Critical</p>
//                   <p className="text-2xl font-bold text-foreground">
//                     {severityData.critical || 0}
//                   </p>
//                 </div>
//                 <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
//                   <div className="w-2 h-2 rounded-full bg-red-500" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-200/30 shadow-sm relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full -translate-y-8 translate-x-8"></div>
//             <CardContent className="p-4 relative z-10">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs text-muted-foreground font-medium">Resolved</p>
//                   <p className="text-2xl font-bold text-foreground">
//                     {mockThreats.filter(t => t.status === 'resolved').length}
//                   </p>
//                 </div>
//                 <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
//                   <div className="w-2 h-2 rounded-full bg-green-500" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-200/30 shadow-sm relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full -translate-y-8 translate-x-8"></div>
//             <CardContent className="p-4 relative z-10">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs text-muted-foreground font-medium">Active</p>
//                   <p className="text-2xl font-bold text-foreground">
//                     {mockThreats.filter(t => t.status === 'active').length}
//                   </p>
//                 </div>
//                 <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
//                   <div className="w-2 h-2 rounded-full bg-purple-500" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>

//       {/* ORIGINAL CHARTS WITH BADGE-LIKE ENHANCEMENTS */}
//       <div className="grid gap-8 md:grid-cols-2">
//         {/* Pie Chart with Badge-style Segments */}
//         <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-card border-border shadow-sm relative overflow-hidden">
//             <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500/5 rounded-full -translate-x-10 -translate-y-10"></div>
//             <CardHeader className="pb-4">
//               <CardTitle className="text-foreground text-base font-semibold flex items-center gap-2">
//                 <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                 Threat Type Distribution
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex gap-6">
//                 {/* Badge-style legend */}
//                 <div className="space-y-3 min-w-[140px]">
//                   {threatTypePieData.map((threat, index) => (
//                     <div key={threat.name} className="flex items-center gap-2 group cursor-pointer">
//                       <div 
//                         className="w-3 h-3 rounded-full flex-shrink-0 transition-transform group-hover:scale-125 border"
//                         style={{ 
//                           backgroundColor: BADGE_COLORS[index % BADGE_COLORS.length],
//                           borderColor: BORDER_COLORS[index % BORDER_COLORS.length],
//                           borderWidth: '2px'
//                         }}
//                       />
//                       <span className="text-xs font-medium text-foreground">
//                         {threat.name}
//                       </span>
//                       <span className="text-xs font-mono font-bold text-foreground bg-muted px-1.5 py-0.5 rounded">
//                         {threat.value}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
                
//                 {/* Pie Chart with Badge-style Segments */}
//                 <ResponsiveContainer width="100%" height={240}>
//                   <PieChart>
//                     {/* Define patterns for each segment to create the badge texture */}
//                     <defs>
//                       {threatTypePieData.map((entry, index) => (
//                         <pattern
//                           key={`pattern-${index}`}
//                           id={`badge-pattern-${index}`}
//                           width="8"
//                           height="8"
//                           patternUnits="userSpaceOnUse"
//                         >
//                           {/* Base semi-transparent color */}
//                           <rect width="8" height="8" fill={BADGE_COLORS[index % BADGE_COLORS.length]} />
//                           {/* Noise effect */}
//                           <circle cx="2" cy="2" r="0.5" fill="rgba(255,255,255,0.1)" />
//                           <circle cx="6" cy="6" r="0.5" fill="rgba(255,255,255,0.1)" />
//                           <circle cx="4" cy="4" r="0.3" fill="rgba(255,255,255,0.05)" />
//                         </pattern>
//                       ))}
//                     </defs>
                    
//                     <Pie
//                       data={threatTypePieData}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={{ 
//                         stroke: "hsl(var(--muted-foreground))", 
//                         strokeWidth: 1 
//                       }}
//                       label={({ name, percent }) =>
//                         `${name} ${(percent * 100).toFixed(1)}%`
//                       }
//                       outerRadius={80}
//                       innerRadius={40}
//                       dataKey="value"
//                       animationDuration={800}
//                       stroke="hsl(var(--background))"
//                       strokeWidth={3}
//                     >
//                       {threatTypePieData.map((entry, index) => (
//                         <Cell 
//                           key={`cell-${index}`} 
//                           fill={`url(#badge-pattern-${index})`}
//                           stroke={BORDER_COLORS[index % BORDER_COLORS.length]}
//                           strokeWidth={2}
//                         />
//                       ))}
//                     </Pie>
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "hsl(var(--background))",
//                         border: "1px solid hsl(var(--border))",
//                         borderRadius: "6px",
//                         color: "hsl(var(--foreground))",
//                         fontSize: "12px",
//                         padding: "8px 12px",
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                       }}
//                       itemStyle={{ 
//                         color: "hsl(var(--foreground))", 
//                         fontSize: "12px" 
//                       }}
//                       formatter={(value, name) => [
//                         <span key="value" className="font-mono font-bold">{value as number}</span>,
//                         <span key="name" className="font-medium">{name as string}</span>
//                       ]}
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Bar Chart with Badge-style Elements */}
//         <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-card border-border shadow-sm relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-full translate-x-10 -translate-y-10"></div>
//             <CardHeader className="pb-4">
//               <CardTitle className="text-foreground text-base font-semibold flex items-center gap-2">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 Threats by Severity
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {/* Badge-style severity indicators */}
//                 <div className="flex gap-2 justify-center">
//                   {severityBarData.map((severity, index) => (
//                     <div 
//                       key={severity.severity}
//                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105 cursor-pointer"
//                       style={{ 
//                         backgroundColor: `${severity.fill}15`,
//                         borderColor: `${severity.fill}30`,
//                         color: severity.fill
//                       }}
//                     >
//                       <div 
//                         className="w-2 h-2 rounded-full"
//                         style={{ backgroundColor: severity.fill }}
//                       />
//                       {severity.severity}
//                       <span className="font-mono font-bold">{severity.count}</span>
//                     </div>
//                   ))}
//                 </div>
                
//                 {/* Original Bar Chart */}
//                 <ResponsiveContainer width="100%" height={200}>
//                   <BarChart 
//                     data={severityBarData} 
//                     margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                   >
//                     <CartesianGrid
//                       strokeDasharray="3 3"
//                       stroke="hsl(var(--border))"
//                       strokeOpacity={0.3}
//                       vertical={false}
//                     />
//                     <XAxis
//                       dataKey="severity"
//                       tick={{ 
//                         fill: "hsl(var(--muted-foreground))", 
//                         fontSize: 11, 
//                         fontWeight: 500 
//                       }}
//                       axisLine={{ 
//                         stroke: "hsl(var(--border))", 
//                         strokeWidth: 1 
//                       }}
//                       tickLine={false}
//                     />
//                     <YAxis
//                       tick={{ 
//                         fill: "hsl(var(--muted-foreground))", 
//                         fontSize: 11, 
//                         fontWeight: 500 
//                       }}
//                       axisLine={{ 
//                         stroke: "hsl(var(--border))", 
//                         strokeWidth: 1 
//                       }}
//                       tickLine={false}
//                     />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "hsl(var(--background))",
//                         border: "1px solid hsl(var(--border))",
//                         borderRadius: "6px",
//                         color: "hsl(var(--foreground))",
//                         fontSize: "12px",
//                         padding: "8px 12px",
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                       }}
//                       cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
//                     />
//                     <Bar
//                       dataKey="count"
//                       radius={[4, 4, 0, 0]}
//                       animationDuration={800}
//                       maxBarSize={60}
//                     >
//                       {severityBarData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.fill} />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>

//       {/* Rest of your components remain the same */}
//       <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.2 }}>
//         <Card className="bg-card border-border shadow-sm relative overflow-hidden">
//           <div className="absolute top-0 left-0 w-24 h-24 bg-cyan-500/5 rounded-full -translate-x-12 -translate-y-12"></div>
//           <div className="absolute bottom-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full translate-x-12 translate-y-12"></div>
          
//           <CardHeader className="pb-4">
//             <CardTitle className="text-foreground text-base font-semibold flex items-center gap-2">
//               <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
//               Threat Detection Timeline (Last 7 Days)
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex justify-between px-4">
//                 {timeSeriesData.map((day, index) => (
//                   <div key={day.date} className="text-center group cursor-pointer">
//                     <div className="text-xs font-medium text-muted-foreground mb-1">
//                       {day.date}
//                     </div>
//                     <div 
//                       className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all group-hover:scale-110 mx-auto"
//                       style={{
//                         backgroundColor: day.threats > 0 ? `${getSeverityColor('medium')}15` : 'transparent',
//                         border: `2px solid ${day.threats > 0 ? getSeverityColor('medium') : 'hsl(var(--border))'}`,
//                         color: getSeverityColor('medium')
//                       }}
//                     >
//                       {day.threats}
//                     </div>
//                   </div>
//                 ))}
//               </div>
              
//               <ResponsiveContainer width="100%" height={200}>
//                 <LineChart 
//                   data={timeSeriesData} 
//                   margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="hsl(var(--border))"
//                     strokeOpacity={0.3}
//                     vertical={false}
//                   />
//                   <XAxis
//                     dataKey="date"
//                     tick={{ 
//                       fill: "hsl(var(--muted-foreground))", 
//                       fontSize: 11, 
//                       fontWeight: 500 
//                     }}
//                     axisLine={{ 
//                       stroke: "hsl(var(--border))", 
//                       strokeWidth: 1 
//                     }}
//                     tickLine={false}
//                   />
//                   <YAxis
//                     tick={{ 
//                       fill: "hsl(var(--muted-foreground))", 
//                       fontSize: 11, 
//                       fontWeight: 500 
//                     }}
//                     axisLine={{ 
//                       stroke: "hsl(var(--border))", 
//                       strokeWidth: 1 
//                     }}
//                     tickLine={false}
//                     allowDecimals={false}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "hsl(var(--background))",
//                       border: "1px solid hsl(var(--border))",
//                       borderRadius: "6px",
//                       color: "hsl(var(--foreground))",
//                       fontSize: "12px",
//                       padding: "8px 12px",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                     }}
//                     cursor={{ 
//                       stroke: "hsl(var(--border))", 
//                       strokeWidth: 1, 
//                       strokeDasharray: "3 3" 
//                     }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="threats"
//                     stroke="#4ECDC4"
//                     strokeWidth={3}
//                     dot={{ 
//                       fill: "#4ECDC4", 
//                       r: 5, 
//                       strokeWidth: 2, 
//                       stroke: "hsl(var(--background))" 
//                     }}
//                     activeDot={{ 
//                       r: 7, 
//                       stroke: "#4ECDC4", 
//                       strokeWidth: 2, 
//                       fill: "hsl(var(--background))" 
//                     }}
//                     animationDuration={800}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       <div className="grid gap-6 md:grid-cols-3">
//         <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 border-orange-200/30 shadow-sm relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-12 h-12 bg-orange-500/10 rounded-full -translate-y-4 translate-x-4"></div>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-2">
//                 <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
//                 Most Common Threat
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground font-mono">
//                 {threatTypePieData.sort((a, b) => b.value - a.value)[0]?.name}
//               </div>
//               <p className="text-xs text-muted-foreground mt-1 font-medium">
//                 {threatTypePieData.sort((a, b) => b.value - a.value)[0]?.value} occurrences
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>

//         <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 border-cyan-200/30 shadow-sm relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-500/10 rounded-full -translate-y-4 translate-x-4"></div>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-2">
//                 <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
//                 Average Daily Threats
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground font-mono">
//                 {Math.round(
//                   timeSeriesData.reduce((sum, day) => sum + day.threats, 0) /
//                     timeSeriesData.length
//                 )}
//               </div>
//               <p className="text-xs text-muted-foreground mt-1 font-medium">
//                 Based on last 7 days
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>

//         <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
//           <Card className="bg-gradient-to-br from-pink-500/5 to-pink-600/5 border-pink-200/30 shadow-sm relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-12 h-12 bg-pink-500/10 rounded-full -translate-y-4 translate-x-4"></div>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-2">
//                 <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
//                 Highest Risk Day
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground font-mono">
//                 {timeSeriesData.sort((a, b) => b.threats - a.threats)[0]?.date}
//               </div>
//               <p className="text-xs text-muted-foreground mt-1 font-medium">
//                 {timeSeriesData.sort((a, b) => b.threats - a.threats)[0]?.threats} threats
//                 detected
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }

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
    const count = mockThreats.filter((threat) =>
      threat.timestamp.startsWith(date)
    ).length;
    return {
      date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
      threats: count,
    };
  });

  // Colors with transparency for the badge effect
  const BADGE_COLORS = [
    "rgba(59, 130, 246, 0.15)",    // Blue with transparency
    "rgba(239, 68, 68, 0.15)",     // Red with transparency  
    "rgba(16, 185, 129, 0.15)",    // Green with transparency
    "rgba(139, 92, 246, 0.15)",    // Purple with transparency
    "rgba(245, 158, 11, 0.15)",    // Amber with transparency
    "rgba(6, 182, 212, 0.15)",     // Cyan with transparency
    "rgba(236, 72, 153, 0.15)",    // Pink with transparency
    "rgba(132, 204, 22, 0.15)",    // Lime with transparency
  ];

  // Border colors for the segments
  const BORDER_COLORS = [
    "#3B82F6", "#EF4444", "#10B981", "#8B5CF6", 
    "#F59E0B", "#06B6D4", "#EC4899", "#84CC16"
  ];

  function getSeverityColor(severity: string) {
    switch (severity) {
      case "critical":
        return "#FF4757";
      case "high":
        return "#FF6348";
      case "medium":
        return "#FFA502";
      case "low":
        return "#26DE81";
      default:
        return "#2E86DE";
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

      {/* Badge-style Stats Row */}
      <div className="grid gap-4 md:grid-cols-4">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-200/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full -translate-y-8 translate-x-8"></div>
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Total Threats</p>
                  <p className="text-2xl font-bold text-foreground">{mockThreats.length}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-200/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full -translate-y-8 translate-x-8"></div>
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Critical</p>
                  <p className="text-2xl font-bold text-foreground">
                    {severityData.critical || 0}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-200/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full -translate-y-8 translate-x-8"></div>
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Resolved</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockThreats.filter(t => t.status === 'resolved').length}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-200/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full -translate-y-8 translate-x-8"></div>
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Active</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockThreats.filter(t => t.status === 'active').length}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ORIGINAL CHARTS WITH BADGE-LIKE ENHANCEMENTS */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Pie Chart with Badge-style Segments */}
        <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
          <Card className="bg-card border-border shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500/5 rounded-full -translate-x-10 -translate-y-10"></div>
            <CardHeader className="pb-4">
              <CardTitle className="text-foreground text-base font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Threat Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6">
                {/* Badge-style legend */}
                <div className="space-y-3 min-w-[140px]">
                  {threatTypePieData.map((threat, index) => (
                    <div key={threat.name} className="flex items-center gap-2 group cursor-pointer">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0 transition-transform group-hover:scale-125 border"
                        style={{ 
                          backgroundColor: BADGE_COLORS[index % BADGE_COLORS.length],
                          borderColor: BORDER_COLORS[index % BORDER_COLORS.length],
                          borderWidth: '2px'
                        }}
                      />
                      <span className="text-xs font-medium text-foreground">
                        {threat.name}
                      </span>
                      <span className="text-xs font-mono font-bold text-foreground bg-muted px-1.5 py-0.5 rounded">
                        {threat.value}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Pie Chart with Badge-style Segments */}
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    {/* Define patterns for each segment to create the badge texture */}
                    <defs>
                      {threatTypePieData.map((entry, index) => (
                        <pattern
                          key={`pattern-${index}`}
                          id={`badge-pattern-${index}`}
                          width="8"
                          height="8"
                          patternUnits="userSpaceOnUse"
                        >
                          {/* Base semi-transparent color */}
                          <rect width="8" height="8" fill={BADGE_COLORS[index % BADGE_COLORS.length]} />
                          {/* Noise effect */}
                          <circle cx="2" cy="2" r="0.5" fill="rgba(255,255,255,0.1)" />
                          <circle cx="6" cy="6" r="0.5" fill="rgba(255,255,255,0.1)" />
                          <circle cx="4" cy="4" r="0.3" fill="rgba(255,255,255,0.05)" />
                        </pattern>
                      ))}
                    </defs>
                    
                    <Pie
                      data={threatTypePieData}
                      cx="50%"
                      cy="50%"
                      labelLine={{ 
                        stroke: "hsl(var(--muted-foreground))", 
                        strokeWidth: 1 
                      }}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(1)}%`
                      }
                      outerRadius={80}
                      innerRadius={40}
                      dataKey="value"
                      animationDuration={800}
                      stroke="hsl(var(--background))"
                      strokeWidth={3}
                    >
                      {threatTypePieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`url(#badge-pattern-${index})`}
                          stroke={BORDER_COLORS[index % BORDER_COLORS.length]}
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                        color: "hsl(var(--foreground))",
                        fontSize: "12px",
                        padding: "8px 12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                      itemStyle={{ 
                        color: "hsl(var(--foreground))", 
                        fontSize: "12px" 
                      }}
                      formatter={(value, name) => [
                        <span key="value" className="font-mono font-bold">{value as number}</span>,
                        <span key="name" className="font-medium">{name as string}</span>
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bar Chart with Badge-style Columns */}
        <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
          <Card className="bg-card border-border shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-full translate-x-10 -translate-y-10"></div>
            <CardHeader className="pb-4">
              <CardTitle className="text-foreground text-base font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Threats by Severity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Badge-style severity indicators */}
                <div className="flex gap-2 justify-center">
                  {severityBarData.map((severity, index) => (
                    <div 
                      key={severity.severity}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105 cursor-pointer"
                      style={{ 
                        backgroundColor: `${severity.fill}15`,
                        borderColor: `${severity.fill}30`,
                        color: severity.fill
                      }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: severity.fill }}
                      />
                      {severity.severity}
                      <span className="font-mono font-bold">{severity.count}</span>
                    </div>
                  ))}
                </div>
                
                {/* Bar Chart with Badge-style Columns */}
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart 
                    data={severityBarData} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    {/* Define patterns for bar columns */}
                    <defs>
                      {severityBarData.map((entry, index) => (
                        <pattern
                          key={`bar-pattern-${index}`}
                          id={`bar-pattern-${index}`}
                          width="6"
                          height="6"
                          patternUnits="userSpaceOnUse"
                        >
                          {/* Base semi-transparent color */}
                          <rect width="6" height="6" fill={`${entry.fill}15`} />
                          {/* Noise effect */}
                          <circle cx="1.5" cy="1.5" r="0.4" fill="rgba(255,255,255,0.1)" />
                          <circle cx="4.5" cy="4.5" r="0.4" fill="rgba(255,255,255,0.1)" />
                          <circle cx="3" cy="3" r="0.2" fill="rgba(255,255,255,0.05)" />
                        </pattern>
                      ))}
                    </defs>
                    
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                      strokeOpacity={0.3}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="severity"
                      tick={{ 
                        fill: "hsl(var(--muted-foreground))", 
                        fontSize: 11, 
                        fontWeight: 500 
                      }}
                      axisLine={{ 
                        stroke: "hsl(var(--border))", 
                        strokeWidth: 1 
                      }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ 
                        fill: "hsl(var(--muted-foreground))", 
                        fontSize: 11, 
                        fontWeight: 500 
                      }}
                      axisLine={{ 
                        stroke: "hsl(var(--border))", 
                        strokeWidth: 1 
                      }}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                        color: "hsl(var(--foreground))",
                        fontSize: "12px",
                        padding: "8px 12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                      cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
                    />
                    <Bar
                      dataKey="count"
                      radius={[4, 4, 0, 0]}
                      animationDuration={800}
                      maxBarSize={60}
                    >
                      {severityBarData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`url(#bar-pattern-${index})`}
                          stroke={entry.fill}
                          strokeWidth={2}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Line Chart with Badge-style Elements */}
      <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.2 }}>
        <Card className="bg-card border-border shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-cyan-500/5 rounded-full -translate-x-12 -translate-y-12"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full translate-x-12 translate-y-12"></div>
          
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground text-base font-semibold flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              Threat Detection Timeline (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Badge-style day indicators */}
              <div className="flex justify-between px-4">
                {timeSeriesData.map((day, index) => (
                  <div key={day.date} className="text-center group cursor-pointer">
                    <div className="text-xs font-medium text-muted-foreground mb-1">
                      {day.date}
                    </div>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all group-hover:scale-110 mx-auto"
                      style={{
                        backgroundColor: day.threats > 0 ? `${getSeverityColor('medium')}15` : 'transparent',
                        border: `2px solid ${day.threats > 0 ? getSeverityColor('medium') : 'hsl(var(--border))'}`,
                        color: getSeverityColor('medium')
                      }}
                    >
                      {day.threats}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Original Line Chart */}
              <ResponsiveContainer width="100%" height={200}>
                <LineChart 
                  data={timeSeriesData} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    strokeOpacity={0.3}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ 
                      fill: "hsl(var(--muted-foreground))", 
                      fontSize: 11, 
                      fontWeight: 500 
                    }}
                    axisLine={{ 
                      stroke: "hsl(var(--border))", 
                      strokeWidth: 1 
                    }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ 
                      fill: "hsl(var(--muted-foreground))", 
                      fontSize: 11, 
                      fontWeight: 500 
                    }}
                    axisLine={{ 
                      stroke: "hsl(var(--border))", 
                      strokeWidth: 1 
                    }}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                      color: "hsl(var(--foreground))",
                      fontSize: "12px",
                      padding: "8px 12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                    cursor={{ 
                      stroke: "hsl(var(--border))", 
                      strokeWidth: 1, 
                      strokeDasharray: "3 3" 
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="threats"
                    stroke="#4ECDC4"
                    strokeWidth={3}
                    dot={{ 
                      fill: "#4ECDC4", 
                      r: 5, 
                      strokeWidth: 2, 
                      stroke: "hsl(var(--background))" 
                    }}
                    activeDot={{ 
                      r: 7, 
                      stroke: "#4ECDC4", 
                      strokeWidth: 2, 
                      fill: "hsl(var(--background))" 
                    }}
                    animationDuration={800}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Original Metrics Cards with Badge-style Enhancements */}
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Card className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 border-orange-200/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-orange-500/10 rounded-full -translate-y-4 translate-x-4"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                Most Common Threat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground font-mono">
                {threatTypePieData.sort((a, b) => b.value - a.value)[0]?.name}
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-medium">
                {threatTypePieData.sort((a, b) => b.value - a.value)[0]?.value} occurrences
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Card className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 border-cyan-200/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-500/10 rounded-full -translate-y-4 translate-x-4"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                Average Daily Threats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground font-mono">
                {Math.round(
                  timeSeriesData.reduce((sum, day) => sum + day.threats, 0) /
                    timeSeriesData.length
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-medium">
                Based on last 7 days
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Card className="bg-gradient-to-br from-pink-500/5 to-pink-600/5 border-pink-200/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-pink-500/10 rounded-full -translate-y-4 translate-x-4"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                Highest Risk Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground font-mono">
                {timeSeriesData.sort((a, b) => b.threats - a.threats)[0]?.date}
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-medium">
                {timeSeriesData.sort((a, b) => b.threats - a.threats)[0]?.threats} threats
                detected
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}