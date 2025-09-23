import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Loader from "@/components/ui/Loader"
import { useToast } from "@/hooks/use-toast"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function getPasswordStrength(password: string) {
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return score
}

export default function SignupForm() {
    const { toast } = useToast()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const strength = getPasswordStrength(form.password)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            toast({ title: "Invalid Email", variant: "destructive" })
            setLoading(false)
            return
        }
        if (form.password !== form.confirmPassword) {
            toast({ title: "Passwords do not match", variant: "destructive" })
            setLoading(false)
            return
        }
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, {
                fullName: form.fullName,
                email: form.email,
                password: form.password,
            })
            sessionStorage.setItem("pendingVerificationEmail", form.email)
            toast({ title: "Account created", description: "Verification code sent to your email." })
            navigate("/verify-email")
        } catch (err: any) {
            const message = err.response?.data?.message || "Something went wrong"

            if (message.includes("User already registered but email not verified")) {
                sessionStorage.setItem("pendingVerificationEmail", form.email)
                toast({
                    title: "Email Not Verified",
                    description: "Please verify your email to continue.",
                    variant: "destructive",
                })
                navigate("/verify-email")
            } else {
                toast({ title: "Signup Failed", description: message, variant: "destructive" })
            }
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Loader fullscreen />

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-8">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold text-foreground">Sign Up</h2>
                    <p className="text-muted-foreground">Create your account to get started</p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            value={form.fullName}
                            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
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
                        />
                        <div className="flex gap-1 mt-1">
                            {[1, 2, 3, 4].map((level) => (
                                <div
                                    key={level}
                                    className={`h-2 flex-1 rounded ${strength >= level ? "bg-primary" : "bg-muted"}`}
                                />
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Password must be at least 8 characters, with uppercase, number, and symbol.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={form.confirmPassword}
                            onChange={(e) =>
                                setForm({ ...form, confirmPassword: e.target.value })
                            }
                            required
                        />
                    </div>
                </div>
                <Button type="submit" className="w-full h-12 text-lg">
                    Create Account
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                    Do you have an account?{" "}
                    <Link to="/login" className="text-primary font-medium hover:underline">
                        Log in
                    </Link>
                </div>
            </form>
        </div>
    )
}
