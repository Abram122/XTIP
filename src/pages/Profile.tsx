import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function Profile() {
    // change this state t3tz 
    const [provider, setProvider] = useState<"google" | "github" | "email">("google")

    const providerLabel = {
        google: { name: "Google", color: "bg-red-500 text-white" },
        github: { name: "GitHub", color: "bg-gray-800 text-white" },
        email: { name: "Email", color: "bg-blue-500 text-white" },
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
                            <Input id="name" defaultValue="John Doe" className="bg-card" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="john@example.com" className="bg-card"  disabled={true} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input id="bio" defaultValue="Cybersecurity researcher and analyst" className="bg-card" />
                    </div>
                </div>

                <Separator />

                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-foreground">Account Details</h2>
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                        <div>
                            <p className="font-medium text-foreground">Authentication Provider</p>
                            <p className="text-sm text-muted-foreground">You are logged in with {providerLabel[provider].name}</p>
                        </div>
                        <Badge className={`${providerLabel[provider].color}`}>
                            {providerLabel[provider].name}
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
                    <Button>Save Changes</Button>
                </div>
            </div>
        </div>
    )
}
