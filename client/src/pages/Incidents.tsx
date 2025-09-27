// frontend/src/pages/Incidents.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Bug } from "lucide-react"

export default function Incidents() {
    const [selectedIncident, setSelectedIncident] = useState<any | null>(null)

    const severityColors: Record<string, string> = {
        High: "bg-red-500 text-white",
        Medium: "bg-yellow-500 text-white",
        Low: "bg-green-500 text-white",
    }

    const mockIncidents = [
        {
            id: 1,
            title: "Suspicious login from Russia",
            severity: "High",
            status: "Open",
            createdAt: "2025-09-20",
            description: "Multiple failed logins followed by a successful login.",
            notes: ["Detected by SIEM", "Assigned to SOC Analyst"],
            reporter: "SOC Team",
        },
        {
            id: 2,
            title: "Malware hash detected",
            severity: "Medium",
            status: "Investigating",
            createdAt: "2025-09-18",
            description: "Hash matched known malware sample.",
            notes: ["Correlated with VirusTotal", "Waiting for sandbox results"],
            reporter: "Threat Intel Bot",
        },
    ]

    return (
        <div className="min-h-screen bg-background p-8 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
                    <AlertTriangle className="w-9 h-9 text-primary" />
                    Incidents
                </h1>
                <Button size="lg" className="bg-primary text-primary-foreground shadow hover:scale-105 transition">
                    + Create Incident
                </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="shadow-lg border border-border/60">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Incident List</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {mockIncidents.map((incident) => (
                            <div
                                key={incident.id}
                                onClick={() => setSelectedIncident(incident)}
                                className="p-4 border rounded-xl hover:bg-accent/30 cursor-pointer flex justify-between items-center transition group"
                            >
                                <div>
                                    <p className="font-medium group-hover:text-primary">{incident.title}</p>
                                    <p className="text-xs text-muted-foreground">{incident.createdAt}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex gap-2">
                                        <Badge className={severityColors[incident.severity] || "bg-gray-500 text-white"}>
                                            {incident.severity}
                                        </Badge>
                                        <Badge variant="secondary">{incident.status}</Badge>
                                    </div>
                                    <p className="text-xs text-foreground/70 italic">by {incident.reporter}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {selectedIncident && (
                    <Card className="shadow-lg border border-border/60">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg font-bold">
                                <Bug className="w-5 h-5 text-primary" />
                                {selectedIncident.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">{selectedIncident.description}</p>
                            <Separator />
                            <div className="space-y-2">
                                <h3 className="font-semibold">Notes</h3>
                                <div className="space-y-1">
                                    {selectedIncident.notes.map((note: string, i: number) => (
                                        <p key={i} className="text-sm text-foreground/80">• {note}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                    Mark Resolved
                                </Button>
                                <Button variant="outline" size="sm">
                                    Add Note
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
