import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Loader from "@/components/ui/Loader"
import { useToast } from "@/hooks/use-toast"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function LoginForm() {
    const { toast } = useToast()
    const navigate = useNavigate()
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

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
                email: form.email,
                password: form.password,
            })

            const { token, user, message } = res.data

            if (message?.includes("not verified")) {
                sessionStorage.setItem("pendingVerificationEmail", form.email)
                toast({
                    title: "Email Not Verified",
                    description: "Please verify your account to continue.",
                    variant: "destructive",
                })
                navigate("/verify-email")
                return
            }

            if (token) {
                sessionStorage.setItem("authToken", token)
                sessionStorage.setItem("user", JSON.stringify(user))
                toast({ title: "Login Successful", description: "Welcome back!" })
                navigate("/")
            }
        } catch (err: any) {
            toast({
                title: "Login Failed",
                description: err.response?.data?.message || "Something went wrong",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Loader fullscreen />

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-8">
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
                <div className="text-center text-sm text-muted-foreground">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-primary font-medium hover:underline">
                        Sign up
                    </Link>
                </div>
                    
            </form>

        </div>
    )
}
