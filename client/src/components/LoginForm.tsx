import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Loader from "@/components/ui/Loader"
import { useToast } from "@/hooks/use-toast"

export default function LoginForm() {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ email: "", password: "" })

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            toast({ title: "Invalid Email", variant: "destructive" })
            setLoading(false)
            return
        }
        await new Promise((r) => setTimeout(r, 2000))
        setLoading(false)
        toast({ title: "Login Successful", description: "Welcome back!" })
    }

    if (loading) return <Loader fullscreen />

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg space-y-8"
            >
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold text-foreground">Login</h2>
                    <p className="text-muted-foreground">Access your account</p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                            className="w-full"
                        />
                    </div>
                </div>

                <Button type="submit" className="w-full h-12 text-lg">
                    Login
                </Button>
            </form>
        </div>
    )
}
