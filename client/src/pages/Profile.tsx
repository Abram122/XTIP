import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useUnifiedUser } from "@/hooks/useUnifiedUser"
import { updateProfile } from "@/services/api"
import { useToast } from "@/components/ui/use-toast"

const sectors = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Government",
  "Defense",
  "Energy",
  "Transportation",
  "Manufacturing",
  "Retail",
  "Telecommunications",
  "Non-Profit",
  "Research",
  "Other",
]

export default function Profile() {
  const { user, loading } = useUnifiedUser()
  const { toast } = useToast()

  const isEmailUser = !user?.app_metadata
  const provider = isEmailUser
    ? "email"
    : (user?.app_metadata?.provider as "google" | "github" | "email")

  const [fullName, setFullName] = useState("")
  const [bio, setBio] = useState("")
  const [sector, setSector] = useState("")

  useEffect(() => {
    if (user) {
      const resolvedFullName = isEmailUser
        ? user?.fullName ?? ""
        : provider === "google"
        ? user?.user_metadata?.full_name ?? ""
        : user?.user_metadata?.user_name ?? ""

      const resolvedBio = isEmailUser ? user?.bio ?? "" : user?.user_metadata?.bio ?? ""
      const resolvedSector = isEmailUser ? user?.sector ?? "" : user?.user_metadata?.sector ?? ""

      setFullName(resolvedFullName)
      setBio(resolvedBio)
      setSector(resolvedSector)
    }
  }, [user, isEmailUser, provider])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">You are not logged in.</p>
      </div>
    )
  }

  const providerLabel = {
    google: { name: "Google", color: "bg-red-500 text-white" },
    github: { name: "GitHub", color: "bg-gray-800 text-white" },
    email: { name: "Email", color: "bg-blue-500 text-white" },
  }

  const handleSave = async () => {
    try {
      await updateProfile({ fullName, bio, sector })
      toast({ title: "Success", description: "Profile updated successfully" })
    } catch {
      toast({ title: "Error", description: "Failed to update profile", variant: "destructive" })
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-16 px-6">
      <div className="max-w-3xl w-full space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Update your personal details and manage your account</p>
        </div>

        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email} className="bg-card" disabled />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-card"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sector">Sector</Label>
            <select
              id="sector"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="bg-card border rounded-md p-2 w-full"
            >
              <option value="">Select a sector</option>
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Separator />

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Account Details</h2>

          <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
            <div>
              <p className="font-medium text-foreground">Authentication Provider</p>
              <p className="text-sm text-muted-foreground">
                You are logged in with {providerLabel[provider]?.name ?? "Unknown"}
              </p>
            </div>
            <Badge className={`${providerLabel[provider]?.color}`}>
              {providerLabel[provider]?.name ?? "N/A"}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
            <div>
              <p className="font-medium text-foreground">Membership</p>
              <p className="text-sm text-muted-foreground">Currently on Free Plan</p>
            </div>
            <Badge variant="outline">Active</Badge>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}
