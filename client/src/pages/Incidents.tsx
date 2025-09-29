import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertTriangle, Bug } from "lucide-react"
import { getIncidents, updateIncident, addIncidentNote, createIncident } from "@/services/api"
import { useUnifiedUser } from "@/hooks/useUnifiedUser"
import  Loader  from "@/components/ui/Loader"

export default function Incidents() {
    const { user } = useUnifiedUser()
    const [selectedIncident, setSelectedIncident] = useState<any | null>(null)
    const [incidents, setIncidents] = useState<any[]>([])
    const [status, setStatus] = useState("")
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [loading, setLoading] = useState(false)
    const [newNote, setNewNote] = useState("")
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [severity, setSeverity] = useState("Low")
    const [location, setLocation] = useState("")

    const severityColors: Record<string, string> = {
        High: "bg-red-500 text-white",
        Medium: "bg-yellow-500 text-white",
        Low: "bg-green-500 text-white",
    }

    const fetchIncidents = async () => {
        setLoading(true)
        try {
            const data = await getIncidents({ status, name, date })
            setIncidents(data)
        } catch (err) {
            console.error("Failed to fetch incidents", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchIncidents()
    }, [])

    const handleResolve = async () => {
        if (!selectedIncident) return
        setLoading(true)
        try {
            const updated = await updateIncident(selectedIncident._id, { status: "Resolved" })
            setSelectedIncident(updated.incident)
            fetchIncidents()
        } catch (err) {
            console.error("Failed to resolve incident", err)
        } finally {
            setLoading(false)
        }
    }

    const handleInvestigate = async () => {
        if (!selectedIncident) return
        setLoading(true)
        try {
            const updated = await updateIncident(selectedIncident._id, { status: "Investigating" })
            setSelectedIncident(updated.incident)
            fetchIncidents()
        } catch (err) {
            console.error("Failed to mark investigating", err)
        } finally {
            setLoading(false)
        }
    }

    const handleAddNote = async () => {
        if (!selectedIncident || !newNote.trim()) return
        setLoading(true)
        try {
            const updated = await addIncidentNote(selectedIncident._id, newNote)
            setSelectedIncident(updated.incident)
            setNewNote("")
            fetchIncidents()
        } catch (err) {
            console.error("Failed to add note", err)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateIncident = async () => {
        if (!title || !description || !severity) return
        setLoading(true)
        try {
            await createIncident({
                title,
                description,
                severity,
                reporterId: user?.id,
                location,
                sector: user?.sector,
            })
            setTitle("")
            setDescription("")
            setSeverity("Low")
            setLocation("")
            setOpen(false)
            fetchIncidents()
        } catch (err) {
            console.error("Failed to create incident", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background p-8 space-y-10">
            {loading && (
                <div className="fixed inset-0 bg-background/70 flex items-center justify-center z-50">
                    <Loader />
                </div>
            )}
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
                    <AlertTriangle className="w-9 h-9 text-primary" />
                    Incidents
                </h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button size="lg" className="bg-primary text-primary-foreground shadow hover:scale-105 transition">
                            + Create Incident
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-6 rounded-xl max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Create New Incident</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <select
                                value={severity}
                                onChange={(e) => setSeverity(e.target.value)}
                                className="w-full border rounded-md p-2 bg-card"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                            <Input value={user?.sector || ""} disabled className="opacity-70" />
                            <Button onClick={handleCreateIncident} className="w-full bg-primary text-white">
                                Create
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-wrap gap-4">
                <Input
                    placeholder="Search by reporter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="max-w-xs"
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded-md p-2 bg-card"
                >
                    <option value="">All Status</option>
                    <option value="Open">Open</option>
                    <option value="Investigating">Investigating</option>
                    <option value="Resolved">Resolved</option>
                </select>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="max-w-xs" />
                <Button variant="outline" onClick={fetchIncidents}>
                    Search
                </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="shadow-lg border border-border/60">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Incident List</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {incidents.length > 0 ? (
                            incidents.map((incident) => (
                                <div
                                    key={incident._id}
                                    onClick={() => setSelectedIncident(incident)}
                                    className="p-4 border rounded-xl hover:bg-accent/30 cursor-pointer flex justify-between items-center transition group"
                                >
                                    <div>
                                        <p className="font-medium group-hover:text-primary">{incident.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(incident.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex gap-2">
                                            <Badge className={severityColors[incident.severity] || "bg-gray-500 text-white"}>
                                                {incident.severity}
                                            </Badge>
                                            <Badge variant="secondary">{incident.status}</Badge>
                                        </div>
                                        <p className="text-xs text-foreground/70 italic">
                                            by {incident.reporter?.fullName} {incident.reporter?.sector && `(${incident.reporter?.sector})`}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground">No incidents found</p>
                        )}
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
                        <CardContent className="space-y-6">
                            <p className="text-muted-foreground">{selectedIncident.description}</p>
                            <Separator />
                            <div className="space-y-3">
                                <h3 className="font-semibold">Notes</h3>
                                <div className="space-y-2 p-3 bg-accent/30 rounded-md">
                                    {selectedIncident.notes?.length > 0 ? (
                                        selectedIncident.notes.map((note: string, i: number) => (
                                            <p key={i} className="text-sm text-foreground/80">• {note}</p>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground italic">No notes yet</p>
                                    )}
                                </div>
                            </div>
                            {user?.id === selectedIncident.reporter?._id && (
                                <div className="space-y-4 pt-4 border-t">
                                    <div className="flex gap-3">
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleResolve}>
                                            Mark Resolved
                                        </Button>
                                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white" onClick={handleInvestigate}>
                                            Mark Investigating
                                        </Button>
                                    </div>
                                    <div className="flex gap-2">
                                        <Input placeholder="Add a note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                                        <Button variant="outline" size="sm" onClick={handleAddNote}>
                                            Add Note
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
